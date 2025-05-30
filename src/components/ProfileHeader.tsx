
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Share2, 
  MessageCircle, 
  AlertTriangle, 
  Star, 
  Calendar,
  CheckCircle,
  User
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface UserData {
  id?: string;
  name: string;
  joinDate: string;
  rating?: number;
  isVerified: boolean;
  successfulDeliveries?: number;
}

interface ProfileHeaderProps {
  userData: UserData;
  isOwnProfile: boolean;
  onShareProfile: () => void;
  onRateUser?: () => void;
  onMessageUser?: () => void;
  onReportUser?: () => void;
}

const ProfileHeader = ({ 
  userData, 
  isOwnProfile, 
  onShareProfile,
  onRateUser,
  onMessageUser,
  onReportUser
}: ProfileHeaderProps) => {
  const { profile } = useAuth();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long'
    });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Profile Info */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-book-100 rounded-full flex items-center justify-center overflow-hidden">
              {isOwnProfile && profile?.profile_picture_url ? (
                <img 
                  src={profile.profile_picture_url} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-8 w-8 text-book-600" />
              )}
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
                {userData.isVerified && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Joined {formatDate(userData.joinDate)}
                </div>
                
                {userData.rating !== undefined && (
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{userData.rating.toFixed(1)}</span>
                  </div>
                )}
                
                {userData.successfulDeliveries !== undefined && (
                  <Badge variant="outline" className="border-book-200 text-book-700 bg-book-50">
                    {userData.successfulDeliveries} successful deliveries
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onShareProfile}
              className="border-book-300 text-book-600 hover:bg-book-50"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Profile
            </Button>
            
            {!isOwnProfile && onMessageUser && (
              <Button
                variant="outline"
                size="sm"
                onClick={onMessageUser}
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
            )}
            
            {!isOwnProfile && onRateUser && (
              <Button
                size="sm"
                onClick={onRateUser}
                className="bg-book-600 hover:bg-book-700"
              >
                <Star className="h-4 w-4 mr-2" />
                Rate User
              </Button>
            )}
            
            {!isOwnProfile && onReportUser && (
              <Button
                variant="outline"
                size="sm"
                onClick={onReportUser}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
