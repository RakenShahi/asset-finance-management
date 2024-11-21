import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { API_URL } from './config';  // Import the global constant


const FinanceApplicationList = ({applications,fetchApplications,onEdit}) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
      if (window.confirm("Are you sure you want to delete this Application?")) {
          try {
              // Get the token from localStorage
              const token = localStorage.getItem('token');
  
              if (!token) {
                  console.error("No token found, cannot delete application.");
                  return;
              }
  
              // Set the Authorization header with the token
              const config = {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              };
  
              // Send the DELETE request with the Authorization header
              await axios.delete(`${API_URL}/api/finance-applications/${id}`, config);
  
              // console.log(`Application ${id} deleted!!!`);
  
              // Refresh the list after deletion
              fetchApplications();
          } catch (error) {
              console.error('Error Deleting Application !!!', error);
          }
      }
  };
  
    useEffect(() => {
        // Fetch finance applications from the backend
        const fetchApplications = async () =>{
            try{
                const response = await axios.get(`${API_URL}/api/finance-applications`);
            } catch (error){
                console.error('Error Fetching applications', error);
            }
        };
        fetchApplications();
    },[]);

    const handleEditClick = (app) =>{
        onEdit(app);
        navigate ('/form'); // Redirect to form page when editing
    }

    const handleAddApplicationClick = () => {
      navigate('/form'); // Navigate to the add application page
    };

    return (
      <div className="p-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Finance Applications</h2>
  
        {/* Show "Add Application" button if there are no applications */}
        {applications.length === 0 ? (
          <div className="text-center mb-6">
          <p className="text-gray-500 mb-4">You don't have any applications yet.</p>
          <button
            onClick={handleAddApplicationClick}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-md"
          >
            Add Application
          </button>
        </div>
        ) : (
          <ul className="space-y-6">
          {applications.map((app) => (
            <li key={app._id} className="bg-gradient-to-r p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-600">{new Date(app.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="space-x-3">
                  <button
                    onClick={() => handleEditClick(app)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 ease-in-out shadow-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(app._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200 ease-in-out shadow-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
        
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <div className="flex justify-between items-center py-2 border-b border-gray-300">
                  <span className="font-semibold text-gray-800">Income:</span>
                  <p className="font-medium text-gray-900">${app.income}</p>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-300">
                  <span className="font-semibold text-gray-800">Expenses:</span>
                  <p className="font-medium text-gray-900">${app.expenses}</p>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-300">
                  <span className="font-semibold text-gray-800">Assets:</span>
                  <p className="font-medium text-gray-900">${app.assets}</p>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-300">
                  <span className="font-semibold text-gray-800">Liabilities:</span>
                  <p className="font-medium text-gray-900">${app.liabilities}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        )}
      </div>
    );
  };

export default FinanceApplicationList;