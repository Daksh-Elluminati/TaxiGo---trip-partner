import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonToggle,
  IonSpinner,
  IonAlert,
} from '@ionic/react';
import './DriversList.css';

interface Driver {
  _id: string;
  driverName: string;
  driverEmail: string;
  driverPhone: string;
  driverStatus: boolean;
  city: {
    cityName: string;
    countryName: string;
  };
}

const DriversList: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<{ isOpen: boolean; driverId: string }>({
    isOpen: false,
    driverId: '',
  });

  const API_BASE_URL = 'http://localhost:3000';

  // Fetch drivers data
  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/driver/getDriverDetails`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setDrivers(data.driverList || []);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update driver status
  const updateDriverStatus = async (driverId: string, newStatus: boolean) => {
    try {
      const response = await fetch(`${API_BASE_URL}/driver/editDriver/${driverId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({ driverStatus: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchDrivers(); // Refresh driver list after update
    } catch (error) {
      console.error('Error updating driver status:', error);
    }
  };

  // Delete driver
  const deleteDriver = async (driverId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/driver/deleteDriver/${driverId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchDrivers(); // Refresh driver list after deletion
    } catch (error) {
      console.error('Error deleting driver:', error);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonTitle>Drivers List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="drivers-list-content">
        {loading ? (
          <div className="loading-spinner">
            <IonSpinner name="crescent" />
          </div>
        ) : (
          <IonList>
            {drivers.map((driver) => (
              <IonItem key={driver._id} lines="full">
                <div className="driver-details">
                  <div>
                    <IonLabel>
                      <h3>{driver.driverName}</h3>
                      <p>{driver.driverEmail}</p>
                      <p>{driver.driverPhone}</p>
                      <p>
                        {driver.city.cityName}, {driver.city.countryName}
                      </p>
                    </IonLabel>
                  </div>
                  <div className="driver-actions">
                    <IonToggle
                      checked={driver.driverStatus}
                      onIonChange={() => updateDriverStatus(driver._id, !driver.driverStatus)}
                    />
                    <IonButton
                      color="danger"
                      size="small"
                      onClick={() =>
                        setShowAlert({ isOpen: true, driverId: driver._id })
                      }
                    >
                      Delete
                    </IonButton>
                  </div>
                </div>
              </IonItem>
            ))}
          </IonList>
        )}
        <IonAlert
          isOpen={showAlert.isOpen}
          onDidDismiss={() => setShowAlert({ isOpen: false, driverId: '' })}
          header="Confirm Deletion"
          message="Are you sure you want to delete this driver?"
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => setShowAlert({ isOpen: false, driverId: '' }),
            },
            {
              text: 'Delete',
              handler: () => {
                deleteDriver(showAlert.driverId);
                setShowAlert({ isOpen: false, driverId: '' });
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default DriversList;
