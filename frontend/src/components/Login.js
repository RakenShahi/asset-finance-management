import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';  // Import the global constant
import { useNavigate, NavLink } from 'react-router-dom';

function Login({setIsAuthenticated}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    
    console.log('login pressed with url,', API_URL);
    try {
      const res = await axios.post(`${API_URL}/api/users/login`, { email, password });
      console.log('token is', res.data.token);
      localStorage.setItem('token', res.data.token); // Store JWT in localStorage
      setIsAuthenticated(true); // Update auth status
      navigate('/list'); // Redirect to application list page
    } catch (err) {
      console.log('error occured', err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Welcome!!!</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md shadow-md transition duration-200"
        >
          Login
        </button>
      </form>

      <div className="text-center mt-4">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <NavLink to="/register" className="text-blue-600 font-semibold hover:underline">
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
