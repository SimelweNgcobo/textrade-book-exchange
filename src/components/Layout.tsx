
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from '@/components/ui/sonner';
import BroadcastPopup from './BroadcastPopup';
import { useBroadcastMessages } from '@/hooks/useBroadcastMessages';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // This hook now works for all users, not just logged-in ones
  const { pendingMessage, showPopup, closePopup } = useBroadcastMessages();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <Toaster />
      
      {/* Broadcast Message Popup - now works for all users */}
      {pendingMessage && (
        <BroadcastPopup
          message={pendingMessage}
          isOpen={showPopup}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default Layout;
