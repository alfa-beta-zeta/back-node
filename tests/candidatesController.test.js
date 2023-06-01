const request = require('supertest');
const app = require('../server'); // Assuming your Express app is exported from server.js
const { sequelize } = require('../server'); // Import the sequelize instance from server.js


describe('Candidates Controller', () => {
    // Test data
    const testCandidate = {
        fullName: 'John Doe',
        numero: '123456789',
    };

    let createdCandidateId;

    // Connect to the database before running the tests
    beforeAll(async () => {
        await sequelize.authenticate();
    });

    // Close the database connection after running the tests
    afterAll(async () => {
        await sequelize.close();
    });

    // Test the creation of a new candidate
    it('should create a new candidate', async () => {
        const response = await request(app)
            .post('/candidates')
            .send(testCandidate)
            .expect(201);

        const createdCandidate = response.body;
        createdCandidateId = createdCandidate.candidateId;

        expect(createdCandidate.fullName).toBe(testCandidate.fullName);
        expect(createdCandidate.numero).toBe(testCandidate.numero);
    });

    // Test retrieving a candidate by ID
    it('should get a candidate by ID', async () => {
        const response = await request(app)
            .get(`/candidates/${createdCandidateId}`)
            .expect(200);

        const candidate = response.body;

        expect(candidate.candidateId).toBe(createdCandidateId);
        expect(candidate.fullName).toBe(testCandidate.fullName);
        expect(candidate.numero).toBe(testCandidate.numero);
    });

    // Test updating a candidate by ID
    it('should update a candidate by ID', async () => {
        const updatedCandidate = {
            fullName: 'Jane Smith',
            numero: '987654321',
        };

        const response = await request(app)
            .put(`/candidates/${createdCandidateId}`)
            .send(updatedCandidate)
            .expect(200);

        const candidate = response.body;

        expect(candidate.candidateId).toBe(createdCandidateId);
        expect(candidate.fullName).toBe(updatedCandidate.fullName);
        expect(candidate.numero).toBe(updatedCandidate.numero);
    });

    // Test deleting a candidate by ID
    it('should delete a candidate by ID', async () => {
        await request(app)
            .delete(`/candidates/${createdCandidateId}`)
            .expect(204);

        // Verify the candidate is deleted by trying to retrieve it again
        await request(app)
            .get(`/candidates/${createdCandidateId}`)
            .expect(404);
    });
});
