
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Shield, AlertCircle, Mail, Key } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const ADMIN_PASSWORD = 'aQ@Ek4)$O9UrO8e%2*4o4mfo47^y!@&uR^OZOIg8gz6mPj1*Ejm';
const ADMIN_EMAIL = 'AdminSimnLi@gmail.com';
const SECRET_KEY = 'kPWpfpE85PB8n79$';
const MAX_ATTEMPTS = 3;

const AdminAccess = () => {
  // Step 1: Email and Secret Key verification
  const [showStep1Dialog, setShowStep1Dialog] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [step1Verified, setStep1Verified] = useState(false);
  const [step1Failed, setStep1Failed] = useState(false);
  
  // Step 2: Admin dashboard password (existing functionality)
  const [showStep2Dialog, setShowStep2Dialog] = useState(false);
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the admin button is blocked from localStorage
    const blockedUntil = localStorage.getItem('adminBlockedUntil');
    if (blockedUntil) {
      const blockedTimestamp = parseInt(blockedUntil, 10);
      if (blockedTimestamp > Date.now()) {
        setIsBlocked(true);
        const remainingTime = Math.ceil((blockedTimestamp - Date.now()) / 1000);
        setTimer(remainingTime);
      } else {
        // Block has expired
        localStorage.removeItem('adminBlockedUntil');
        setIsBlocked(false);
        setAttempts(0);
      }
    }
  }, []);

  useEffect(() => {
    // Countdown timer for blocked state
    let interval: number | undefined;
    
    if (isBlocked && timer > 0) {
      interval = window.setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setIsBlocked(false);
            localStorage.removeItem('adminBlockedUntil');
            setAttempts(0);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isBlocked, timer]);

  const handleInitialAdminClick = () => {
    setShowStep1Dialog(true);
  };

  const handleStep1Submit = () => {
    if (adminEmail === ADMIN_EMAIL && secretKey === SECRET_KEY) {
      // Step 1 verification successful
      setStep1Verified(true);
      setStep1Failed(false);
      setShowStep1Dialog(false);
      setAdminEmail('');
      setSecretKey('');
      toast.success('Credentials verified. Admin Access button is now available.');
    } else {
      // Step 1 verification failed
      setStep1Failed(true);
      setAdminEmail('');
      setSecretKey('');
      toast.error('Invalid admin email or secret key.');
    }
  };

  const handleAdminAccess = () => {
    if (isBlocked) {
      toast.error(`Admin access is temporarily blocked. Please try again in ${formatTime(timer)}.`);
      return;
    }
    setShowStep2Dialog(true);
  };

  const handleStep2Submit = () => {
    if (password === ADMIN_PASSWORD) {
      // Correct password
      setShowStep2Dialog(false);
      setPassword('');
      setAttempts(0);
      navigate('/admin');
      toast.success('Admin access granted');
    } else {
      // Incorrect password
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setPassword('');
      
      if (newAttempts >= MAX_ATTEMPTS) {
        // Block admin access for 15 minutes
        setIsBlocked(true);
        const blockDuration = 15 * 60; // 15 minutes in seconds
        setTimer(blockDuration);
        localStorage.setItem('adminBlockedUntil', String(Date.now() + blockDuration * 1000));
        setShowStep2Dialog(false);
        toast.error(`Too many incorrect attempts. Admin access blocked for 15 minutes.`);
      } else {
        toast.error(`Incorrect password. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`);
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Step 1: Initial Admin Access Button */}
      {!step1Verified && (
        <Button 
          onClick={handleInitialAdminClick} 
          variant="outline" 
          className="flex items-center hover:bg-book-100"
          disabled={step1Failed}
        >
          <Shield className="mr-2 h-4 w-4" />
          {step1Failed ? 'Access Denied' : 'Admin Login'}
        </Button>
      )}

      {/* Step 2: Admin Access Button (only visible after step 1 verification) */}
      {step1Verified && (
        <Button 
          onClick={handleAdminAccess} 
          variant="outline" 
          className={`flex items-center ${isBlocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-book-100'}`}
          disabled={isBlocked}
        >
          <Shield className="mr-2 h-4 w-4" />
          {isBlocked ? `Blocked (${formatTime(timer)})` : 'Admin Access'}
        </Button>
      )}

      {/* Step 1 Dialog: Email + Secret Key Verification */}
      <Dialog open={showStep1Dialog} onOpenChange={setShowStep1Dialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Verification Required</DialogTitle>
            <DialogDescription>
              Please enter your admin email and secret key to proceed.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div>
              <label htmlFor="admin-email" className="text-sm font-medium">Admin Email</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="admin-email"
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="Enter admin email"
                  className="pl-10 w-full"
                  disabled={step1Failed}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="secret-key" className="text-sm font-medium">Secret Key</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Key className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="secret-key"
                  type="password"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  placeholder="Enter secret key"
                  className="pl-10 w-full"
                  disabled={step1Failed}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !step1Failed) {
                      handleStep1Submit();
                    }
                  }}
                />
              </div>
            </div>
            
            {step1Failed && (
              <div className="mt-2 flex items-center text-red-600 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>Invalid credentials. Access denied.</span>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStep1Dialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleStep1Submit} disabled={step1Failed}>
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Step 2 Dialog: Admin Dashboard Password */}
      <Dialog open={showStep2Dialog} onOpenChange={setShowStep2Dialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Dashboard Access</DialogTitle>
            <DialogDescription>
              Please enter the admin dashboard password to proceed.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin dashboard password"
              className="w-full"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleStep2Submit();
                }
              }}
            />
            
            {attempts > 0 && (
              <div className="mt-2 flex items-center text-amber-600 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>{MAX_ATTEMPTS - attempts} attempts remaining</span>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStep2Dialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleStep2Submit}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminAccess;
