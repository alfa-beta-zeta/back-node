const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

module.exports = (User) => {
    // Get all users
    router.get('/', userController.getAllUsers(User));

    // Create a new user
    router.post('/', userController.createUser(User));

    // Get a user by ID
    router.get('/:userId', userController.getUserById(User));

    // Update a user by ID
    router.put('/:userId', userController.updateUserById(User));

    // Delete a user by ID
    router.delete('/:userId', userController.deleteUserById(User));

    return router;
};
