const express = require('express');
const router = express.Router();
const candidatesController = require('../controllers/candidatesController');

module.exports = (Candidates) => {
    // Create a new candidate
    router.post('/', candidatesController.createCandidate(Candidates));

    // Get all candidates
    router.get('/', candidatesController.getAllCandidates(Candidates));

    // Get a candidate by ID
    router.get('/:candidateId', candidatesController.getCandidateById(Candidates));

    // Update a candidate by ID
    router.put('/:candidateId', candidatesController.updateCandidateById(Candidates));

    // Delete a candidate by ID
    router.delete('/:candidateId', candidatesController.deleteCandidateById(Candidates));

    return router;
};
