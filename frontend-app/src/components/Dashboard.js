import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_DASHBOARD_DATA } from '../graphql/queries';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';    
import './styles/Dashboard.css';

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_DASHBOARD_DATA);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { totalBalance, totalIncome, totalExpenses, categories, transactions } = data;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <p>Total Balance: ${totalBalance}</p>
      <p>Income: ${totalIncome}</p>
      <p>Expenses: ${totalExpenses}</p>
      <h3>Categories</h3>
      <ul>
        {categories.map(category => (
          <li key={category}>{category}</li>
        ))}
      </ul>
      <h3>Transaction List</h3>
      <ul>
        {transactions.map(tx => (
          <li key={tx.id}>
            {tx.description} - ${tx.amount} - {tx.type}
          </li>
        ))}
      </ul>
      <Link to="/transactions/add">Add New Transaction</Link>
    </div>
  );
};

export default Dashboard;

// import React from 'react';
// import { useQuery } from '@apollo/client';
// import { GET_DASHBOARD_DATA } from '../graphql/queries';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// const Dashboard = () => {
//   const { loading, error, data } = useQuery(GET_DASHBOARD_DATA);
//   const navigate = useNavigate();

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const { totalBalance, totalIncome, totalExpenses, categories, transactions } = data;

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/signin');
//   };

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <button onClick={handleLogout}>Logout</button>
//       <p>Total Balance: ${totalBalance}</p>
//       <p>Total Income: ${totalIncome}</p>
//       <p>Total Expenses: ${totalExpenses}</p>
//       <h3>Categories</h3>
//       <ul>
//         {categories.map(category => (
//           <li key={category}>{category}</li>
//         ))}
//       </ul>
//       <h3>Transaction List</h3>
//       <ul>
//         {transactions.map(tx => (
//           <li key={tx.id}>
//             {tx.description} - ${tx.amount}
//           </li>
//         ))}
//       </ul>
//       <Link to="/transactions/add">Add New Transaction</Link>
//     </div>
//   );
// };

// export default Dashboard;

