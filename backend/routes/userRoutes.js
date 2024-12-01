const express = require('express');
const { signup, login } = require('../controllers/userController');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: false,
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg
            }))
        });
    }
    next();
};


// Validation for signup
const validateSignup = [
    check('username', 'Username is required').notEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    handleValidationErrors
];

// Validation for login
const validateLogin = [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password is required').notEmpty(),
    handleValidationErrors
];

// Routes
router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);

module.exports = router;