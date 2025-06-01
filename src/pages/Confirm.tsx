
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
        console.log('Starting email confirmation process');
        const url = new URL(window.location.href);
        const token_hash = url.searchParams.get('token_hash');
        const type = url.searchParams.get('type');
        const access_token = url.searchParams.get('access_token');
        const refresh_token = url.searchParams.get('refresh_token');
        
        console.log('URL params:', { token_hash, type, access_token, refresh_token });

        if (token_hash && type) {
          console.log('Using token hash verification');
          const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: type as any,
          });
          
          if (error) {
            console.error('Email confirmation error:', error);
            setStatus('error');
            setMessage('Email confirmation failed. The link may have expired or already been used.');
            toast.error('Email confirmation failed');
          } else {
            console.log('Email confirmed successfully');
            setStatus('success');
            setMessage('Email confirmed successfully! You are now logged in.');
            toast.success('Email confirmed successfully!');
            setTimeout(() => navigate('/'), 3000);
          }
        } else if (access_token && refresh_token) {
          console.log('Using session tokens');
          const { error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });
          
          if (error) {
            console.error('Session error:', error);
            setStatus('error');
            setMessage('Email confirmation failed. The link may have expired.');
            toast.error('Email confirmation failed');
          } else {
            console.log('Session set successfully');
            setStatus('success');
            setMessage('Email confirmed successfully! You are now logged in.');
            toast.success('Email confirmed successfully!');
            setTimeout(() => navigate('/'), 3000);
          }
        } else {
          console.log('Using code exchange method');
          const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
          
          if (error) {
            console.error('Code exchange error:', error);
            setStatus('error');
            setMessage('Email confirmation failed. The link may have expired.');
            toast.error('Email confirmation failed');
          } else {
            console.log('Code exchange successful');
            setStatus('success');
            setMessage('Email confirmed successfully! You are now logged in.');
            toast.success('Email confirmed successfully!');
            setTimeout(() => navigate('/'), 3000);
          }
        }
      } catch (error: any) {
        console.error('Unexpected error during confirmation:', error);
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again.');
        toast.error('An unexpected error occurred');
      }
    };

    handleConfirm();
  }, [navigate]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 text-center">
            {status === 'loading' && (
              <>
                <Loader2 className="h-12 w-12 text-book-600 mx-auto mb-4 animate-spin" />
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">
                  Confirming your email...
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Please wait while we confirm your email address.
                </p>
              </>
            )}
            
            {status === 'success' && (
              <>
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">
                  Email Confirmed!
                </h2>
                <p className="text-gray-600 mb-4 text-sm md:text-base">
                  {message}
                </p>
                <p className="text-xs md:text-sm text-gray-500 mb-4">
                  Welcome to ReBooked Solutions - Pre-Loved Pages, New Adventures
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  Redirecting you to the home page...
                </p>
              </>
            )}
            
            {status === 'error' && (
              <>
                <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">
                  Confirmation Failed
                </h2>
                <p className="text-gray-600 mb-4 text-sm md:text-base">
                  {message}
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => navigate('/login')}
                    className="bg-book-600 hover:bg-book-700 text-white px-4 md:px-6 py-2 rounded-lg transition-colors text-sm md:text-base w-full"
                  >
                    Go to Login
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 md:px-6 py-2 rounded-lg transition-colors text-sm md:text-base w-full"
                  >
                    Register Again
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Confirm;
