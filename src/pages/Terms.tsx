
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Terms = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-book-600">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-2xl font-bold text-book-800 mb-6">Terms and Conditions</h1>
          
          <div className="prose max-w-none text-gray-600">
            <p>
              This page will contain the full Terms and Conditions text once provided.
              The terms and conditions will outline the rules, guidelines, and agreements
              for using the ReBooked platform.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
