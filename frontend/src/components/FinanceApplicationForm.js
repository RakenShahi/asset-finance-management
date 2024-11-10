import React , {useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const FinanceApplicationForm = ({onApplicationAdded, editingApplication, clearEditing}) => {
    const navigate = useNavigate();
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [address,setAddress] = useState('');
    const [income, setIncome] = useState('');
    const [expenses, setExpenses] = useState('');
    const [assets, setAssets] = useState('');
    const [liabilities, setLiabilities] = useState('');
    const [validationErrors, setValidationErrors] = useState({})

    useEffect(() =>{
        if(editingApplication){
            console.log('Boom boom boom');
            setName(editingApplication.personalDetails.name);
            setPhone(editingApplication.personalDetails.phone);
            setAddress(editingApplication.personalDetails.address);
            setIncome(editingApplication.income);
            setExpenses(editingApplication.expenses);
            setAssets(editingApplication.assets);
            setLiabilities(editingApplication.liabilities);
        }
    },[editingApplication]);

    const handleSubmit =async (e) => {
        e.preventDefault();

        // Validation Check
        const errors={};
        if (!name.trim()) errors.name = 'Name is required';
        if (!phone.trim()) errors.phone = "Phone is required";
        if (!address.trim()) errors.address = "Address is required";
        if (!income) errors.income = "Income is required";
        if (!expenses) errors.expenses = 'Expenses are required';
        if (!assets) errors.assets = 'Assets value required';
        if (!liabilities) errors.liabilities = 'Liabilities value required';

        if(Object.keys(errors).length>0){
            console.log('Error is ',errors);
            setValidationErrors(errors);
            return; // Stop the submission if there are any errors
        }

        const applicationData = {
            userId:editingApplication? editingApplication.userId: '672ed2a6c491fdac74567b1f',
            personalDetails: {name,phone,address},
            income:Number(income),
            expenses: Number(expenses),
            assets:assets,
            liabilities:liabilities,
        }

        try{
            if(editingApplication){
                console.log('About to update data', editingApplication);
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
            setAssets('');
            setLiabilities('');
            setValidationErrors({});
            navigate('/list');

            // Trigger the list refresh
            // if (onApplicationAdded){
            //     console.log('On application added, refresh list');
            //     onApplicationAdded();
            // }

        }catch(error){
            console.error('Error occured while adding applicaiton', error);
        }
    };

    const handleCreateNew = () => {
        // Clear form fields and reset editing mode
        setName('');
        setPhone('');
        setAddress('');
        setIncome('');
        setExpenses('');
        setAssets('');
        setLiabilities('');
        clearEditing();
    }

    return (
        <div className="p-6 border rounded-lg bg-white shadow-lg max-w-lg mx-auto mt-8">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            {editingApplication ? 'Edit Finance Application' : 'Add Finance Application'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full name"
              />
              {validationErrors.name && <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>}
            </div>
            <div>
              <label className="block font-medium text-gray-700">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
              />
              {validationErrors.phone && <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>}
            </div>
            <div>
              <label className="block font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter address"
              />
              {validationErrors.address && <p className="text-red-500 text-sm mt-1">{validationErrors.address}</p>}
            </div>
            <div>
              <label className="block font-medium text-gray-700">Income</label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter income"
              />
              {validationErrors.income && <p className="text-red-500 text-sm mt-1">{validationErrors.income}</p>}
            </div>
            <div>
              <label className="block font-medium text-gray-700">Expenses</label>
              <input
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter expenses"
              />
              {validationErrors.expenses && <p className="text-red-500 text-sm mt-1">{validationErrors.expenses}</p>}
            </div>
            <div>
              <label className="block font-medium text-gray-700">Assets</label>
              <input
                type="number"
                value={assets}
                onChange={(e) => setAssets(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter assets"
              />
              {validationErrors.assets && <p className="text-red-500 text-sm mt-1">{validationErrors.assets}</p>}
            </div>
            <div>
              <label className="block font-medium text-gray-700">Liabilities</label>
              <input
                type="number"
                value={liabilities}
                onChange={(e) => setLiabilities(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter liabilities"
              />
              {validationErrors.liabilities && <p className="text-red-500 text-sm mt-1">{validationErrors.liabilities}</p>}
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-700 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-800 transition duration-200"
              >
                {editingApplication ? 'Update Application' : 'Submit'}
              </button>
              {editingApplication && (
                <button
                  type="button"
                  onClick={handleCreateNew}
                  className="bg-green-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-green-700 ml-4 transition duration-200"
                >
                  Create New
                </button>
              )}
            </div>
          </form>
        </div>
      );
      
};

export default FinanceApplicationForm;