// import React, { useState, useEffect } from 'react';
// import { useMutation, useQuery } from '@apollo/client';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ADD_TRANSACTION, UPDATE_TRANSACTION } from '../graphql/mutations';
// import { GET_TRANSACTION } from '../graphql/queries';
// import {jwtDecode} from 'jwt-decode';  // Correct import statement

// const AddEditTransaction = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [description, setDescription] = useState('');
//   const [amount, setAmount] = useState('');
//   const [category, setCategory] = useState('');

//   const [addTransaction] = useMutation(ADD_TRANSACTION);
//   const [updateTransaction] = useMutation(UPDATE_TRANSACTION);

//   const { data } = useQuery(GET_TRANSACTION, {
//     variables: { id },
//     skip: !id,
//   });

//   useEffect(() => {
//     if (data) {
//       setDescription(data.transaction.description);
//       setAmount(data.transaction.amount);
//       setCategory(data.transaction.category);
//     }
//   }, [data]);

//   const handleSave = async (e) => {
//     e.preventDefault();

//     const amountAsNumber = parseFloat(amount);
//     if (isNaN(amountAsNumber)) {
//       console.error('Amount is not a valid number');
//       return;
//     }

//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.error('No auth token found');
//       return;
//     }

//     const decodedToken = jwtDecode(token);
//     const userPayload = { userId: decodedToken.userId, iat: decodedToken.iat };

//     try {
//       if (id) {
//         await updateTransaction({
//           variables: {
//             id,
//             description,
//             amount: amountAsNumber,
//             category,
//             user: userPayload,
//           },
//         });
//       } else {
//         await addTransaction({
//           variables: {
//             description,
//             amount: amountAsNumber,
//             category,
//             user: userPayload,
//           },
//         });
//       }
//       navigate('/transactions');
//     } catch (error) {
//       console.error('Error saving transaction:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSave}>
//       <div>
//         <label>Description</label>
//         <input
//           type="text"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Amount</label>
//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Category</label>
//         <input
//           type="text"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit">Save</button>
//     </form>
//   );
// };

// export default AddEditTransaction;


// import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { ADD_TRANSACTION, UPDATE_TRANSACTION } from '../graphql/mutations';
// import { useNavigate, useParams } from 'react-router-dom';
// import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

// const TransactionForm = () => {
//   const [description, setDescription] = useState('');
//   const [amount, setAmount] = useState('');
//   const [category, setCategory] = useState('');
//   const [type, setType] = useState('income'); // Default type
//   const navigate = useNavigate();
//   const { id } = useParams(); // For editing an existing transaction

//   const [addTransaction] = useMutation(ADD_TRANSACTION);
//   const [updateTransaction] = useMutation(UPDATE_TRANSACTION);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (id) {
//         await updateTransaction({
//           variables: { id, description, amount: parseFloat(amount), category, type },
//         });
//       } else {
//         await addTransaction({
//           variables: { description, amount: parseFloat(amount), category, type },
//         });
//       }
//       navigate('/dashboard'); // Redirect to dashboard or appropriate route
//     } catch (error) {
//       console.error('Error saving transaction:', error);
//     }
//   };

//   return (
//     <div>
//       {/* <h2>{id ? 'Edit Transaction' : 'Add Transaction'}</h2> */}
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Amount"
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           fullWidth
//           margin="normal"
//         />
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Category</InputLabel>
//           <Select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <MenuItem value="Salary">Salary</MenuItem>
//             <MenuItem value="Rent">Rent</MenuItem>
//             <MenuItem value="Groceries">Groceries</MenuItem>
//             <MenuItem value="Utilities">Utilities</MenuItem>
//             <MenuItem value="Entertainment">Entertainment</MenuItem>
//           </Select>
//         </FormControl>
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Type</InputLabel>
//           <Select
//             value={type}
//             onChange={(e) => setType(e.target.value)}
//           >
//             <MenuItem value="income">Income</MenuItem>
//             <MenuItem value="expense">Expense</MenuItem>
//           </Select>
//         </FormControl>
//         <Button type="submit" variant="contained" color="primary">Add</Button>
//       </form>
//     </div>
//   );
// };

// export default TransactionForm;

// import React, { useState, useEffect } from 'react';
// import { useMutation } from '@apollo/client';
// import { ADD_TRANSACTION, UPDATE_TRANSACTION } from '../graphql/mutations';
// import { useNavigate, useParams } from 'react-router-dom';
// import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

// const TransactionForm = () => {
//   const [description, setDescription] = useState('');
//   const [amount, setAmount] = useState('');
//   const [category, setCategory] = useState('');
//   const [type, setType] = useState('income'); // Default type
//   const navigate = useNavigate();
//   const { id } = useParams(); // For editing an existing transaction

//   const [addTransaction, { data: addData, error: addError }] = useMutation(ADD_TRANSACTION);
//   const [updateTransaction, { data: updateData, error: updateError }] = useMutation(UPDATE_TRANSACTION);

//   useEffect(() => {
//     if (addData || updateData) {
//       navigate('/dashboard'); // Redirect to dashboard or appropriate route
//     }
//   }, [addData, updateData, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (id) {
//         await updateTransaction({
//           variables: { id, description, amount: parseFloat(amount), category, type },
//         });
//       } else {
//         await addTransaction({
//           variables: { description, amount: parseFloat(amount), category, type },
//         });
//       }
//     } catch (error) {
//       console.error('Error saving transaction:', error);
//     }
//   };

//   useEffect(() => {
//     if (addError) {
//       console.error('Error adding transaction:', addError);
//     }
//     if (updateError) {
//       console.error('Error updating transaction:', updateError);
//     }
//   }, [addError, updateError]);

//   return (
//     <div>
//       <h2>{id ? 'Edit Transaction' : 'Add Transaction'}</h2>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Amount"
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           fullWidth
//           margin="normal"
//         />
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Category</InputLabel>
//           <Select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <MenuItem value="Salary">Salary</MenuItem>
//             <MenuItem value="Rent">Rent</MenuItem>
//             <MenuItem value="Groceries">Groceries</MenuItem>
//             <MenuItem value="Utilities">Utilities</MenuItem>
//             <MenuItem value="Entertainment">Entertainment</MenuItem>
//           </Select>
//         </FormControl>
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Type</InputLabel>
//           <Select
//             value={type}
//             onChange={(e) => setType(e.target.value)}
//           >
//             <MenuItem value="income">Income</MenuItem>
//             <MenuItem value="expense">Expense</MenuItem>
//           </Select>
//         </FormControl>
//         <Button type="submit" variant="contained" color="primary">{id ? 'Update' : 'Add'}</Button>
//       </form>
//     </div>
//   );
// };

// export default TransactionForm;


import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TRANSACTION, UPDATE_TRANSACTION } from '../graphql/mutations';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { GET_DASHBOARD_DATA } from '../graphql/queries';

const TransactionForm = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('income'); // Default type
  const navigate = useNavigate();
  const { id } = useParams(); // For editing an existing transaction
  const [addTransaction] = useMutation(ADD_TRANSACTION, {
    refetchQueries: [{ query: GET_DASHBOARD_DATA }] // Refetch dashboard data after mutation
  });
  const [updateTransaction, { data: updateData, error: updateError }] = useMutation(UPDATE_TRANSACTION);

  // useEffect(() => {
  //   if (addData || updateData) {
  //     navigate('/dashboard'); // Redirect to dashboard or appropriate route
  //   }
  // }, [addData, updateData, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateTransaction({
          variables: { id, description, amount: parseFloat(amount), category, type },
        });
      } else {
        await addTransaction({
          variables: { description, amount: parseFloat(amount), category, type },
        });
      }
      navigate('/dashboard');
    }
     catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  // useEffect(() => {
  //   if (addError) {
  //     console.error('Error adding transaction:', addError);
  //   }
  //   if (updateError) {
  //     console.error('Error updating transaction:', updateError);
  //   }
  // }, [addError, updateError]);

  return (
    <div>
      <h2>{id ? 'Edit Transaction' : 'Add Transaction'}</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="Salary">Salary</MenuItem>
            <MenuItem value="Rent">Rent</MenuItem>
            <MenuItem value="Groceries">Groceries</MenuItem>
            <MenuItem value="Utilities">Utilities</MenuItem>
            <MenuItem value="Entertainment">Entertainment</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">{id ? 'Update' : 'Add'}</Button>
      
      </form>
    </div>
  );
};

export default TransactionForm;




