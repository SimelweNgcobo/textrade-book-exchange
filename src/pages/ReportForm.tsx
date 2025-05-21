
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Flag, AlertTriangle } from 'lucide-react';

const ReportForm = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [reportType, setReportType] = useState<'listing' | 'user'>('listing');
  const [entityId, setEntityId] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const severityOptions = [
    { value: 'low', label: 'Low - Minor issue' },
    { value: 'medium', label: 'Medium - Concerning issue' },
    { value: 'high', label: 'High - Urgent problem' }
  ];

  // This would be implemented in a real application to actually fetch books
  // For demo purposes, we'll use mock data
  const bookOptions = [
    { id: 'book-1', title: 'Introduction to Psychology' },
    { id: 'book-2', title: 'Calculus for Beginners' },
    { id: 'book-3', title: 'Modern Physics' },
    { id: 'book-4', title: 'Literature Anthology' }
  ];

  // This would be implemented in a real application to actually fetch users
  // For demo purposes, we'll use mock data
  const userOptions = [
    { id: 'user-1', name: 'Alice Johnson' },
    { id: 'user-2', name: 'Bob Smith' },
    { id: 'user-3', name: 'Charlie Brown' },
    { id: 'user-4', name: 'Diana Prince' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, this would actually submit to the database
      // For demo purposes, we'll just show a toast
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network request
      
      toast.success('Report submitted successfully');
      navigate('/profile');
    } catch (error) {
      toast.error('Failed to submit report');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-book-600">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="flex items-center mb-6">
            <Flag className="h-6 w-6 text-red-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Report an Issue</h1>
          </div>

          <div className="bg-amber-50 p-4 rounded-md border border-amber-200 mb-6">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-800">Important Information</h3>
                <p className="text-sm text-amber-700 mt-1">
                  Reports are reviewed by our team within 24-48 hours. Submitting false reports may result in account suspension. For immediate safety concerns, please contact local authorities.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Label>What would you like to report?</Label>
              <RadioGroup 
                value={reportType} 
                onValueChange={(value) => setReportType(value as 'listing' | 'user')}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="listing" id="report-listing" />
                  <Label htmlFor="report-listing" className="font-normal">A book listing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="report-user" />
                  <Label htmlFor="report-user" className="font-normal">A user</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="entityId">
                {reportType === 'listing' ? 'Select the book listing' : 'Select the user'}
              </Label>
              <Select
                value={entityId}
                onValueChange={setEntityId}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Select a ${reportType}`} />
                </SelectTrigger>
                <SelectContent>
                  {reportType === 'listing' 
                    ? bookOptions.map(book => (
                        <SelectItem key={book.id} value={book.id}>
                          {book.title}
                        </SelectItem>
                      ))
                    : userOptions.map(user => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))
                  }
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="severity">Severity</Label>
              <Select
                value={severity}
                onValueChange={setSeverity}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  {severityOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe the issue in detail"
                className="min-h-[150px]"
                required
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Flag className="mr-2 h-4 w-4" />
                    Submit Report
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ReportForm;
