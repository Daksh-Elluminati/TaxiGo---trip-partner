import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

interface City {
  _id: string;
  cityName: string;
  countryName: string;
}

const City: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

  // Fetch all cities
  const fetchCities = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  // Add or edit a city
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const url = editingCity
        ? `${API_BASE_URL}/city/editCity/${editingCity._id}`
        : `${API_BASE_URL}/city/AddNewCity`;
      const method = editingCity ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({ cityName: cityName, countryName: country }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchCities(); // Refresh the city list
      setCityName('');
      setCountry('');
      setEditingCity(null);
    } catch (error) {
      console.error('Error submitting city:', error);
    }
  };

  // Handle edit button click
  const handleEditClick = (city: City) => {
    setEditingCity(city);
    setCityName(city.cityName);
    setCountry(city.countryName);
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <Layout>
      <div id="content" className="container-fluid">
        {/* Header Row */}
        <div className="row bg-danger text-white py-5 d-flex justify-content-between align-items-center">
          <div className="col">
            <h1>City Management</h1>
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

        {/* Form Section */}
        <div className="col-md-12">
          <form onSubmit={handleSubmit}>
            {/* City Name Input */}
            <div className="row mb-3">
              <label htmlFor="cityName" className="col-sm-1 col-form-label">
                City:
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  id="cityName"
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                  placeholder="Enter city name"
                />
              </div>
            </div>
            {/* Country Input */}
            <div className="row mb-3">
              <label htmlFor="country" className="col-sm-1 col-form-label">
                Country:
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Enter country"
                />
              </div>
            </div>
            {/* Buttons */}
            <div className="row mb-3">
              <div className="col-sm-9 offset-sm-1">
                <button type="submit" className="btn btn-success me-2">
                  {editingCity ? 'Save' : 'Add'}
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    setCityName('');
                    setCountry('');
                    setEditingCity(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Cities Table */}
        <div className="col-md-10 w-100">
          <div className="table-responsive table-responsive-stack">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">City ID</th>
                    <th scope="col">City Name</th>
                    <th scope="col">Country</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cities.map((city) => (
                    <tr key={city._id}>
                      <td data-label="City ID">{city._id}</td>
                      <td data-label="City Name">{city.cityName}</td>
                      <td data-label="Country">{city.countryName}</td>
                      <td data-label="Actions">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleEditClick(city)}
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

export default City;
