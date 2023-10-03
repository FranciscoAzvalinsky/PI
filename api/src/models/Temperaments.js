const { DataTypes } = require ('sequelize');

module.exports = (sequelize) => {
    // defino el modelo con sus datos y sus validaciones
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