import React , {useState} from 'react';

const FinanceApplicationForm = () => {
    const [name,setName] = useState('');
    const [income, setIncome] = useState('');
    const [expenses, setExpenses] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({name,income,expenses});
    };

    return (
        <div className='p-4 border rounded bg-white shaddow mt-4'>
            <h2 className='text-xl font-semibold mb-4'>Add Finance Applicaiton</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className='block font-medium'>Name</label>
                    <input type='text' value={name} onChange={(e)=>setName(e.target.value)} className='w-full p-2 border rounded'/>
                </div>
                <div>
                    <label className='block font-medium'>Income</label>
                    <input type='number' value={income} onChange={(e) => setIncome(e.target.value)} className='w-full p-2 border rounded' />
                </div>
                <div>
                    <label className='block font-medium'>Expenses</label>
                    <input type='number' value={expenses} onChange={(e) => setExpenses(e.target.value)} className='w-full p-2 border rounded' />
                </div>
                <button type='submit' className='bg-blue-700 text-white py-2 px-4 rounded'>Submit</button>
                </form>
        </div>
    );
};

export default FinanceApplicationForm;