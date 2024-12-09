// Layout.tsx
import React from 'react';
import Sidebar from './Sidebar';
import { IonPage, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <IonSplitPane contentId="main-content">
      {/* Sidebar Menu */}
      <Sidebar />

      {/* Main Content */}
      <IonPage id="main-content">
        {children}
      </IonPage>
    </IonSplitPane>
  );
};

export default Layout;
