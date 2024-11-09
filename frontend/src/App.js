import './App.css';

import React from 'react';
import FinanceApplicationList from './components/FinanceApplicationList';
import FinanceApplicationForm from './components/FinanceApplicationForm';
import Header from './components/Header';

function App() {
  return (
   <div>
    <Header />
    <FinanceApplicationList />

    <FinanceApplicationForm />
   </div>
  );
}

export default App;
