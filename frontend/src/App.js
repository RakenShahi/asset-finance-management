import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom';
import FinanceApplicationList from './components/FinanceApplicationList';
import FinanceApplicationForm from './components/FinanceApplicationForm';
import Header from './components/Header';
import axios from 'axios';

function App() {
  const [applications, setApplications] = useState([]);
  const [editingApplication,setEditingApplication] = useState(null);

  const fetchApplications = async () =>{
    try{
      const response = await axios.get('http://localhost:5001/finance-applications');
      setApplications(response.data);
    }catch(error){
      console.error('Error occured while fetching applications',error);
    }
  };

  useEffect(()=>{
    fetchApplications();
  },[])

  const handleEdit = (app) => {
    setEditingApplication(app);
  }
  // return (
  //  <div>
  //   <Header />
  //   <FinanceApplicationList applications={applications} fetchApplications={fetchApplications} onEdit={handleEdit}/>

  //   <FinanceApplicationForm onApplicationAdded={fetchApplications} editingApplication={editingApplication} clearEditing={()=>setEditingApplication(null)}/>
  //  </div>
  // );

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <Header />
  
        {/* Navigation Bar */}
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
          </div>
        </nav>
  
        {/* Page Content */}
        <main className="flex-grow">
          <div className="max-w-5xl mx-auto py-8 px-4">
            <Routes>
              <Route
                path="/list"
                element={
                  <FinanceApplicationList
                    applications={applications}
                    fetchApplications={fetchApplications}
                    onEdit={handleEdit}
                  />
                }
              />
              <Route
                path="/form"
                element={
                  <FinanceApplicationForm
                    onApplicationAdded={fetchApplications}
                    editingApplication={editingApplication}
                    clearEditing={() => setEditingApplication(null)}
                  />
                }
              />
              {/* Redirect to list page by default */}
              <Route
                path="*"
                element={
                  <FinanceApplicationList
                    applications={applications}
                    fetchApplications={fetchApplications}
                    onEdit={handleEdit}
                  />
                }
              />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
