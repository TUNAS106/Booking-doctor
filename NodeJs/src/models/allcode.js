'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Allcode.hasMany(models.User, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' });
            Allcode.hasMany(models.User, { foreignKey: 'genderId', targetKey: 'keyMap', as: 'genderData' });
            Allcode.hasMany(models.Schedule, { foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeTypeData' });

            Allcode.hasMany(models.Doctor_Infor, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceData' });
            Allcode.hasMany(models.Doctor_Infor, { foreignKey: 'provinceId', targetKey: 'keyMap', as: 'provinceData' });
            Allcode.hasMany(models.Doctor_Infor, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentData' });
        }
    };
    Allcode.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        valueVi: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Allcode',
    });
    return Allcode;
};