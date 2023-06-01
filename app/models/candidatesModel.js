const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Candidates = sequelize.define('Candidates', {
        candidateId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        numero: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Candidates;

}
