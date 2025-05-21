
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Shield, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const ADMIN_PASSWORD = 'aQ@Ek4)$O9UrO8e%2*4o4mfo47^y!@&uR^OZOIg8gz6mPj1*Ejm';
const MAX_ATTEMPTS = 3;

const AdminAccess = () => {
  const [showDialog, setShowDialog] = useState(false);
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

  const handleAdminAccess = () => {
    if (isBlocked) {
      toast.error(`Admin access is temporarily blocked. Please try again in ${formatTime(timer)}.`);
      return;
    }
    setShowDialog(true);
  };

  const handlePasswordSubmit = () => {
    if (password === ADMIN_PASSWORD) {
      // Correct password
      setShowDialog(false);
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
        setShowDialog(false);
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
      <Button 
        onClick={handleAdminAccess} 
        variant="outline" 
        className={`flex items-center ${isBlocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-book-100'}`}
        disabled={isBlocked}
      >
        <Shield className="mr-2 h-4 w-4" />
        {isBlocked ? `Blocked (${formatTime(timer)})` : 'Admin Access'}
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Authentication Required</DialogTitle>
            <DialogDescription>
              Please enter the admin password to proceed.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handlePasswordSubmit();
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
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handlePasswordSubmit}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminAccess;
