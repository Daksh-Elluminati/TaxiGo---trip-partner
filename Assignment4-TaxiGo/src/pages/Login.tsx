import React, { useState, FormEvent } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonCheckbox,
  IonToast,
  IonList,
  IonText,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isDriver, setIsDriver] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; color: string }>({ message: '', color: '' });
  const history = useHistory();
  const API = 'http://localhost:3000';

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const requestData = {
        userEmail: email,
        userPassword: password,
        role: isDriver ? 'driver' : 'user',
      };

      const response = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const result = await response.json();
        setToast({ message: 'Signin successful!', color: 'success' });
        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('userRoles', JSON.stringify(result.user || result.driver));

        if (isDriver) {
          const roles = result.driver.userRoles || [];
          if (roles.includes('admin') || roles.includes('user')) {
            history.push('/createRide');
          } else {
            history.push('/ride_history');
          }
        } else {
          const roles = result.user.userRoles || [];
          if (roles.includes('admin') || roles.includes('user')) {
            history.push('/createRide');
          } else {
            history.push('/ride_history');
          }
        }
      } else {
        setToast({ message: 'Login failed. Please check your credentials.', color: 'danger' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setToast({ message: 'An error occurred during login.', color: 'danger' });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>TaxiGo Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="login-content ion-padding">
        <IonContent className='login-form-container'>
        <form onSubmit={handleLogin}>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                required
              />
            </IonItem>
            <IonItem>
              <IonCheckbox
                slot="start"
                checked={isDriver}
                onIonChange={(e) => setIsDriver(e.detail.checked!)}
              />
              <IonLabel>Sign in as a driver</IonLabel>
            </IonItem>
          </IonList>
          <IonButton expand="block" type="submit" className="login-button">
            Login
          </IonButton>
          <div className="text-center mt-3">
          <IonText className="text-light">
            Don't have an account?{' '}
            <span
              className="text-decoration-none text-light"
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => history.push('/signup')}
            >
              Sign Up
            </span>
          </IonText>
    </div>
        </form>
        </IonContent>
        

        <div className="signup-link">
          <p>
            Don't have an account?{' '}
            <span onClick={() => history.push('/signup')} className="link-text">
              Sign Up
            </span>
          </p>
        </div>

        <IonToast
          isOpen={!!toast.message}
          message={toast.message}
          color={toast.color}
          duration={2000}
          onDidDismiss={() => setToast({ message: '', color: '' })}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
