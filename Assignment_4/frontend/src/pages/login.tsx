import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Import Link for navigation
import '../styles/forms.css'; // Import the shared styles for both Login and Signup
import { notifySuccess } from '@/helper/common';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isDriver, setIsDriver] = useState<boolean>(false);
  const router = useRouter();
  const API = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const requestData = {
        userEmail: email,
        userPassword: password,
        role: isDriver? "driver" : "user"
      }

      const endpoint = `${API}/auth/login`;

      const response = await fetch(`${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (response.status >= 200 && response.status < 300) {
        console.log("we logged in");
        
        const result = await response.json();
        notifySuccess("Signin successful!!");
        localStorage.setItem("access_token", result.access_token);
        localStorage.setItem("userRoles", JSON.stringify(result.user || result.driver));

        if (isDriver) {
          result.driver.userRoles.forEach((role: any) => {
            if (role == "admin" || role == "user") {
              router.push('/createRide');
            } else {
              router.push("/ride_history")
            }
          });
        } else {
          result.user.userRoles.forEach((role: any) => {
            if (role == "admin" || role == "user") {
              router.push('/createRide');
            } else {
              router.push("/ride_history")
            }
          });
        }
      } 
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="login-form-container">
        <form onSubmit={handleLogin} className="login-form p-5">
          <h2 className="text-center text-white mb-4">TaxiGo</h2>
          
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
          
          <div className="mb-4">
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
            <input
              type="checkbox"
              id="signup-as-driver"
              checked={isDriver}
              onChange={(e) => setIsDriver(e.target.checked)}
            />
            <label htmlFor="signin-as-driver" className="text-white ms-2">
              Sign in as a driver
            </label>
          </div>
          
          <button type="submit" className="btn btn-primary w-100">Login</button>

          {/* Sign Up link */}
          <div className="text-center mt-3">
            <p className="text-light m-1">Don't have an account? 
              <Link href="/signup">
                <span className="text-decoration-none text-light"> Sign Up</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
