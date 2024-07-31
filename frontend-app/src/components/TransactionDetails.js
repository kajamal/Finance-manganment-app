// import React, { useEffect, useState } from 'react';
// import { useQuery } from '@apollo/client';
// import { GET_TRANSACTION } from '../graphql/queries';
// import { useParams } from 'react-router-dom';

// const TransactionDetails = () => {
//   const { id } = useParams();
//   const { loading, error, data } = useQuery(GET_TRANSACTION, { variables: { id } });
//   const [transaction, setTransaction] = useState(null);

//   useEffect(() => {
//     if (data) {
//       setTransaction(data.transaction);
//     }
//   }, [data]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       <h2>Transaction Details</h2>
//       {transaction && (
//         <div>
//           <p>Description: {transaction.description}</p>
//           <p>Amount: ${transaction.amount}</p>
//           <p>Category: {transaction.category}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TransactionDetails;
