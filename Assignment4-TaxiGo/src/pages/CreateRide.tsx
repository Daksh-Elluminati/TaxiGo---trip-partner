import React, { useState, useEffect, FormEvent } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonToast,
  IonList,
} from '@ionic/react';
import './CreateRide.css';

interface City {
  _id: string;
  cityName: string;
}

const CreateRide: React.FC = () => {
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const [dropLocation, setDropLocation] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [cities, setCities] = useState<City[]>([]);
  const [rideCustomerId, setRideCustomerId] = useState<string>('');
  const [rideDistance, setRideDistance] = useState<number | null>(null);
  const [rideFare, setRideFare] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<{ message: string; color: string }>({ message: '', color: '' });
  const API = 'http://localhost:3000';

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`${API}/city/GetCityDetails`);
        if (!response.ok) throw new Error('Error fetching cities');
        const data = await response.json();
        if (data.status === 'success' && Array.isArray(data.cityList)) {
          setCities(data.cityList);
        } else {
          throw new Error('Unexpected response structure');
        }
      } catch (error) {
        console.error('Failed to fetch cities:', error);
        setCities([]);
      }
    };

    if (typeof window !== 'undefined') {
      const userRoles = JSON.parse(localStorage.getItem('userRoles') || '{}');
      setRideCustomerId(userRoles._id || '');
    }
    fetchCities();
  }, []);

  useEffect(() => {
    if (pickupLocation && dropLocation) {
      const distance = parseFloat((Math.random() * (10 - 1) + 1).toFixed(1)); // Random float [1, 10]
      const randomMultiplier = Math.floor(Math.random() * (12 - 7 + 1)) + 7; // Random int [7, 12]
      setRideDistance(distance);
      setRideFare(parseFloat((distance * randomMultiplier).toFixed(2)));
    }
  }, [pickupLocation, dropLocation]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!pickupLocation || !dropLocation || !selectedCity || !rideDistance || !rideFare) {
      setToastMessage({ message: 'All fields are required.', color: 'danger' });
      return;
    }

    const rideDetails = {
      rideCustomerId,
      rideCityId: selectedCity,
      ridePickUpLocation: pickupLocation,
      rideDropLocation: dropLocation,
      rideDateTime: new Date().toISOString(),
      rideStatus: 1,
      rideDriverId: null,
      rideDistance,
      rideFare,
    };

    try {
      const response = await fetch(`${API}/ride/addRide`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rideDetails),
      });

      if (response.ok) {
        setToastMessage({ message: 'Ride created successfully!', color: 'success' });
        setPickupLocation('');
        setDropLocation('');
        setSelectedCity('');
        setRideDistance(null);
        setRideFare(null);
      } else {
        setToastMessage({ message: 'Failed to create ride.', color: 'danger' });
      }
    } catch (error) {
      console.error('Error creating ride:', error);
      setToastMessage({ message: 'An error occurred.', color: 'danger' });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonTitle>Create Ride</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="create-ride-content">
        <form onSubmit={handleSubmit} className="create-ride-form">
          <IonList>
            <IonItem>
              <IonLabel position="floating">Customer ID</IonLabel>
              <IonInput value={rideCustomerId} readonly />
            </IonItem>
            <IonItem>
              <IonLabel>Select City</IonLabel>
              <IonSelect aria-required="true"
                value={selectedCity}
                onIonChange={(e) => setSelectedCity(e.detail.value!)}
                placeholder="Select a city"
                
              >
                {cities.map((city) => (
                  <IonSelectOption key={city._id} value={city._id}>
                    {city.cityName}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Pickup Location</IonLabel>
              <IonInput
                value={pickupLocation}
                onIonChange={(e) => setPickupLocation(e.detail.value!)}
                placeholder="Enter pickup location"
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Drop Location</IonLabel>
              <IonInput
                value={dropLocation}
                onIonChange={(e) => setDropLocation(e.detail.value!)}
                placeholder="Enter drop location"
                required
              />
            </IonItem>
          </IonList>

          {rideDistance && rideFare && (
            <div className="ride-details">
              <p>
                <strong>Distance:</strong> {rideDistance} km<br />
                <strong>Fare:</strong> ${rideFare}
              </p>
            </div>
          )}

          <IonButton expand="block" type="submit" className="create-ride-button">
            Create Ride
          </IonButton>
        </form>
        <IonToast
          isOpen={!!toastMessage.message}
          message={toastMessage.message}
          color={toastMessage.color}
          duration={2000}
          onDidDismiss={() => setToastMessage({ message: '', color: '' })}
        />
      </IonContent>
    </IonPage>
  );
};

export default CreateRide;
