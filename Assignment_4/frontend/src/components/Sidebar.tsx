import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Sidebar: React.FC = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [links, setLinks] = useState<{ name: string; link: string }[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Fetch user roles from localStorage
      const roles = localStorage.getItem('userRoles');
      if (roles) {
        const userRoles = JSON.parse(roles).userRoles;
        generateLinks(userRoles);
      }
    }
  }, []);

  const generateLinks = (userRoles: string[]) => {
    const adminLinks = [
      { name: 'Create Ride', link: '/createRide' },
      { name: 'Current Ride', link: '/currentRide' },
      { name: 'Ride History', link: '/ride_history' },      
      { name: 'Drivers', link: '/drivers' },
      { name: 'City', link: '/city' },
      { name: 'Vehicle Type', link: '/vehicle_type' },
      { name: 'Logout', link: '/logout' },
    ];

    const userLinks = [
      { name: 'Create Ride', link: '/createRide' },
      { name: 'Ride History', link: '/ride_history' },
      { name: 'Logout', link: '/logout' },
    ];

    const driverLinks = [
      { name: 'Current Ride', link: '/currentRide' },
      { name: 'Ride History', link: '/ride_history' },
      { name: 'Logout', link: '/logout' },
    ];

    let roleBasedLinks: { name: string; link: string }[] = [];

    userRoles.forEach((role) => {
      if (role === 'admin') {
        roleBasedLinks = [...roleBasedLinks, ...adminLinks];
      } else if (role === 'user') {
        roleBasedLinks = [...roleBasedLinks, ...userLinks];
      } else {
        roleBasedLinks = [...roleBasedLinks, ...driverLinks];
      }
    });

    // Remove duplicates
    const uniqueLinks = Array.from(
      new Map(roleBasedLinks.map((item) => [item.link, item])).values()
    );
    setLinks(uniqueLinks);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <button
        id="sidebarToggle"
        className="d-md-none btn btn-danger"
        onClick={toggleSidebar}
        style={{
          position: 'fixed',
          top: '45px',
          right: '15px',
          zIndex: 1050,
        }}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`sidebar ${isSidebarOpen ? 'active' : ''}`}
        style={{
          backgroundColor: '#ffffff',
          minHeight: '100vh',
          padding: '1rem',
          boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
          position: 'fixed',
          zIndex: 1000,
          top: 0,
          left: isSidebarOpen ? '0px' : '0px',
          width: '250px',
          transition: 'left 0.3s ease',
        }}
      >
        <h3
          style={{
            color: '#ff4b2b',
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: '40px',
          }}
        >
          TAXIGO!
        </h3>
        <nav className="nav flex-column">
          {links.map(({ link, name }) => (
            <Link key={link} href={link}>
              <span
                className={`nav-link ${
                  router.pathname === link ? 'active' : ''
                }`}
                style={{
                  color: router.pathname === link ? '#ff4b2b' : '#333',
                  fontSize: '1.1rem',
                  marginBottom: '15px',
                  cursor: 'pointer',
                }}
              >
                {name}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      <style jsx global>{`
        a {
          text-decoration: none !important;
        }

        .nav-link {
          text-decoration: none !important;
        }

        .nav-link:focus {
          outline: none !important;
        }

        .nav-link.active {
          color: #ff4b2b;
        }

        @media (max-width: 767px) {
          .sidebar {
            display: none;
            position: fixed;
            width: 250px;
            z-index: 1000;
          }

          .sidebar.active {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;