import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import FinanceApplicationList from './components/FinanceApplicationList';
import FinanceApplicationForm from './components/FinanceApplicationForm';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import UserProfile from './components/UserProfile';
import axios from 'axios';


function App() {
  const [applications, setApplications] = useState([]);
  const [editingApplication, setEditingApplication] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token')); // Initialize with token status


  const fetchApplications = async () => {
    try {
      // Retrieve token from storage 
      const token = localStorage.getItem('token');
      
      // If no token, log out or redirect
      if (!token) {
        console.log("Token missing!");
        return;
      }
  
      const response = await axios.get('http://localhost:5001/api/finance-applications/userapplications/', {
        headers: { 
          Authorization: `Bearer ${token}` // Passing token as part of the header
        },
      });
      setApplications(response.data);
    } catch (error) {
      console.error('Error occurred while fetching applications', error);
    }
  };

 useEffect(() => {
    if (isAuthenticated) fetchApplications();
  }, [isAuthenticated]); // Re-fetch applications when authentication status changes


  const handleEdit = (app) => {
    setEditingApplication(app);
  };

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <Header />

        {/* Conditional Navigation Bar */}
        {isAuthenticated && (
          <nav className="bg-blue-600 shadow-md">
            <div className="max-w-5xl mx-auto p-4 flex justify-center space-x-6">
              <NavLink
                to="/list"
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-700 text-white font-semibold px-4 py-2 rounded transition duration-200"
                    : "text-white font-semibold hover:bg-blue-700 px-4 py-2 rounded transition duration-200"
                }
              >
                Application List
              </NavLink>
              <NavLink
                to="/form"
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-700 text-white font-semibold px-4 py-2 rounded transition duration-200"
                    : "text-white font-semibold hover:bg-blue-700 px-4 py-2 rounded transition duration-200"
                }
              >
                Add/Edit Application
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-700 text-white font-semibold px-4 py-2 rounded transition duration-200"
                    : "text-white font-semibold hover:bg-blue-700 px-4 py-2 rounded transition duration-200"
                }
              >
                Profile
              </NavLink>
            </div>
          </nav>
        )}

        {/* Page Content */}
        <main className="flex-grow">
          <div className="max-w-5xl mx-auto py-8 px-4">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <UserProfile setIsAuthenticated={setIsAuthenticated}/>
                  </ProtectedRoute>}
              />
              <Route
                path="/list"
                element={
                  <ProtectedRoute>
                    <FinanceApplicationList
                      applications={applications}
                      fetchApplications={fetchApplications}
                      onEdit={handleEdit}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/form"
                element={
                  <ProtectedRoute>
                    <FinanceApplicationForm
                      onApplicationAdded={fetchApplications}
                      editingApplication={editingApplication}
                      clearEditing={() => setEditingApplication(null)}
                    />
                  </ProtectedRoute>
                }
              />
              {/* Default Redirect */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
