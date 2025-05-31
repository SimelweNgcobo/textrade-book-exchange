
import { ReactNode } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileOptimizedProps {
  children: ReactNode;
  mobileClassName?: string;
  desktopClassName?: string;
}

const MobileOptimized = ({ children, mobileClassName = '', desktopClassName = '' }: MobileOptimizedProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={isMobile ? mobileClassName : desktopClassName}>
      {children}
    </div>
  );
};

export default MobileOptimized;
