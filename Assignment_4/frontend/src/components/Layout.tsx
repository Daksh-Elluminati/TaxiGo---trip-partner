import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode; // Define the type for the children prop
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  
  // Check if the current page is the login or signup page
  const isAuthPage = router.pathname === '/login' || router.pathname === '/signup';

  return (
    <div className="d-flex">
      {/* Only render Sidebar if not on the login or signup page */}
      {!isAuthPage && <Sidebar />}
      
      <div
        className="flex-grow-1"
        style={{
          marginLeft: isAuthPage ? '0' : '125px', // Adjust margin for sidebar presence
          transition: 'margin-left 0.3s ease',
        }}
      >
        {children}
      </div>
      
      <style jsx global>{`
        @media (max-width: 767px) {
          .flex-grow-1 {
            margin-left: 0 !important; /* Full-width content for mobile */
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
