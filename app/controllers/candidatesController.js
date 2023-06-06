// Get all candidates
exports.getAllCandidates = (Candidates) => async (req, res) => {
    try {
        const candidates = await Candidates.findAll();
        res.json(candidates);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Create a new candidate
exports.createCandidate = (Candidates) => async (req, res) => {
    try {
        const candidate = await Candidates.create(req.body);
        res.status(201).json(candidate);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get a candidate by ID
exports.getCandidateById = (Candidates) => async (req, res) => {
    try {
        const candidate = await Candidates.findByPk(req.params.candidateId);
        if (candidate) {
            res.json(candidate);
        } else {
            res.status(404).json({ error: 'Candidate not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a candidate by ID
exports.updateCandidateById = (Candidates) => async (req, res) => {
    try {
        const [updatedRowsCount, updatedRows] = await Candidates.update(req.body, {
            where: { candidateId: req.params.candidateId },
            returning: true,
        });

        if (updatedRowsCount > 0) {
            res.json(updatedRows[0]);
        } else {
            res.status(404).json({ error: 'Candidate not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a candidate by ID
exports.deleteCandidateById = (Candidates) => async (req, res) => {
    try {
        const deletedRowsCount = await Candidates.destroy({
            where: { candidateId: req.params.candidateId },
        });

        if (deletedRowsCount > 0) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ error: 'Candidate not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
