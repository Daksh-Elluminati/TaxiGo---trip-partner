import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

interface Ride {
  _id: string;
  ridePickUpLocation: string;
  rideDropLocation: string;
  rideDistance: number;
  rideFare: number;
}

const RideHistory: React.FC = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = 'http://localhost:3000';

  // Fetch ride history data
  const fetchRideHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/ride/getRideHistoryList`, {
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
      setRides(data.rideList || []);
    } catch (error) {
      console.error('Error fetching ride history:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRideHistory();
  }, []);

  return (
    <Layout>
      <div className="container-fluid">
        {/* Header Row */}
        <div className="row bg-danger text-white py-5 d-flex justify-content-between align-items-center">
          <div className="col">
            <h1>Ride History</h1>
          </div>
        </div>

        <br />
        <br />
        <br />

        {/* Table Section */}
        <div className="col-md-10 w-100">
          <div className="table-responsive table-responsive-stack">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">Ride ID</th>
                    <th scope="col">Pickup Location</th>
                    <th scope="col">Drop Location</th>
                    <th scope="col">Distance (km)</th>
                    <th scope="col">Fare ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {rides.map((ride) => (
                    <tr key={ride._id}>
                      <td data-label="Ride ID">{ride._id}</td>
                      <td data-label="Pickup Location">{ride.ridePickUpLocation}</td>
                      <td data-label="Drop Location">{ride.rideDropLocation}</td>
                      <td data-label="Distance">{ride.rideDistance}</td>
                      <td data-label="Fare">{ride.rideFare}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RideHistory;
