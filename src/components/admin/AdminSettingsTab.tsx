
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Settings, MessageSquare } from 'lucide-react';

interface AdminSettingsTabProps {
  broadcastMessage: string;
  setBroadcastMessage: (message: string) => void;
  onSendBroadcast: () => void;
}

const AdminSettingsTab = ({ 
  broadcastMessage, 
  setBroadcastMessage, 
  onSendBroadcast 
}: AdminSettingsTabProps) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg md:text-xl">Site Configuration</CardTitle>
        <CardDescription className="text-sm">Manage site-wide settings and features</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6">
        <div>
          <h4 className="text-sm font-medium mb-2">Broadcast Message</h4>
          <p className="text-xs text-gray-500 mb-2">
            Messages will appear as pop-ups for offline users and notifications for active users. Press Enter for line breaks.
          </p>
          <div className="flex flex-col space-y-2">
            <Textarea
              placeholder="Enter message to send to all users... Press Enter for line breaks."
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              className="min-h-[100px] text-sm resize-vertical"
              rows={4}
            />
            <Button onClick={onSendBroadcast} className="w-full md:w-auto md:self-start">
              <MessageSquare className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Listing Settings</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Auto-approve new listings</span>
              <Badge variant="default" className="text-xs">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">User registration</span>
              <Button variant="outline" size="sm" className="h-7 w-7 p-0 md:h-8 md:w-auto md:px-2">
                <Settings className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Maximum images per listing</span>
              <Button variant="outline" size="sm" className="h-7 w-7 p-0 md:h-8 md:w-auto md:px-2">
                <Settings className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminSettingsTab;
