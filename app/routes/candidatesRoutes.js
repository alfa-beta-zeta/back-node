const express = require('express');
const router = express.Router();
const candidatesController = require('../controllers/candidatesController');

module.exports = (Candidates) => {
    // Create a new candidate
    router.post('/', candidatesController.createCandidate);

    // Get all candidates
    router.get('/', candidatesController.getAllCandidates);

    // Get a candidate by ID
    router.get('/:id', candidatesController.getCandidateById);

    // Update a candidate by ID
    router.put('/:id', candidatesController.updateCandidateById);

    // Delete a candidate by ID
    router.delete('/:id', candidatesController.deleteCandidateById);

    return router;
};
