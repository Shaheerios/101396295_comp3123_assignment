const express = require('express');
const {
    getAllEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    searchEmployees
} = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// Validation for creating an employee
const validateEmployee = [
    check('first_name', 'First name is required').notEmpty(),
    check('last_name', 'Last name is required').notEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('position', 'Position is required').notEmpty(),
    check('salary', 'Salary must be a number').isNumeric(),
    check('department', 'Department is required').notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validation for updating an employee (partial validation)
const validateEmployeeUpdate = [
    check('first_name').optional().notEmpty().withMessage('First name cannot be empty'),
    check('last_name').optional().notEmpty().withMessage('Last name cannot be empty'),
    check('email').optional().isEmail().withMessage('Invalid email'),
    check('position').optional().notEmpty().withMessage('Position cannot be empty'),
    check('salary').optional().isNumeric().withMessage('Salary must be a number'),
    check('department').optional().notEmpty().withMessage('Department cannot be empty'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Reorder the routes
router.get('/employees/search', authMiddleware, searchEmployees); // Specific route comes first
router.get('/employees', authMiddleware, getAllEmployees);
router.post('/employees', authMiddleware, validateEmployee, createEmployee);
router.get('/employees/:eid', authMiddleware, getEmployeeById);
router.put('/employees/:eid', authMiddleware, validateEmployeeUpdate, updateEmployee); // Use the partial validation middleware
router.delete('/employees/:eid', authMiddleware, deleteEmployee);

module.exports = router;
