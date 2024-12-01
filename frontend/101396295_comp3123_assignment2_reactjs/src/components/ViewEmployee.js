import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ViewEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/emp/employees/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee details:', error);
      alert('Failed to fetch employee details.');
    }
  };

  if (!employee) return <p>Loading employee details...</p>;

  return (
    <div className="container">
      <h1>View Employee Details</h1>
      <p><strong>First Name:</strong> {employee.first_name}</p>
      <p><strong>Last Name:</strong> {employee.last_name}</p>
      <p><strong>Email Address:</strong> {employee.email}</p>
      <p><strong>Position:</strong> {employee.position}</p>
      <p><strong>Salary:</strong> ${employee.salary}</p>
      <p><strong>Date of Joining:</strong> {new Date(employee.date_of_joining).toLocaleDateString()}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <button className="view" onClick={() => navigate('/employees')}>Back to List</button>
    </div>
  );
}

export default ViewEmployee;