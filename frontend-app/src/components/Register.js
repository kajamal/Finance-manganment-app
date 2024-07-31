import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerUser] = useMutation(REGISTER_USER);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser({ variables: { username, password } });
      if (data) {
        console.log("Registration successful", data);
        localStorage.setItem('token', data.registerUser.token);
        navigate('/login');
      } else {
        console.error("Registration failed, no data returned");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
