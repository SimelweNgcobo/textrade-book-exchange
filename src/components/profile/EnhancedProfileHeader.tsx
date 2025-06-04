
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, BookOpen, TrendingUp, Share2, Edit } from 'lucide-react';
import { Profile } from '@/types/auth';
import ProfileEditDialog from '@/components/ProfileEditDialog';
import ShareProfileDialog from '@/components/ShareProfileDialog';
import { getUserStats } from '@/services/userStatsService';
import { useQuery } from '@tanstack/react-query';

interface EnhancedProfileHeaderProps {
  profile: Profile;
  isOwnProfile: boolean;
  onProfileUpdate?: () => void;
}

const EnhancedProfileHeader = ({ profile, isOwnProfile, onProfileUpdate }: EnhancedProfileHeaderProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const { data: userStats } = useQuery({
    queryKey: ['userStats', profile.id],
    queryFn: () => getUserStats(profile.id),
    enabled: !!profile.id
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage 
                src={profile.profile_picture_url || ''} 
                alt={profile.name || 'User'} 
              />
              <AvatarFallback className="text-lg font-semibold bg-book-100">
                {getInitials(profile.name || 'User')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <CardTitle className="text-xl sm:text-2xl text-book-800">
                  {profile.name || 'Anonymous User'}
                </CardTitle>
                <div className="flex gap-2 justify-center sm:justify-end">
                  {isOwnProfile && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditDialogOpen(true)}
                      className="min-h-[36px]"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsShareDialogOpen(true)}
                    className="min-h-[36px]"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Profile
                  </Button>
                </div>
              </div>
              
              {profile.bio && (
                <p className="text-gray-600 mb-3">{profile.bio}</p>
              )}
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {formatJoinDate(profile.created_at)}</span>
                </div>
                {userStats?.lastActive && (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Last active {new Date(userStats.lastActive).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-book-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-1">
                <BookOpen className="h-4 w-4 text-book-600" />
                <span className="font-semibold text-book-800">
                  {userStats?.totalBooksListed || 0}
                </span>
              </div>
              <p className="text-xs text-gray-600">Books Listed</p>
            </div>
            
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-green-800">
                  {userStats?.totalBooksSold || 0}
                </span>
              </div>
              <p className="text-xs text-gray-600">Books Sold</p>
            </div>
            
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-1">
                <MapPin className="h-4 w-4 text-blue-600" />
                <Badge variant={userStats?.addressValidated ? "default" : "secondary"} className="text-xs">
                  {userStats?.addressValidated ? "Verified" : "Pending"}
                </Badge>
              </div>
              <p className="text-xs text-gray-600">Address Status</p>
            </div>
            
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="font-semibold text-purple-800">
                  {userStats?.canListBooks ? "Active" : "Limited"}
                </span>
              </div>
              <p className="text-xs text-gray-600">Seller Status</p>
            </div>
          </div>
          
          {!userStats?.addressValidated && isOwnProfile && (
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>Action Required:</strong> Please add your pickup address to start listing books.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <ProfileEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        profile={profile}
        onProfileUpdate={onProfileUpdate}
      />

      <ShareProfileDialog
        isOpen={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        userId={profile.id}
        userName={profile.name || 'User'}
        isOwnProfile={isOwnProfile}
      />
    </>
  );
};

export default EnhancedProfileHeader;
