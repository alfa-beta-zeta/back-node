const request = require('supertest');
const app = require('../server');

describe('Candidates Controller', () => {
    // Test data
    const testCandidate = {
        fullName: 'TestCandidate',
        numero: '1234567890',
    };
    let createdCandidateId;

    // Test the creation of a new candidate
    it('should create a new candidate', async () => {
        const response = await request(app)
            .post('/candidates')
            .send(testCandidate);

        console.log('Response:', response.status);
        console.log('Response body:', response.body);

        createdCandidateId = response.body.candidateId;

        expect(response.status).toBe(201);
        expect(response.body.fullName).toBe(testCandidate.fullName);
        expect(response.body.numero).toBe(testCandidate.numero);
    });

    // Test retrieving a candidate by ID
    it('should get a candidate by ID', async () => {
        const response = await request(app)
            .get(`/candidates/${createdCandidateId}`)
            .expect(200);

        console.log('Response:', response.status);
        console.log('Response body:', response.body);

        expect(response.body.candidateId).toBe(createdCandidateId);
        expect(response.body.fullName).toBe(testCandidate.fullName);
        expect(response.body.numero).toBe(testCandidate.numero);
    });

    // Test updating a candidate by ID
    it('should update a candidate by ID', async () => {
        const updatedCandidate = {
            fullName: 'Updated Candidate',
            numero: '9876543210',
        };

        const response = await request(app)
            .put(`/candidates/${createdCandidateId}`)
            .send(updatedCandidate)
            .expect(200);

        console.log('Response:', response.status);
        console.log('Response body:', response.body);

        expect(response.body.candidateId).toBe(createdCandidateId);
        expect(response.body.fullName).toBe(updatedCandidate.fullName);
        expect(response.body.numero).toBe(updatedCandidate.numero);
    });

    // Test deleting a candidate by ID
    it('should delete a candidate by ID', async () => {
        const response = await request(app)
            .delete(`/candidates/${createdCandidateId}`)
            .expect(204);

        console.log('Response:', response.status);

        const deletedCandidate = await request(app)
            .get(`/candidates/${createdCandidateId}`)
            .expect(404);

        console.log('Deleted candidate:', deletedCandidate.status);

        expect(deletedCandidate.body.error).toBe('Candidate not found');
    });
});
