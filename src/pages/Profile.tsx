
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import ProfileHeader from '@/components/ProfileHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Lock, User, Mail, MapPin } from 'lucide-react';
import ProfileEditDialog from '@/components/ProfileEditDialog';
import ChangePasswordDialog from '@/components/ChangePasswordDialog';

const Profile = () => {
  const { profile, user } = useAuth();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);

  if (!profile || !user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const handleShareProfile = () => {
    // Implement share functionality
    console.log('Share profile clicked');
  };

  // Convert profile to userData format expected by ProfileHeader
  const userData = {
    name: profile.name || 'Anonymous User',
    joinDate: profile.created_at,
    rating: 4.5, // Default rating - you might want to add this to your profile table
    isVerified: false, // Default - you might want to add this to your profile table
    successfulDeliveries: 0 // Default - you might want to add this to your profile table
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <ProfileHeader 
          userData={userData}
          isOwnProfile={true}
          onShareProfile={handleShareProfile}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Main Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-gray-900">{profile.name || 'Not set'}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500 flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </p>
                    <p className="text-gray-900">{profile.email}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center pt-4">
                  <Button
                    onClick={() => setIsEditDialogOpen(true)}
                    className="bg-book-600 hover:bg-book-700"
                  >
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Password</p>
                    <p className="text-sm text-gray-500 mb-3">
                      Keep your account secure with a strong password
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsChangePasswordDialogOpen(true)}
                      className="w-full"
                    >
                      Change Password
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Edit Profile Dialog */}
        <ProfileEditDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
        />

        {/* Change Password Dialog */}
        <ChangePasswordDialog
          open={isChangePasswordDialogOpen}
          onOpenChange={setIsChangePasswordDialogOpen}
        />
      </div>
    </Layout>
  );
};

export default Profile;
