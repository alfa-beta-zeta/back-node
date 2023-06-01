module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.js'], // Specify the pattern for test file matching
    maxWorkers: 4, // Set the desired number of maximum workers here
    maxConcurrency: 1,
};
