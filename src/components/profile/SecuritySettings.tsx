
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

interface SecuritySettingsProps {
  onChangePassword: () => void;
}

const SecuritySettings = ({ onChangePassword }: SecuritySettingsProps) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg">
          <Lock className="h-5 w-5 mr-2" />
          Security
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-900">Password</p>
          <p className="text-sm text-gray-500 mb-3">
            Keep your account secure with a strong password
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={onChangePassword}
            className="w-full"
          >
            Change Password
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
