
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Star, 
  Shield, 
  Calendar, 
  Edit, 
  Share2, 
  MessageCircle, 
  Flag 
} from 'lucide-react';
import ProfileEditDialog from './ProfileEditDialog';

interface ProfileHeaderProps {
  userData: any;
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
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-book-100">
        {/* Header Background */}
        <div className="bg-gradient-to-r from-book-500 to-book-600 h-24"></div>
        
        {/* Profile Content */}
        <div className="relative px-6 pb-6">
          {/* Profile Avatar */}
          <div className="absolute -top-12 left-6">
            <div className="bg-white rounded-full p-4 shadow-lg border-4 border-white">
              <User className="h-16 w-16 text-book-600" />
            </div>
          </div>
          
          {/* Action Buttons - Top Right */}
          <div className="flex justify-end pt-4 space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              className="border-book-300 text-book-600 hover:bg-book-50"
              onClick={onShareProfile}
            >
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
            
            {isOwnProfile ? (
              <Button 
                size="sm"
                className="bg-book-600 hover:bg-book-700 text-white"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-book-300 text-book-600 hover:bg-book-50"
                  onClick={onMessageUser}
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Message
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                  onClick={onReportUser}
                >
                  <Flag className="h-4 w-4 mr-1" />
                  Report
                </Button>
              </div>
            )}
          </div>
          
          {/* Profile Info */}
          <div className="mt-16 space-y-4">
            {/* Name and Basic Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{userData.name}</h1>
              <div className="flex items-center text-gray-600 mb-3">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Member since {formatDate(userData.joinDate)}</span>
              </div>
            </div>
            
            {/* Rating and Badges */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Rating */}
              <div className="flex items-center bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-200">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < Math.round(userData.rating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="font-medium text-gray-900">{userData.rating.toFixed(1)}</span>
              </div>
              
              {/* Verification Badge */}
              {userData.isVerified && (
                <Badge className="bg-book-100 text-book-700 border-book-200 flex items-center px-3 py-1">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified Seller
                </Badge>
              )}
              
              {/* Deliveries Badge */}
              <Badge className="bg-green-100 text-green-700 border-green-200 px-3 py-1">
                {userData.successfulDeliveries} Successful Deliveries
              </Badge>
              
              {/* Rate User Button (for non-own profiles) */}
              {!isOwnProfile && onRateUser && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-book-300 text-book-600 hover:bg-book-50"
                  onClick={onRateUser}
                >
                  <Star className="h-4 w-4 mr-1" />
                  Rate User
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <ProfileEditDialog 
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      />
    </>
  );
};

export default ProfileHeader;
