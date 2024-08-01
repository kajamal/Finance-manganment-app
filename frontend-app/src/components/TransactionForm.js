import React, { useState } from 'react';
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
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION);

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




