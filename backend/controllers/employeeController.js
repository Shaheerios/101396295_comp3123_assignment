const Employee = require('../models/Employee');

// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// Create new employee
exports.createEmployee = async (req, res) => {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;
    try {
        const employee = new Employee({ first_name, last_name, email, position, salary, date_of_joining, department });
        await employee.save();
        res.status(201).json({ message: 'Employee created successfully.', employee_id: employee._id });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) return res.status(404).json({ status: false, message: 'Employee not found' });
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// Update employee
exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
        if (!employee) return res.status(404).json({ status: false, message: 'Employee not found' });
        res.status(200).json({ message: 'Employee details updated successfully.' });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// Search employees by department or position
exports.searchEmployees = async (req, res) => {
    const { department, position } = req.query;
    const filter = {};

    if (department) {
        filter.department = department;
    }
    if (position) {
        filter.position = position;
    }

    try {
        const employees = await Employee.find(filter);
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};


// Delete employee
exports.deleteEmployee = async (req, res) => {
    try {
        const { eid } = req.params; // Extract from params, not query
        const employee = await Employee.findByIdAndDelete(eid);
        if (!employee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully.' }); // Use status 200 for successful deletion
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};
