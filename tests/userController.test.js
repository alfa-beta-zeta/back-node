const request = require('supertest');
const app = require('../server'); // Assuming your Express app is exported from server.js

describe('User Controller', () => {
    // Test data
    const testUser = {
        username: 'testuser',
        password: 'testpassword',
        group: 'testgroup',
        email: 'test@example.com',
        phone: '1234567890',
        facebookId: 'testfacebookid',
    };

    let createdUserId;

    // Test the creation of a new user
    it('should create a new user', async () => {
        const response = await request(app)
            .post('/users')
            .send(testUser)
            .expect(201);

        const createdUser = response.body;
        createdUserId = createdUser.userId;

        expect(createdUser.username).toBe(testUser.username);
        expect(createdUser.group).toBe(testUser.group);
        expect(createdUser.email).toBe(testUser.email);
        expect(createdUser.phone).toBe(testUser.phone);
        expect(createdUser.facebookId).toBe(testUser.facebookId);
    });

    // Test retrieving a user by ID
    it('should get a user by ID', async () => {
        const response = await request(app)
            .get(`/users/${createdUserId}`)
            .expect(200);

        const user = response.body;

        expect(user.userId).toBe(createdUserId);
        expect(user.username).toBe(testUser.username);
        expect(user.group).toBe(testUser.group);
        expect(user.email).toBe(testUser.email);
        expect(user.phone).toBe(testUser.phone);
        expect(user.facebookId).toBe(testUser.facebookId);
    });

    // Test updating a user by ID
    it('should update a user by ID', async () => {
        const updatedUser = {
            username: 'updateduser',
            group: 'updatedgroup',
            email: 'updated@example.com',
            phone: '9876543210',
            facebookId: 'updatedfacebookid',
        };

        const response = await request(app)
            .put(`/users/${createdUserId}`)
            .send(updatedUser)
            .expect(200);

        const user = response.body;

        expect(user.userId).toBe(createdUserId);
        expect(user.username).toBe(updatedUser.username);
        expect(user.group).toBe(updatedUser.group);
        expect(user.email).toBe(updatedUser.email);
        expect(user.phone).toBe(updatedUser.phone);
        expect(user.facebookId).toBe(updatedUser.facebookId);
    });

    // Test deleting a user by ID
    it('should delete a user by ID', async () => {
        await request(app)
            .delete(`/users/${createdUserId}`)
            .expect(204);

        // Verify the user is deleted by trying to retrieve it again
        await request(app)
            .get(`/users/${createdUserId}`)
            .expect(404);
    });
});
