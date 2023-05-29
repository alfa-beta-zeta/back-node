// controllers/userController.js

// Get all users
exports.getAllUsers = (User) => async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Create a new user
exports.createUser = (User) => async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get a user by ID
exports.getUserById = (User) => async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a user by ID
exports.updateUserById = (User) => async (req, res) => {
    try {
        const [updatedRowsCount, updatedRows] = await User.update(req.body, {
            where: { userId: req.params.userId },
            returning: true,
        });

        if (updatedRowsCount > 0) {
            res.json(updatedRows[0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a user by ID
exports.deleteUserById = (User) => async (req, res) => {
    try {
        const deletedRowsCount = await User.destroy({
            where: { userId: req.params.userId },
        });

        if (deletedRowsCount > 0) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
