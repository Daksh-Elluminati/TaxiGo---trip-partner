import React, { useState, useEffect, FormEvent } from 'react';
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
  IonSelect,
  IonSelectOption,
  IonList,
  IonToast,
  IonText
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Signup.css';

interface City {
  _id: string;
  cityName: string;
}

const Signup: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isDriver, setIsDriver] = useState<boolean>(false);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [showToast, setShowToast] = useState<{ message: string; color: string }>({ message: '', color: '' });
  const history = useHistory();
  const API =  'http://localhost:3000';

  useEffect(() => {
    if (isDriver) {
      const fetchCities = async () => {
        try {
          const response = await fetch(`${API}/city/GetCityDetails`);
          if (!response.ok) throw new Error(`Error fetching cities: ${response.status}`);
          const data = await response.json();
          if (data.status === 'success' && Array.isArray(data.cityList)) setCities(data.cityList);
          else throw new Error('Unexpected response structure');
        } catch (error) {
          console.error('Failed to fetch cities:', error);
          setCities([]);
        }
      };
      fetchCities();
    } else {
      setCities([]);
    }
  }, [isDriver]);

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setShowToast({ message: 'Passwords do not match', color: 'danger' });
      return;
    }
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      setShowToast({
        message: 'Password must be strong (8+ characters, uppercase, special character, digit).',
        color: 'danger',
      });
      return;
    }
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phone)) {
      setShowToast({ message: 'Invalid phone number.', color: 'danger' });
      return;
    }
    try {
      const requestData = isDriver
        ? {
            driverName: name,
            driverEmail: email,
            driverPhone: phone,
            driverCity: selectedCity,
            driverPassword: password,
            driverStatus: false,
            driverRideStatus: 0,
          }
        : {
            userName: name,
            userEmail: email,
            userPhone: phone,
            userPassword: password,
          };

      const endpoint = isDriver ? '/driver/addDriver' : '/user/addUser';
      const response = await fetch(`${API}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });
      const result = await response.json();
      if (result.status === 'success') {
        setShowToast({ message: 'Signup successful! Redirecting...', color: 'success' });
        setTimeout(() => history.push('/login'), 2000);
      } else {
        setShowToast({ message: 'Sign up failed.', color: 'danger' });
      }
    } catch (error) {
      console.error('Sign up failed:', error);
      setShowToast({ message: 'An error occurred during signup.', color: 'danger' });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>TaxiGo SignUp</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="signup-content ion-padding">
        <IonContent className='signup-form-container'>
        <form onSubmit={handleSignup}>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Name</IonLabel>
              <IonInput value={name} onIonChange={(e) => setName(e.detail.value!)} required />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} required />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} required />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Confirm Password</IonLabel>
              <IonInput
                type="password"
                value={confirmPassword}
                onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Phone Number</IonLabel>
              <IonInput value={phone} onIonChange={(e) => setPhone(e.detail.value!)} required />
            </IonItem>
            <IonItem>
              <IonCheckbox
                slot="start"
                checked={isDriver}
                onIonChange={(e) => setIsDriver(e.detail.checked!)}
              />
              <IonLabel>Sign up as a driver</IonLabel>
            </IonItem>
            {isDriver && (
              <IonItem>
                <IonLabel>Select Your City</IonLabel>
                <IonSelect value={selectedCity} onIonChange={(e) => setSelectedCity(e.detail.value!)} placeholder="Select">
                  {cities.map((city) => (
                    <IonSelectOption key={city._id} value={city._id}>
                      {city.cityName}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            )}
          </IonList>
          <IonButton expand="block" type="submit" className="signup-button">
            Sign Up
          </IonButton>
          <div className="text-center mt-3">
            <IonText className="text-light">
              Already have an account?{' '}
              <span
                className="text-decoration-none text-light"
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => history.push('/login')}
              >
                Sign In
              </span>
            </IonText>
          </div>
        </form>
        <IonToast
          isOpen={!!showToast.message}
          message={showToast.message}
          color={showToast.color}
          duration={2000}
          onDidDismiss={() => setShowToast({ message: '', color: '' })}
        />
        </IonContent>        
      </IonContent>
    </IonPage>
  );
};


export default Signup;
