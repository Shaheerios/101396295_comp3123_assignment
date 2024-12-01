import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditEmployee() {
  const { id } = useParams(); // Extract employee ID from URL
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: ''
  });
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      console.log('Fetching employee details...');
      const response = await axios.get(`http://localhost:5000/api/v1/emp/employees/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log('Employee fetched:', response.data);
      setEmployee(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching employee details:', err);
      setError('Failed to fetch employee details. Please try again.');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting employee update:', employee);
    try {
      await axios.put(`http://localhost:5000/api/v1/emp/employees/${id}`, employee, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Employee updated successfully!');
      navigate('/employees');
    } catch (err) {
      console.error('Error updating employee:', err);
      alert('Failed to update employee. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading employee details...</p>;
  }

  if (error) {
    return (
      <div className="container">
        <h1>Error</h1>
        <p>{error}</p>
        <button className="cancel" onClick={() => navigate('/employees')}>Back to List</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Update Employee</h1>
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

export default EditEmployee;