import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_DASHBOARD_DATA } from '../graphql/queries';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';    
import './styles/Dashboard.css';
import { DELETE_TRANSACTION } from '../graphql/mutations';

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_DASHBOARD_DATA);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    update(cache, { data: { deleteTransaction } }) {
      const { transactions } = cache.readQuery({ query: GET_DASHBOARD_DATA });
      cache.writeQuery({
        query: GET_DASHBOARD_DATA,
        data: {
          transactions: transactions.filter(tx => tx.id !== deleteTransaction.id),
        },
      });
    },
    refetchQueries: [{ query: GET_DASHBOARD_DATA }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { totalBalance, totalIncome, totalExpenses, categories, transactions } = data;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  const handleEdit = (id) => {
    navigate(`/transactions/edit/${id}`);
  };

  const handleDelete = async (id) => {
    console.log('Deleting transaction with ID:', id);
    try {
      await deleteTransaction({ variables: { id } });
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  // Filter transactions based on the selected category
  const filteredTransactions = selectedCategory === 'All' 
    ? transactions 
    : transactions.filter(tx => tx.category === selectedCategory);

  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <h2>Dashboard</h2>
        <div className="top-bar-buttons">
          <Link to="/transactions/add" className="add-transaction-button">Add New Transaction</Link>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>
      <div className="balance-summary">
        <p>Total Balance: ${totalBalance}</p>
        <p>Income: ${totalIncome}</p>
        <p>Expenses: ${totalExpenses}</p>
      </div>
      <div className="categories-section">
        <h3>Categories</h3>
        <ul>
          {categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      </div>
      <div className="transaction-filter-section">
        <label htmlFor="category-filter">Filter by Category:</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="transaction-list-section">
        <h3>Transaction List</h3>
        <ul>
          {filteredTransactions.map((tx, index) => (
            <li key={tx.id} className="transaction-item">
              <div className="transaction-details">
                {index + 1}. {tx.category} - ${tx.amount} - {tx.type}
              </div>
              <div className="transaction-actions">
                <button className="button-edit" onClick={() => handleEdit(tx.id)}>Edit</button>
                <button className="button-delete" onClick={() => handleDelete(tx.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
