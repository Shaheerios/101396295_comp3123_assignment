import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      // Build query string dynamically
      const query = [];
      if (department) query.push(`department=${department}`);
      if (position) query.push(`position=${position}`);
      const queryString = query.length ? `?${query.join('&')}` : '';

      const response = await axios.get(`http://localhost:5000/api/v1/emp/employees/search${queryString}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      alert('Failed to fetch employees. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:5000/api/v1/emp/employees/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        alert('Employee deleted successfully');
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Failed to delete employee. Please try again.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear authentication token
    alert('You have been logged out.');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="container">
      {/* Header with Logout Button */}
      <div className="header">
        <h1>Employees List</h1>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <button className="search" onClick={fetchEmployees}>
          Search
        </button>
        <button className="reset" onClick={() => { setDepartment(''); setPosition(''); fetchEmployees(); }}>
          Reset
        </button>
      </div>

      {/* Add Employee Button */}
      <button className="add" onClick={() => navigate('/employees/add')}>
        Add Employee
      </button>

      {/* Employee Table */}
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Date of Joining</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>${employee.salary}</td>
                <td>{new Date(employee.date_of_joining).toLocaleDateString()}</td>
                <td>{employee.department}</td>
                <td>
                  <button
                    className="update"
                    onClick={() => navigate(`/employees/update/${employee._id}`)}
                  >
                    Update
                  </button>
                  <button className="delete" onClick={() => handleDelete(employee._id)}>
                    Delete
                  </button>
                  <button
                    className="view"
                    onClick={() => navigate(`/employees/view/${employee._id}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
