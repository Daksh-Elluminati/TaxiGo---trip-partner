import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

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
    if (!window.confirm('Are you sure you want to delete this driver?')) return;

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
    <Layout>
      <div className="container-fluid">
        {/* Header Row */}
        <div className="row bg-danger text-white py-5 d-flex justify-content-between align-items-center">
          <div className="col">
            <h1>Drivers List</h1>
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
                    <th scope="col">Driver Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">City</th>
                    <th scope="col">Country</th>
                    <th scope="col">Approval</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {drivers.map((driver) => (
                    <tr key={driver._id}>
                      <td data-label="Driver Name">{driver.driverName}</td>
                      <td data-label="Email">{driver.driverEmail}</td>
                      <td data-label="Phone">{driver.driverPhone}</td>
                      <td data-label="City">{driver.city.cityName}</td>
                      <td data-label="Country">{driver.city.countryName}</td>
                      <td data-label="Approval">
                        <div className="toggle-switch">
                          <input
                            id={driver._id}
                            type="checkbox"
                            checked={driver.driverStatus}
                            onChange={() =>
                              updateDriverStatus(driver._id, !driver.driverStatus)
                            }
                          />
                          <label htmlFor={driver._id}></label>
                        </div>
                        <span>{driver.driverStatus ? 'Approved' : 'Declined'}</span>
                      </td>
                      <td data-label="Actions">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteDriver(driver._id)}
                        >
                          Delete
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

      {/* CSS for Toggle Switch */}
      <style jsx>{`
        .toggle-switch {
          display: inline-block;
          position: relative;
          width: 40px;
          height: 20px;
          margin-right: 10px;
        }

        .toggle-switch input[type='checkbox'] {
          display: none;
        }

        .toggle-switch label {
          position: absolute;
          top: 0;
          left: 0;
          width: 40px;
          height: 20px;
          border-radius: 10px;
          background-color: #f71717;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .toggle-switch label::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: #fff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
          transition: transform 0.3s;
        }

        .toggle-switch input[type='checkbox']:checked + label {
          background-color: #27c927;
        }

        .toggle-switch input[type='checkbox']:checked + label::after {
          transform: translateX(20px);
        }
      `}</style>
    </Layout>
  );
};

export default DriversList;
