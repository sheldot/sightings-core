import { simple } from 'src/util/validator.util';

export default (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('restaurants', {
    // General
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    // Attributes
    addressCity: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: simple('addressCity') },
      },
    },
    addressState: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: simple('addressState') },
      },
    },
    addressStreet: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: simple('addressStreet') },
      },
    },
    addressZip: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: simple('addressZip') },
      },
    },

    categoryCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: simple('categoryCode') },
      },
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: simple('categoryName') },
      },
    },

    locationName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: simple('locationName') },
      },
    },
    locationLatitude: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      validate: {
        notEmpty: { msg: simple('locationLatitude') },
      },
    },
    locationLongitude: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      validate: {
        notEmpty: { msg: simple('locationLongitude') },
      },
    },

    safegraphPlaceId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: simple('safegraphPlaceId') },
      },
    },
    safegraphPolygon: {
      type: DataTypes.GEOMETRY('POLYGON'),
      allowNull: true,
      validate: {
        notEmpty: { msg: simple('safegraphPolygon') },
      },
    },
  }, {
    paranoid: true,
  });

  return Restaurant;
};
