import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';  // Import the global constant


const FinanceApplicationForm = ({ onApplicationAdded, editingApplication, clearEditing }) => {
  const navigate = useNavigate();
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [assets, setAssets] = useState('');
  const [liabilities, setLiabilities] = useState('');
  const [validationErrors, setValidationErrors] = useState({})

  useEffect(() => {
    if (editingApplication) {
      setIncome(editingApplication.income);
      setExpenses(editingApplication.expenses);
      setAssets(editingApplication.assets);
      setLiabilities(editingApplication.liabilities);
    }
  }, [editingApplication]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation Check
    const errors = {};
    if (!income) errors.income = "Income is required";
    if (!expenses) errors.expenses = 'Expenses are required';
    if (!assets) errors.assets = 'Assets value required';
    if (!liabilities) errors.liabilities = 'Liabilities value required';

    if (Object.keys(errors).length > 0) {
      // console.log('Error is ', errors);
      setValidationErrors(errors);
      return; // Stop the submission if there are any errors
    }

    const applicationData = {
      income: Number(income),
      expenses: Number(expenses),
      assets: assets,
      liabilities: liabilities,
    }

    try {
      // Retrieve the token from localStorage 
      const token = localStorage.getItem('token');

      if (!token) {
        console.error("No token found, cannot submit application.");
        return;
      }

      // Send token in the request headers for authentication
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      if (editingApplication) {
        await axios.put(`${API_URL}/api/finance-applications/${editingApplication._id}`, applicationData, config);
        clearEditing();  // Ensure this clears the edit state
      } else {
        await axios.post(`${API_URL}/api/finance-applications/createuserapplication`, applicationData, config);  // Send token with request
      }

      onApplicationAdded();
      setIncome('');
      setExpenses('');
      setAssets('');
      setLiabilities('');
      setValidationErrors({});
      navigate('/list');

    } catch (error) {
      console.error('Error occured while adding applicaiton', error);
    }
  };

  const handleCreateNew = () => {
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