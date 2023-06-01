const { Candidates } = require('../models/candidatesModel');

// Create a new candidate
exports.createCandidate = async (req, res, next) => {
    try {
        const candidate = await Candidates.create(req.body);
        res.status(201).json(candidate);
    } catch (error) {
        next(error);
    }
};

// Get all candidates
exports.getAllCandidates = async (req, res, next) => {
    try {
        const candidates = await Candidates.findAll();
        res.json(candidates);
    } catch (error) {
        next(error);
    }
};

// Get a candidate by ID
exports.getCandidateById = async (req, res, next) => {
    try {
        const candidate = await Candidates.findByPk(req.params.id);
        if (candidate) {
            res.json(candidate);
        } else {
            res.status(404).json({ message: 'Candidate not found' });
        }
    } catch (error) {
        next(error);
    }
};

// Update a candidate by ID
exports.updateCandidateById = async (req, res, next) => {
    try {
        const candidate = await Candidates.findByPk(req.params.id);
        if (candidate) {
            await candidate.update(req.body);
            res.json(candidate);
        } else {
            res.status(404).json({ message: 'Candidate not found' });
        }
    } catch (error) {
        next(error);
    }
};

// Delete a candidate by ID
exports.deleteCandidateById = async (req, res, next) => {
    try {
        const candidate = await Candidates.findByPk(req.params.id);
        if (candidate) {
            await candidate.destroy();
            res.json({ message: 'Candidate deleted successfully' });
        } else {
            res.status(404).json({ message: 'Candidate not found' });
        }
    } catch (error) {
        next(error);
    }
};
