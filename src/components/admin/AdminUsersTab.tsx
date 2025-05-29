
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserX, CheckCircle } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { AdminUser } from '@/services/adminService';
import { useIsMobile } from '@/hooks/use-mobile';

interface AdminUsersTabProps {
  users: AdminUser[];
  onUserAction: (userId: string, action: 'suspend' | 'activate') => void;
}

const AdminUsersTab = ({ users, onUserAction }: AdminUsersTabProps) => {
  const isMobile = useIsMobile();

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg md:text-xl">User Management</CardTitle>
        <CardDescription className="text-sm">Manage registered users and their accounts</CardDescription>
      </CardHeader>
      <CardContent className="p-0 md:p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs md:text-sm min-w-[100px]">Name</TableHead>
                <TableHead className="text-xs md:text-sm min-w-[150px]">Email</TableHead>
                <TableHead className="text-xs md:text-sm min-w-[80px]">Status</TableHead>
                <TableHead className="text-xs md:text-sm min-w-[80px]">Listings</TableHead>
                <TableHead className="text-xs md:text-sm min-w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="text-xs md:text-sm font-medium">{user.name}</TableCell>
                  <TableCell className="text-xs md:text-sm">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'default' : 'destructive'} className="text-xs">
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs md:text-sm">{user.listingsCount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      {user.status === 'active' ? (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => onUserAction(user.id, 'suspend')}
                          className="h-7 w-7 p-0 md:h-8 md:w-auto md:px-2"
                        >
                          <UserX className="h-3 w-3 md:h-4 md:w-4" />
                          {!isMobile && <span className="ml-1">Suspend</span>}
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => onUserAction(user.id, 'activate')}
                          className="h-7 w-7 p-0 md:h-8 md:w-auto md:px-2"
                        >
                          <CheckCircle className="h-3 w-3 md:h-4 md:w-4" />
                          {!isMobile && <span className="ml-1">Activate</span>}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminUsersTab;
