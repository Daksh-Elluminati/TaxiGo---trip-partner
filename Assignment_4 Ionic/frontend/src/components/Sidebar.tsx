import React, { useEffect, useState } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonMenuToggle } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [links, setLinks] = useState<{ name: string; link: string }[]>([]);

  useEffect(() => {
    const roles = localStorage.getItem('userRoles');
    if (roles) {
      const userRoles = JSON.parse(roles).userRoles;
      generateLinks(userRoles);
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

  return (
    <IonMenu contentId="main-content" menuId="main-menu" side="start">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>TAXIGO!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {links.map(({ link, name }) => (
            <IonMenuToggle key={link} autoHide={false}>
              <IonItem
                button
                onClick={() => history.push(link)}
                color={location.pathname === link ? 'light' : ''}
              >
                <IonLabel>{name}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Sidebar;
