import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

interface Ride {
  _id: string;
  ridePickUpLocation: string;
  rideDropLocation: string;
  rideDistance: number;
  rideFare: number;
  rideCustomerId: string;
  rideDriverId: string | null;
  rideStatus: number;
}

const CurrentRides: React.FC = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const API_BASE_URL = 'http://localhost:3000';

  // Fetch current rides data
  const fetchRides = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/ride/getCurrentRideList`, {
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
      console.error('Error fetching rides:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update ride status
  const handleAcceptRide = async (ride: Ride) => {
    const newStatus = ride.rideStatus + 1;

    try {
      const response = await fetch(`${API_BASE_URL}/ride/editRide/${ride._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({ rideStatus: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Refresh rides after updating status
      fetchRides();
    } catch (error) {
      console.error('Error updating ride status:', error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userRoles = JSON.parse(localStorage.getItem('userRoles') || '{}');
      setRole(userRoles.userRoles?.[0] || ''); // Extract the role from userRoles array
      setUserId(userRoles._id || ''); // Extract the user ID
    }
    fetchRides();
  }, []);

  // Filter rides for drivers
  const filteredRides = role === 'driver'
    ? rides.filter((ride) => ride.rideDriverId === userId || ride.rideDriverId === null)
    : rides;

  return (
    <Layout>
      <div className="container-fluid">
        {/* Header Row */}
        <div className="row bg-danger text-white py-5 d-flex justify-content-between align-items-center">
          <div className="col">
            <h1>Current Rides</h1>
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
                    {role === 'driver' && <th scope="col">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredRides.map((ride) => (
                    <tr key={ride._id}>
                      <td data-label="Ride ID">{ride._id}</td>
                      <td data-label="Pickup Location">{ride.ridePickUpLocation}</td>
                      <td data-label="Drop Location">{ride.rideDropLocation}</td>
                      <td data-label="Distance">{ride.rideDistance}</td>
                      <td data-label="Fare">{ride.rideFare}</td>
                      {role === 'driver' && (
                        <td data-label="Actions">
                          {ride.rideStatus < 3 ? (
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => handleAcceptRide(ride)}
                            >
                              {ride.rideStatus === 1
                                ? 'Accept Ride'
                                : ride.rideStatus === 2
                                ? 'Complete Ride'
                                : ''}
                            </button>
                          ) : (
                            <span className="badge bg-success">Ride Completed</span>
                          )}
                        </td>
                      )}
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

export default CurrentRides;
