
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import { 
  getAllBooks, 
  getTransactions, 
  getTotalCommission, 
  removeBook 
} from '@/services/bookService';
import { Book } from '@/types/book';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow,
  TableFooter
} from '@/components/ui/table';
import { Book as BookIcon, Trash, Users, TrendingUp } from 'lucide-react';

const Admin = () => {
  const [includesSold, setIncludesSold] = useState(true);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  
  const { 
    data: books = [], 
    isLoading: booksLoading,
    refetch: refetchBooks
  } = useQuery({
    queryKey: ['admin-books', includesSold],
    queryFn: () => getAllBooks(includesSold),
  });
  
  const { 
    data: transactions = [], 
    isLoading: transactionsLoading,
    refetch: refetchTransactions
  } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  });
  
  const { 
    data: totalCommission = 0, 
    isLoading: commissionLoading,
    refetch: refetchCommission
  } = useQuery({
    queryKey: ['total-commission'],
    queryFn: getTotalCommission,
  });

  const handleRemoveBook = async (bookId: string) => {
    try {
      setIsRemoving(bookId);
      const response = await removeBook(bookId);
      if (response.success) {
        toast.success(response.message);
        refetchBooks();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Error removing book:', error);
      toast.error('Failed to remove book');
    } finally {
      setIsRemoving(null);
    }
  };

  // Calculate stats for dashboard
  const soldBooks = books.filter(book => book.sold).length;
  const activeListings = books.filter(book => !book.sold).length;
  
  // Data for charts
  const pieData = [
    { name: 'Sold', value: soldBooks },
    { name: 'Active', value: activeListings },
  ];
  
  const COLORS = ['#0088FE', '#00C49F'];
  
  // Group transactions by date (simplified to just the day)
  const transactionsByDate = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = {
        date,
        count: 0,
        commission: 0
      };
    }
    acc[date].count++;
    acc[date].commission += transaction.commission;
    return acc;
  }, {} as Record<string, { date: string; count: number; commission: number }>);
  
  const chartData = Object.values(transactionsByDate);

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Commission
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R{totalCommission}</div>
              <p className="text-xs text-muted-foreground">
                From {transactions.length} transactions
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Books
              </CardTitle>
              <BookIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{books.length}</div>
              <p className="text-xs text-muted-foreground">
                {activeListings} active, {soldBooks} sold
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(books.map(book => book.seller.id)).size}
              </div>
              <p className="text-xs text-muted-foreground">
                Unique sellers
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="books" className="space-y-4">
          <TabsList>
            <TabsTrigger value="books">Book Listings</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="books" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">All Books</h2>
              <Button 
                variant="outline" 
                onClick={() => setIncludesSold(!includesSold)}
              >
                {includesSold ? 'Hide Sold Books' : 'Show Sold Books'}
              </Button>
            </div>
            
            {booksLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-1/4 font-semibold text-gray-900">Title</TableHead>
                      <TableHead className="w-1/6 font-semibold text-gray-900">Author</TableHead>
                      <TableHead className="w-1/8 font-semibold text-gray-900">Price</TableHead>
                      <TableHead className="w-1/6 font-semibold text-gray-900">Seller</TableHead>
                      <TableHead className="w-1/8 font-semibold text-gray-900">Status</TableHead>
                      <TableHead className="w-1/8 font-semibold text-gray-900 text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {books.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          No books found
                        </TableCell>
                      </TableRow>
                    ) : (
                      books.map((book) => (
                        <TableRow key={book.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium text-gray-900 max-w-0">
                            <div className="truncate" title={book.title}>
                              {book.title}
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-700 max-w-0">
                            <div className="truncate" title={book.author}>
                              {book.author}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium text-book-600">R{book.price}</TableCell>
                          <TableCell className="text-gray-700 max-w-0">
                            <div className="truncate" title={book.seller.name}>
                              {book.seller.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              book.sold 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {book.sold ? 'Sold' : 'Active'}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveBook(book.id)}
                              disabled={isRemoving === book.id}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              title="Remove Book"
                            >
                              {isRemoving === book.id ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                              ) : (
                                <Trash className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="transactions" className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">All Transactions</h2>
            
            {transactionsLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-1/5 font-semibold text-gray-900">Date</TableHead>
                      <TableHead className="w-2/5 font-semibold text-gray-900">Book</TableHead>
                      <TableHead className="w-1/5 font-semibold text-gray-900">Seller</TableHead>
                      <TableHead className="w-1/10 font-semibold text-gray-900">Price</TableHead>
                      <TableHead className="w-1/10 font-semibold text-gray-900">Commission</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                          No transactions found
                        </TableCell>
                      </TableRow>
                    ) : (
                      transactions.map((transaction) => (
                        <TableRow key={transaction.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium text-gray-900">
                            {new Date(transaction.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-gray-700 max-w-0">
                            <div className="truncate" title={transaction.bookTitle}>
                              {transaction.bookTitle}
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-700 max-w-0">
                            <div className="truncate" title={transaction.sellerName}>
                              {transaction.sellerName}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium text-book-600">R{transaction.price}</TableCell>
                          <TableCell className="font-medium text-green-600">R{transaction.commission}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow className="bg-gray-50">
                      <TableCell colSpan={4} className="font-semibold text-gray-900">Total Commission</TableCell>
                      <TableCell className="font-bold text-green-600">R{totalCommission}</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Book Status</CardTitle>
                  <CardDescription>Distribution of sold vs. active books</CardDescription>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sales Over Time</CardTitle>
                  <CardDescription>Commission earned by date</CardDescription>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="commission" fill="#8884d8" name="Commission (R)" />
                      <Bar dataKey="count" fill="#82ca9d" name="Sales Count" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
