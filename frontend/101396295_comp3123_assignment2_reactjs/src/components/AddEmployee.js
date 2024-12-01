import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddEmployee() {
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/v1/emp/employees', employee, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Employee added successfully!');
      navigate('/employees');
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Failed to add employee. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input type="text" name="first_name" value={employee.first_name} onChange={handleChange} required />
        <label>Last Name:</label>
        <input type="text" name="last_name" value={employee.last_name} onChange={handleChange} required />
        <label>Email Address:</label>
        <input type="email" name="email" value={employee.email} onChange={handleChange} required />
        <label>Position:</label>
        <input type="text" name="position" value={employee.position} onChange={handleChange} required />
        <label>Salary:</label>
        <input type="number" name="salary" value={employee.salary} onChange={handleChange} required />
        <label>Date of Joining:</label>
        <input type="date" name="date_of_joining" value={employee.date_of_joining} onChange={handleChange} required />
        <label>Department:</label>
        <input type="text" name="department" value={employee.department} onChange={handleChange} required />
        <button type="submit" className="add">Save</button>
        <button type="button" className="cancel" onClick={() => navigate('/employees')}>Cancel</button>
      </form>
    </div>
  );
}

export default AddEmployee;