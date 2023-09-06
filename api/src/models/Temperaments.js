const { DataTypes } = require ('sequelize');

module.exports = (sequelize) => {
sequelize.define('temperaments', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})
}