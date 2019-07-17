export default {
  // User specific functions
  createSighting: async (parent, args, context) => {
    const { db } = context;
    const {
      addressType,
      borough,
      city,
      closedDate,
      coordLat,
      coordLong,
      createdDate,
      dueDate,
      latitude,
      locationType,
      longitude,
      sightingId,
      status,
      street,
      zip,
    } = args;

    const sightingData = {
      sightingId,
      sightingDueDate: dueDate,
    };

    if (addressType) sightingData.addressType = addressType;
    if (borough) sightingData.incidentBorough = borough;
    if (city) sightingData.incidentCity = city;
    if (closedDate) sightingData.sightingClosedDate = closedDate;
    if (createdDate) sightingData.sightingCreatedDate = createdDate;
    if (latitude) sightingData.locationLatitude = latitude;
    if (locationType) sightingData.locationType = locationType;
    if (longitude) sightingData.locationLongitude = longitude;
    if (status) sightingData.incidentStatus = status;
    if (street) sightingData.incidentAddress = street;
    if (zip) sightingData.incidentZip = zip;

    if ((coordLat !== null)
      && (coordLat !== undefined)
      && (coordLong !== null)
      && (coordLong !== undefined)
    ) {
      sightingData.locationCoords = {
        type: 'Point',
        coordinates: [
          coordLat,
          coordLong,
        ],
      };
    }

    const data = await db.Sighting.create(sightingData);
    return data;
  },
};
