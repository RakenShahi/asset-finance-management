import React, {useState,useEffect} from 'react';
import axios from 'axios';

const FinanceApplicationList = ({applications,fetchApplications,onEdit}) => {

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
    },[])

    return (
        <div className='p-3'>
            <h2 className='text-xl font-bold mb-3'>Finance Application</h2>
            <ul className='space-y-3'>
                {applications.map((app)=>(
                    <li key={app._id} className='p-3 border rounded bg-gray-200'>
                        <h3 className='font-bold'>{app.name}</h3>
                        <p>Income: ${app.income}</p>
                        <p>Expenses: ${app.expenses}</p>
                        <button onClick={()=> handleDelete(app._id)} className='bg-red-700 text-white py-1 px-3 rounded mt-2 shadow-md'> Delete </button>
                        <button onClick={() => onEdit(app)} className='bg-blue-600 text-white py-1 px-3 rounded mt-2 shadow-md'>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FinanceApplicationList;