
import { Button } from '@/components/ui/button';
import { User, Share2, HelpCircle } from 'lucide-react';

interface ProfileActionsProps {
  onEditProfile: () => void;
  onShareProfile: () => void;
  onBookNotSelling: () => void;
}

const ProfileActions = ({ 
  onEditProfile, 
  onShareProfile, 
  onBookNotSelling 
}: ProfileActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <Button
        onClick={onEditProfile}
        variant="outline"
        className="border-book-600 text-book-600 hover:bg-book-50 flex-1 min-h-[44px]"
        size="lg"
      >
        <User className="h-4 w-4 mr-2" />
        Edit Profile
      </Button>
      
      <Button
        onClick={onShareProfile}
        variant="outline"
        className="border-book-600 text-book-600 hover:bg-book-50 flex-1 min-h-[44px]"
        size="lg"
      >
        <Share2 className="h-4 w-4 mr-2" />
        Share Profile
      </Button>
      
      <Button
        onClick={onBookNotSelling}
        variant="outline"
        className="border-gray-600 text-gray-600 hover:bg-gray-50 flex-1 min-h-[44px]"
        size="lg"
      >
        <HelpCircle className="h-4 w-4 mr-2" />
        Book not selling?
      </Button>
    </div>
  );
};

export default ProfileActions;
