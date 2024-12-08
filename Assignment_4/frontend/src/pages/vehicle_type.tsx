import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

interface VehicleType {
  _id: string;
  vehicleName: string;
}

const Vehicle: React.FC = () => {
  const [vehicles, setVehicles] = useState<VehicleType[]>([]);
  const [vehicleName, setVehicleName] = useState('');
  const [editingVehicle, setEditingVehicle] = useState<VehicleType | null>(null);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

  // Fetch vehicle details from the backend
  const fetchVehicles = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/vehicle-type/getVehicleDetails`, {
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
      setVehicles(data.vehicleTypes || []);
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add or Update Vehicle
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const url = editingVehicle
        ? `${API_BASE_URL}/vehicle-type/editVehicle/${editingVehicle._id}`
        : `${API_BASE_URL}/vehicle-type/addVehicle`;

      const method = editingVehicle ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({ vehicleName }),
      });

      if (response.ok) {
        fetchVehicles();
        setVehicleName('');
        setEditingVehicle(null);
      } else {
        console.error('Error submitting vehicle:', await response.text());
      }
    } catch (error) {
      console.error('Error submitting vehicle:', error);
    }
  };

  // Handle Edit Button Click
  const handleEditClick = (vehicle: VehicleType) => {
    setEditingVehicle(vehicle);
    setVehicleName(vehicle.vehicleName);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <Layout>
      <div id="content" className="container-fluid">
        <div className="row bg-danger text-white py-5 d-flex justify-content-between align-items-center">
          <div className="col">
            <h1>Vehicle Type</h1>
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

        <div className="col-md-12">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="vehicle" className="col-sm-1 col-form-label">
                Vehicle:
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  id="vehicle"
                  value={vehicleName}
                  onChange={(e) => setVehicleName(e.target.value)}
                  placeholder="Enter your vehicle type"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-9 offset-sm-1">
                <button type="submit" className="btn btn-success me-2">
                  {editingVehicle ? 'Save' : 'Add'}
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    setVehicleName('');
                    setEditingVehicle(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="col-md-10 w-100">
          <div className="table-responsive table-responsive-stack">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">Vehicle ID</th>
                    <th scope="col">Vehicle Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((vehicle) => (
                    <tr key={vehicle._id}>
                      <td data-label="Vehicle ID">{vehicle._id}</td>
                      <td data-label="Vehicle Name">{vehicle.vehicleName}</td>
                      <td data-label="Actions">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleEditClick(vehicle)}
                        >
                          Edit
                        </button>
                      </td>
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

export default Vehicle;
