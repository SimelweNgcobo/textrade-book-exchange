
import React, { useState } from 'react';
import { Camera, MapPin, Calendar, Share2, Edit, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Profile } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';
import ProfileEditDialog from '@/components/ProfileEditDialog';
import ShareProfileDialog from '@/components/ShareProfileDialog';

interface EnhancedProfileHeaderProps {
  profile: Profile;
  isOwnProfile: boolean;
  onProfileUpdate: () => void;
}

const EnhancedProfileHeader: React.FC<EnhancedProfileHeaderProps> = ({
  profile,
  isOwnProfile,
  onProfileUpdate
}) => {
  const { userStats } = useAuth();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const getInitials = (name: string | null) => {
    if (!name) return 'A';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'suspended': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative">
                <Avatar className="w-20 h-20 md:w-24 md:h-24">
                  <AvatarImage 
                    src={profile.profile_picture_url || undefined} 
                    alt={profile.name || 'User'} 
                  />
                  <AvatarFallback className="text-lg md:text-xl font-semibold bg-book-100 text-book-700">
                    {getInitials(profile.name)}
                  </AvatarFallback>
                </Avatar>
                {isOwnProfile && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-white border-2"
                    onClick={() => setIsEditDialogOpen(true)}
                  >
                    <Camera className="h-3 w-3" />
                  </Button>
                )}
              </div>
              
              {/* Status Badge */}
              <div className="flex items-center gap-2 mt-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(profile.status)}`} />
                <span className="text-xs text-gray-600 capitalize">
                  {profile.status || 'active'}
                </span>
              </div>
            </div>

            {/* Profile Info Section */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900 text-center md:text-left">
                    {profile.name || 'Anonymous User'}
                  </h1>
                  <p className="text-sm text-gray-600 text-center md:text-left">
                    {profile.email}
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 justify-center md:justify-start">
                  {isOwnProfile ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditDialogOpen(true)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-3 w-3" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsShareDialogOpen(true)}
                        className="flex items-center gap-1"
                      >
                        <Share2 className="h-3 w-3" />
                        <span className="hidden sm:inline">Share</span>
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsShareDialogOpen(true)}
                      className="flex items-center gap-1"
                    >
                      <Share2 className="h-3 w-3" />
                      <span className="hidden sm:inline">Share Profile</span>
                    </Button>
                  )}
                </div>
              </div>

              {/* Bio */}
              {profile.bio && (
                <p className="text-sm text-gray-700 leading-relaxed text-center md:text-left">
                  {profile.bio}
                </p>
              )}

              {/* Stats Row */}
              {userStats && (
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingUp className="h-4 w-4 text-book-600" />
                    <span className="font-medium">{userStats.totalBooksListed}</span>
                    <span className="text-gray-600">listed</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Award className="h-4 w-4 text-green-600" />
                    <span className="font-medium">{userStats.totalBooksSold}</span>
                    <span className="text-gray-600">sold</span>
                  </div>
                  {userStats.canListBooks && (
                    <Badge variant="secondary" className="text-xs">
                      Verified Seller
                    </Badge>
                  )}
                </div>
              )}

              {/* Member Since */}
              <div className="flex items-center gap-1 text-xs text-gray-500 justify-center md:justify-start">
                <Calendar className="h-3 w-3" />
                <span>Member since {formatDate(profile.created_at)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProfileEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSuccess={onProfileUpdate}
      />

      <ShareProfileDialog
        isOpen={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        userId={profile.id}
        userName={profile.name || 'Anonymous User'}
        isOwnProfile={isOwnProfile}
      />
    </>
  );
};

export default EnhancedProfileHeader;
