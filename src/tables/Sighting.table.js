import { simple } from 'src/util/validator.util';

export default (sequelize, DataTypes) => {
  const Sighting = sequelize.define('sightings', {
    // General
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    // Attributes
    addressType: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: simple('addressType') },
      },
    },
    locationCoords: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: true,
      validate: {
        notEmpty: { msg: simple('locationCoords') },
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
    locationType: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: simple('locationType') },
      },
    },

    incidentAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: simple('incidentAddress') },
      },
    },
    incidentBorough: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: simple('incidentBorough') },
      },
    },
    incidentCity: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: simple('incidentCity') },
      },
    },
    incidentStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: simple('incidentStatus') },
      },
    },
    incidentZip: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: simple('incidentZip') },
      },
    },

    sightingId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: simple('sightingId') },
      },
    },
    sightingClosedDate: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        notEmpty: { msg: simple('sightingClosedDate') },
      },
    },
    sightingCreatedDate: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        notEmpty: { msg: simple('sightingCreatedDate') },
      },
    },
    sightingDueDate: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        notEmpty: { msg: simple('sightingDueDate') },
      },
    },
  }, {
    paranoid: true,
  });

  return Sighting;
};
