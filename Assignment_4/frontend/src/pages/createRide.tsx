import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

interface City {
  _id: string;
  cityName: string;
  countryName: string;
}

const CreateRide: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [pickup, setPickup] = useState<string>('');
  const [drop, setDrop] = useState<string>('');
  const [rideDistance, setRideDistance] = useState<number | null>(null);
  const [rideFare, setRideFare] = useState<number | null>(null);
  const [rideCustomerId, setRideCustomerId] = useState<string>('');

  const API_BASE_URL = 'http://localhost:3000';

  // Fetch cities for dropdown
  const fetchCities = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/city/GetCityDetails`, {
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
      setCities(data.cityList || []);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  // Generate distance and fare
  const calculateRideDetails = () => {
    if (pickup && drop) {
      const distance = parseFloat((Math.random() * (10 - 1) + 1).toFixed(1)); // Random float [1, 10]
      const randomMultiplier = Math.floor(Math.random() * (12 - 7 + 1)) + 7; // Random int [7, 12]
      const fare = parseFloat((distance * randomMultiplier).toFixed(2)); // Calculate fare
      setRideDistance(distance);
      setRideFare(fare);
    }
  };

  // Submit ride details
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!rideDistance || !rideFare) {
      alert('Please enter pickup and drop locations to calculate ride details.');
      return;
    }

    const rideDateTime = new Date().toISOString();
    const rideStatus = 1;
    const rideDriverId = null;

    const rideDetails = {
      rideCustomerId,
      rideCityId: selectedCity,
      ridePickUpLocation: pickup,
      rideDropLocation: drop,
      rideDateTime,
      rideStatus,
      rideDriverId,
      rideDistance,
      rideFare,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/ride/addRide`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(rideDetails),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert('Ride created successfully!');
      setPickup('');
      setDrop('');
      setSelectedCity('');
      setRideDistance(null);
      setRideFare(null);
    } catch (error) {
      console.error('Error creating ride:', error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Access localStorage only on the client-side
      const userRoles = JSON.parse(localStorage.getItem('userRoles') || '{}');
      setRideCustomerId(userRoles._id || '');
    }
    fetchCities();
  }, []);

  useEffect(() => {
    calculateRideDetails();
  }, [pickup, drop]);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row bg-danger text-white py-5 d-flex justify-content-between align-items-center">
          <div className="col">
            <h1>Create Ride</h1>
          </div>
          <div className="col-auto">
            <button id="sidebarToggle" className="navbar-toggler d-md-none" type="button">
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>

        <br />
        <br />
        <br />

        <form onSubmit={handleSubmit}>
          {/* Customer ID */}
          <div className="row mb-3">
            <label htmlFor="customerId" className="col-sm-2 col-form-label">
              Customer ID:
            </label>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                id="customerId"
                value={rideCustomerId}
                readOnly
              />
            </div>
          </div>

          {/* City Dropdown */}
          <div className="row mb-3">
            <label htmlFor="city" className="col-sm-2 col-form-label">
              City:
            </label>
            <div className="col-sm-4">
              <select
                className="form-control"
                id="city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                required
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city._id} value={city._id}>
                    {city.cityName}, {city.countryName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pickup Location */}
          <div className="row mb-3">
            <label htmlFor="pickup" className="col-sm-2 col-form-label">
              Pickup Location:
            </label>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                id="pickup"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Enter pickup location"
                required
              />
            </div>
          </div>

          {/* Drop Location */}
          <div className="row mb-3">
            <label htmlFor="drop" className="col-sm-2 col-form-label">
              Drop Location:
            </label>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                id="drop"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                placeholder="Enter drop location"
                required
              />
            </div>
          </div>

          {/* Ride Distance & Fare */}
          {rideDistance && rideFare && (
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Ride Details:</label>
              <div className="col-sm-4">
                <p>
                  Distance: {rideDistance} km<br />
                  Fare: ${rideFare}
                </p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="row mb-3">
            <div className="col-sm-6">
              <button type="submit" className="btn btn-success">
                Create Ride
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateRide;
