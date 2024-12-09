import { Redirect, Route, useLocation } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { addSharp, personOutline, logOutOutline, text } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css'; // Ensure you have dark mode variables here

import CreateRide from './pages/CreateRide';
import DriversList from './pages/Driver';
import Signup from './pages/signup';
import Login from './pages/Login';
import Logout from './pages/logout';

setupIonicReact();

const MainApp: React.FC = () => {
  const location = useLocation();

  // Define routes where tabs should not be shown
  const noTabRoutes = ['/signup', '/login'];

  return (
    <>
      {noTabRoutes.includes(location.pathname) ? (
        <IonRouterOutlet>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
      ) : (
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/createRide">
              <CreateRide />
            </Route>
            <Route exact path="/driver">
              <DriversList />
            </Route>
            <Route exact path="/logout">
              <Logout />
            </Route>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="createRide" href="/createRide">
              <IonIcon aria-hidden="true" icon={addSharp} />
              <IonLabel style={{ color: 'black' }}>Create Ride</IonLabel>
            </IonTabButton>
            <IonTabButton tab="driver" href="/driver">
              <IonIcon aria-hidden="true" icon={personOutline} />
              <IonLabel style={{ color: 'black' }}>Drivers</IonLabel>
            </IonTabButton>
            <IonTabButton tab="logout" href="/logout">
              <IonIcon aria-hidden="true" icon={logOutOutline} />
              <IonLabel style={{ color: 'black' }}>Logout</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      )}
    </>
  );
};

const App: React.FC = () => (
  <IonApp className="dark"> {/* Added class="dark" to enable dark mode */}
    <IonReactRouter>
      <MainApp />
    </IonReactRouter>
  </IonApp>
);

export default App;
