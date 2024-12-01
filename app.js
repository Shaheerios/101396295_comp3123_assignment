import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import EmployeeList from './components/Employee/EmployeeList';
import AddEmployee from './components/Employee/AddEmployee';
import EditEmployee from './components/Employee/EditEmployee';
import ViewEmployee from './components/Employee/ViewEmployee';

function App() {
    const isAuthenticated = !!localStorage.getItem('token'); // Check for authentication token

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes */}
                <Route
                    path="/employees"
                    element={isAuthenticated ? <EmployeeList /> : <Navigate to="/login" />}
                />
                <Route
                    path="/employees/add"
                    element={isAuthenticated ? <AddEmployee /> : <Navigate to="/login" />}
                />
                <Route
                    path="/employees/edit/:id"
                    element={isAuthenticated ? <EditEmployee /> : <Navigate to="/login" />}
                />
                <Route
                    path="/employees/view/:id"
                    element={isAuthenticated ? <ViewEmployee /> : <Navigate to="/login" />}
                />

                {/* Redirect Unknown Routes */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
