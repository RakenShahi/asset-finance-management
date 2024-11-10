import React, { useEffect, useState } from 'react';
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
    console.log('Edit clicked for application id', app._id);
    setEditingApplication(app);
    console.log(editingApplication);
  }
  return (
   <div>
    <Header />
    <FinanceApplicationList applications={applications} fetchApplications={fetchApplications} onEdit={handleEdit}/>

    <FinanceApplicationForm onApplicationAdded={fetchApplications} editingApplication={editingApplication} clearEditing={()=>setEditingApplication(null)}/>
   </div>
  );
}

export default App;
