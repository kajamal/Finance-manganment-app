import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';

// Import components
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';
import TransactionList from './components/TransactionList.js';
// import AddEditTransaction from './components/AddEditTransaction.js';
import TransactionDetails from './components/TransactionDetails.js';
import Register from './components/Register.js';
import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
import TransactionForm from './components/TransactionForm.js';


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path = "/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/transactions/add" element={<TransactionForm />} />
          <Route path="/transactions/:id" element={<TransactionDetails />} />
          <Route path="/" element={<SignIn />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
