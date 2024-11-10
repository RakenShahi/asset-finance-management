import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const FinanceApplicationList = ({applications,fetchApplications,onEdit}) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete this Application?"))
        {

            try{
                await axios.delete(`http://localhost:5001/finance-applications/${id}`);
                console.log(`Application ${id} deleted!!!`);

                //Refresh the list after Deletetion
                fetchApplications();
            }catch(error){
                console.error('Error Deleting Application !!!', error);
            }
        }
    };
    useEffect(() => {
        // Fetch finance applications from the backend
        const fetchApplications = async () =>{
            try{
                const response = await axios.get('http://localhost:5001/finance-applications');
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

    return (
        <div className="p-4 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Finance Applications</h2>
          <ul className="space-y-4">
            {applications.map((app) => (
              <li key={app._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{app.personalDetails.name}</h3>
                    <p className="text-gray-600">{app.personalDetails.phone}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEditClick(app)}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md shadow-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(app._id)}
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md shadow-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                  <p><span className="font-semibold">Address:</span> {app.personalDetails.address}</p>
                  <p><span className="font-semibold">Phone:</span> {app.personalDetails.phone}</p>
                  <p><span className="font-semibold">Income:</span> ${app.income}</p>
                  <p><span className="font-semibold">Expenses:</span> ${app.expenses}</p>
                  <p><span className="font-semibold">Assets:</span> ${app.assets}</p>
                  <p><span className="font-semibold">Liabilities:</span> ${app.liabilities}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
};

export default FinanceApplicationList;