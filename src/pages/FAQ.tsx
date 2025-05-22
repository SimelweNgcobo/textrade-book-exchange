
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const FAQ = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-book-600">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-2xl font-bold text-book-800 mb-6">Frequently Asked Questions</h1>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-book-700 mb-2">What is ReBooked?</h3>
              <p className="text-gray-600">
                ReBooked is a platform where individuals can buy and sell second-hand or new books. It provides a safe and accessible environment for book lovers to exchange books.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-book-700 mb-2">How much will I earn when I sell my book?</h3>
              <p className="text-gray-600">
                Sellers keep 90% of the sale price. ReBooked takes a 10% commission to help maintain and improve the platform.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-book-700 mb-2">Does ReBooked buy books?</h3>
              <p className="text-gray-600">
                No, ReBooked does not directly purchase books. We provide an environment where people can sell their books to other individuals.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-book-700 mb-2">How do I list a book for sale?</h3>
              <p className="text-gray-600">
                Create an account, upload your book's details and images, set your price, and publish your listing. It's quick and easy!
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-book-700 mb-2">Is it free to sign up?</h3>
              <p className="text-gray-600">
                Yes, signing up and browsing books is completely free. You only pay or earn when a transaction occurs.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-book-700 mb-2">What kinds of books can I sell on ReBooked?</h3>
              <p className="text-gray-600">
                You can sell new or used books in good condition, including textbooks, fiction, non-fiction, and more. We encourage clean, readable copies.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-book-700 mb-2">What if I have an issue with a transaction?</h3>
              <p className="text-gray-600">
                If there's a problem—like a missing delivery or damaged book—you can contact ReBooked support for help. We aim to keep the platform safe and fair.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-book-700 mb-2">Can I edit or delete my book listing?</h3>
              <p className="text-gray-600">
                Yes, you can manage your listings at any time from your account dashboard.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-book-700 mb-2">Is ReBooked available outside of South Africa?</h3>
              <p className="text-gray-600">
                Currently, ReBooked is focused on serving users within South Africa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
