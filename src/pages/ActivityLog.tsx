
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, Clock, ShoppingCart, Star, BookIcon, HeartIcon } from 'lucide-react';

const ActivityLog = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  
  // For demo, we'll use mock data
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd fetch this from your database
    setTimeout(() => {
      const mockActivities = [
        {
          id: 1,
          type: 'purchase',
          date: '2025-05-19T10:30:00',
          details: {
            bookTitle: 'Introduction to Psychology',
            price: 450,
            seller: 'Alice Johnson',
            status: 'completed'
          }
        },
        {
          id: 2,
          type: 'sale',
          date: '2025-05-15T14:20:00',
          details: {
            bookTitle: 'Calculus Made Easy',
            price: 350,
            buyer: 'Bob Smith',
            status: 'completed'
          }
        },
        {
          id: 3,
          type: 'wishlist',
          date: '2025-05-10T09:15:00',
          details: {
            bookTitle: 'Modern Physics',
            status: 'active'
          }
        },
        {
          id: 4,
          type: 'rating',
          date: '2025-05-08T16:45:00',
          details: {
            user: 'Charlie Brown',
            rating: 5,
            comment: 'Great service, book exactly as described!'
          }
        },
        {
          id: 5,
          type: 'listing',
          date: '2025-05-05T11:30:00',
          details: {
            bookTitle: 'Introduction to Computer Science',
            price: 500,
            status: 'active'
          }
        }
      ];
      
      setActivities(mockActivities);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'purchase':
        return <ShoppingCart className="h-5 w-5 text-blue-500" />;
      case 'sale':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'wishlist':
        return <HeartIcon className="h-5 w-5 text-red-500" />;
      case 'rating':
        return <Star className="h-5 w-5 text-yellow-500" />;
      case 'listing':
        return <BookIcon className="h-5 w-5 text-purple-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getActivityTitle = (activity: any) => {
    switch (activity.type) {
      case 'purchase':
        return `Purchased ${activity.details.bookTitle}`;
      case 'sale':
        return `Sold ${activity.details.bookTitle}`;
      case 'wishlist':
        return `Added ${activity.details.bookTitle} to wishlist`;
      case 'rating':
        return `Rated ${activity.details.user}`;
      case 'listing':
        return `Listed ${activity.details.bookTitle} for sale`;
      default:
        return 'Activity recorded';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'active':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Active</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredActivities = activeTab === "all" 
    ? activities 
    : activities.filter(activity => activity.type === activeTab);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-book-600">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Activity History</h1>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-5 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="purchase">Purchases</TabsTrigger>
              <TabsTrigger value="sale">Sales</TabsTrigger>
              <TabsTrigger value="listing">Listings</TabsTrigger>
              <TabsTrigger value="rating">Ratings</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-book-600"></div>
                </div>
              ) : filteredActivities.length > 0 ? (
                <div className="space-y-4">
                  {filteredActivities.map((activity) => (
                    <div 
                      key={activity.id} 
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start">
                        <div className="bg-white p-2 rounded-full shadow-sm mr-4">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-gray-800">
                              {getActivityTitle(activity)}
                            </h3>
                            <div className="text-sm text-gray-500">
                              {formatDate(activity.date)}
                            </div>
                          </div>
                          
                          <div className="mt-1 text-sm text-gray-600">
                            {activity.type === 'purchase' && (
                              <p>Purchased from {activity.details.seller} for R{activity.details.price}</p>
                            )}
                            {activity.type === 'sale' && (
                              <p>Sold to {activity.details.buyer} for R{activity.details.price}</p>
                            )}
                            {activity.type === 'wishlist' && (
                              <p>You'll be notified when this book becomes available</p>
                            )}
                            {activity.type === 'rating' && (
                              <div>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${i < activity.details.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                                    />
                                  ))}
                                </div>
                                <p className="mt-1 italic">"{activity.details.comment}"</p>
                              </div>
                            )}
                            {activity.type === 'listing' && (
                              <p>Listed for R{activity.details.price}</p>
                            )}
                          </div>
                          
                          <div className="mt-2 flex justify-between items-center">
                            {activity.details.status && getStatusBadge(activity.details.status)}
                            
                            {(activity.type === 'purchase' || activity.type === 'sale') && 
                              activity.details.status === 'completed' && (
                              <Button variant="ghost" size="sm" className="text-book-600 hover:text-book-800">
                                View Details
                              </Button>
                            )}
                            
                            {activity.type === 'listing' && activity.details.status === 'active' && (
                              <Button variant="ghost" size="sm" className="text-book-600 hover:text-book-800">
                                Edit Listing
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-gray-500">No {activeTab === "all" ? "activities" : activeTab} found.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ActivityLog;
