const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('videogame', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        launchDate: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.DATEONLY
        },
        rating: {
            type: DataTypes.FLOAT,
        },
        platforms: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        created: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });
};