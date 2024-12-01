import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Send the signup request without declaring the unused `response` variable
      await axios.post('http://localhost:5000/api/v1/user/signup', { username, email, password });
      alert('Signup Successful');
      window.location.href = '/login'; // Redirect to login
    } catch (error) {
      alert('Signup Failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h1>Signup</h1>
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;