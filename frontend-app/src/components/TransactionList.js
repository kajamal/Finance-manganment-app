// import React from 'react';
// import { useQuery } from '@apollo/client';
// import { GET_TRANSACTIONS } from '../graphql/queries';

// const TransactionList = () => {
//   const { loading, error, data } = useQuery(GET_TRANSACTIONS);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       <h2>Transaction List</h2>
//       <button onClick={() => window.location.href = '/transactions/add'}>Add New Transaction</button>
//       <ul>
//         {data.transactions.map(tx => (
//           <li key={tx.id}>
//             {tx.description} - ${tx.amount} - <a href={`/transactions/${tx.id}`}>View Details</a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TransactionList;
