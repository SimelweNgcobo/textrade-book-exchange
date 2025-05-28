
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

const Confirm = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleConfirm = async () => {
      try {
        // Get the current URL
        const url = new URL(window.location.href);
        const token_hash = url.searchParams.get('token_hash');
        const type = url.searchParams.get('type');
        
        if (token_hash && type) {
          const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: type as any,
          });
          
          if (error) {
            console.error('Email confirmation error:', error);
            setStatus('error');
            setMessage(error.message || 'Email confirmation failed');
            toast.error('Email confirmation failed: ' + error.message);
          } else {
            setStatus('success');
            setMessage('Email confirmed! You are now logged in.');
            toast.success('Email confirmed successfully!');
            // Redirect to home page after a short delay
            setTimeout(() => navigate('/'), 2000);
          }
        } else {
          // Fallback for older confirmation links
          const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
          
          if (error) {
            console.error('Email confirmation error:', error);
            setStatus('error');
            setMessage(error.message || 'Email confirmation failed');
            toast.error('Email confirmation failed: ' + error.message);
          } else {
            setStatus('success');
            setMessage('Email confirmed! You are now logged in.');
            toast.success('Email confirmed successfully!');
            // Redirect to home page after a short delay
            setTimeout(() => navigate('/'), 2000);
          }
        }
      } catch (error: any) {
        console.error('Unexpected error during confirmation:', error);
        setStatus('error');
        setMessage('An unexpected error occurred');
        toast.error('An unexpected error occurred');
      }
    };

    handleConfirm();
  }, [navigate]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            {status === 'loading' && (
              <>
                <Loader2 className="h-12 w-12 text-book-600 mx-auto mb-4 animate-spin" />
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                  Confirming your email...
                </h2>
                <p className="text-gray-600">
                  Please wait while we confirm your email address.
                </p>
              </>
            )}
            
            {status === 'success' && (
              <>
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                  Email Confirmed!
                </h2>
                <p className="text-gray-600 mb-4">
                  {message}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Welcome to ReBooked Solutions - Pre-Loved Pages, New Adventures
                </p>
                <p className="text-sm text-gray-500">
                  Redirecting you to the home page...
                </p>
              </>
            )}
            
            {status === 'error' && (
              <>
                <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                  Confirmation Failed
                </h2>
                <p className="text-gray-600 mb-4">
                  {message}
                </p>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-book-600 hover:bg-book-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Go to Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Confirm;
