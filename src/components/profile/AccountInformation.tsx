
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Edit } from 'lucide-react';

interface AccountInformationProps {
  profile: {
    name?: string;
    email: string;
  };
  onEditProfile: () => void;
}

const AccountInformation = ({ 
  profile, 
  onEditProfile
}: AccountInformationProps) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg">
          <User className="h-5 w-5 mr-2" />
          Account Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p className="text-gray-900 mt-1">{profile.name || 'Not set'}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500 flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              Email
            </p>
            <p className="text-gray-900 mt-1">{profile.email}</p>
          </div>
        </div>
        
        <div className="pt-4">
          <Button
            onClick={onEditProfile}
            className="w-full sm:w-auto bg-book-600 hover:bg-book-700"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountInformation;
