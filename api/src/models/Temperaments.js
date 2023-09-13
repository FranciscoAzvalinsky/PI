const { DataTypes } = require ('sequelize');

module.exports = (sequelize) => {
sequelize.define('temperaments', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})
}