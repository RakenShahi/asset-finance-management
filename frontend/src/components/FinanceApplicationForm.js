import React , {useState,useEffect} from 'react';
import axios from 'axios';

const FinanceApplicationForm = ({onApplicationAdded, editingApplication, clearEditing}) => {
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [address,setAddress] = useState('');
    const [income, setIncome] = useState('');
    const [expenses, setExpenses] = useState('');

    useEffect(() =>{
        if(editingApplication){
            console.log('Boom boom boom');
            setName(editingApplication.personalDetails.name);
            setPhone(editingApplication.personalDetails.phone);
            setAddress(editingApplication.personalDetails.address);
            setIncome(editingApplication.income);
            setExpenses(editingApplication.expenses);
        }
    },[editingApplication]);

    const handleSubmit =async (e) => {
        e.preventDefault();
        console.log({name,income,expenses});

        const applicationData = {
            userId:editingApplication? editingApplication.userId: '672ed2a6c491fdac74567b1f',
            personalDetails: {name,phone,address},
            income:Number(income),
            expenses: Number(expenses),
            assets:0,
            liabilities:0,
        }

        try{
            if(editingApplication){
                console.log('About to update data');
                 await axios.put(`http://localhost:5001/finance-applications/${editingApplication._id}`,applicationData);
                clearEditing();
            }else{
                 await axios.post('http://localhost:5001/finance-applications',applicationData);
            }
            
            onApplicationAdded();
            // Clear the fields after adding
            setName('');
            setPhone('');
            setAddress('');
            setIncome('');
            setExpenses('');

            // Trigger the list refresh
            // if (onApplicationAdded){
            //     console.log('On application added, refresh list');
            //     onApplicationAdded();
            // }

        }catch(error){
            console.error('Error occured while adding applicaiton', error);
        }
    };

    return (
        <div className='p-4 border rounded bg-white shaddow mt-4'>
            <h2 className='text-xl font-semibold mb-4'>
                {editingApplication?'Edit Finance Application': 'Add Finance Applicaiton'}
                </h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className='block font-medium'>Name</label>
                    <input type='text' value={name} onChange={(e)=>setName(e.target.value)} className='w-full p-2 border rounded'/>
                </div>
                <div>
                    <label className='block font-medium'>Phone</label>
                    <input type='text' value={phone} onChange={(e)=>setPhone(e.target.value)} className='w-full p-2 border rounded'/>
                </div>
                <div>
                    <label className='block font-medium'>Address</label>
                    <input type='text' value={address} onChange={(e)=>setAddress(e.target.value)} className='w-full p-2 border rounded'/>
                </div>
                <div>
                    <label className='block font-medium'>Income</label>
                    <input type='number' value={income} onChange={(e) => setIncome(e.target.value)} className='w-full p-2 border rounded' />
                </div>
                <div>
                    <label className='block font-medium'>Expenses</label>
                    <input type='number' value={expenses} onChange={(e) => setExpenses(e.target.value)} className='w-full p-2 border rounded' />
                </div>
                <button type='submit' className='bg-blue-700 text-white py-2 px-4 rounded'>{editingApplication?'Update Application': 'Submit'}</button>
                </form>
        </div>
    );
};

export default FinanceApplicationForm;