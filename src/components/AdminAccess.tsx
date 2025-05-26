
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Shield, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const ADMIN_PASSWORD = 'aQ@Ek4)$O9UrO8e%2*4o4mfo47^y!@&uR^OZOIg8gz6mPj1*Ejm';

const AdminAccess = () => {
  const { profile, isAuthenticated, isAdmin } = useAuth();
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState('');

  // Only show the Admin Access button if user is authenticated and is an admin
  if (!isAuthenticated || !isAdmin) {
    return null; // Don't render anything for non-admin users
  }

  const handleAdminAccess = () => {
    setShowPasswordDialog(true);
  };

  const handlePasswordSubmit = () => {
    if (password === ADMIN_PASSWORD) {
      // Correct password - redirect directly to admin page
      setShowPasswordDialog(false);
      setPassword('');
      window.location.href = '/admin';
      toast.success('Admin access granted');
    } else {
      // Incorrect password
      setPassword('');
      toast.error('Incorrect password');
    }
  };

  return (
    <>
      <Button 
        onClick={handleAdminAccess} 
        variant="outline" 
        className="flex items-center hover:bg-book-100"
      >
        <Shield className="mr-2 h-4 w-4" />
        Admin Access
      </Button>

      {/* Password Confirmation Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Access Verification</DialogTitle>
            <DialogDescription>
              Please re-enter your password to access the admin dashboard.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="pl-10 w-full"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handlePasswordSubmit();
                  }
                }}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handlePasswordSubmit}>
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminAccess;
