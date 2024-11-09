import React, {useState,useEffect} from 'react';
import axios from 'axios';

const FinanceApplicationList = () => {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        // Fetch finance applications from the backend
        const fetchApplications = async () =>{
            try{
                const response = await axios.get('http://localhost:5001/finance-applications');
                setApplications(response.data);
                console.log(response.data);
            } catch (error){
                console.error('Error Fetching applications', error);
            }
        };

        fetchApplications();
    },[])

    return (
        <div className='p-3'>
            <h2 className='text-l font-bold'>Finance Application</h2>
            <ul className='space-y-3'>
                {applications.map((app)=>(
                    <li key={app.id} className='p-3 border rounded bg-gray-200'>
                        <h3 className='font-bold'>{app.name}</h3>
                        <p>Income: ${app.income}</p>
                        <p>Expenses: ${app.expenses}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FinanceApplicationList;