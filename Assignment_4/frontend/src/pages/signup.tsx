import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import '../styles/forms.css'; // Retain the shared styles for both Login and Signup
import { toast } from 'react-toastify';
import { notifySuccess } from '@/helper/common';

interface City {
  _id: string;
  cityName: string;
}

const Signup: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>(''); // Added phone state
  const [isDriver, setIsDriver] = useState<boolean>(false);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const router = useRouter();
  const API = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

  // Fetch city details when the checkbox is selected
  useEffect(() => {
    if (isDriver) {
      const fetchCities = async () => {
        try {
          const response = await fetch(`${API}/city/GetCityDetails`);
          if (!response.ok) {
            throw new Error(`Error fetching cities: ${response.status}`);
          }
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
      fetchCities();
    } else {
      setCities([]); // Clear cities if the user unchecks the checkbox
    }
  }, [isDriver]);

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Ensure password and confirm password are same
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Ensure strong password
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      alert(
        'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.'
      );
      return;
    }

    // Validate phone number (basic validation with regex)
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 international phone format
    if (!phoneRegex.test(phone)) {
      alert('Please enter a valid phone number.');
      return;
    }

    try {
      // Prepare data for user or driver
      const requestData = isDriver
        ? {
            driverName: name,
            driverEmail: email,
            driverPhone: phone,
            driverCity: selectedCity,
            driverPassword: password,
            driverStatus: false,
            driverRideStatus: 0
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
      if (result.status == "success") {
        notifySuccess("Signup successful!! You can now login");
        router.push('/login'); // Redirect to login after successful signup        
      } else {
        alert('Sign up failed');
      }
    } catch (error) {
      console.error('Sign up failed:', error);
      alert('Sign up failed');
    }
  };

  return (
    <div className="signup-container d-flex justify-content-center align-items-center vh-100">
      <div className="signup-form-container">
        <form onSubmit={handleSignup} className="signup-form p-5">
          <h2 className="text-center text-white mb-4">Create an Account</h2>

          <div className="mb-3">
            <label className="text-white">Name</label>
            <input
              type="text"
              className="form-control input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="text-white">Email</label>
            <input
              type="email"
              className="form-control input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="text-white">Password</label>
            <input
              type="password"
              className="form-control input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="text-white">Confirm Password</label>
            <input
              type="password"
              className="form-control input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="text-white">Phone Number</label>
            <input
              type="text"
              className="form-control input-field"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="checkbox"
              id="signup-as-driver"
              checked={isDriver}
              onChange={(e) => setIsDriver(e.target.checked)}
            />
            <label htmlFor="signup-as-driver" className="text-white ms-2">
              Sign up as a driver
            </label>
          </div>

          {isDriver && (
            <div className="mb-4">
              <label className="text-white">Select Your City</label>
              <select
                className="form-control input-field"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select a city
                </option>
                {cities.map((city) => (
                  <option key={city._id} value={city._id}>
                    {city.cityName}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
