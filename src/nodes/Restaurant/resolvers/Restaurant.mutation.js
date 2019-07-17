export default {
  // User specific functions
  createRestaurant: async (parent, args, context) => {
    const { db } = context;
    const {
      categoryCode,
      categoryName,
      city,
      latitude,
      longitude,
      name,
      placeId,
      polygonLats,
      polygonLongs,
      state,
      street,
      zip,
    } = args;

    const restaurantData = {
      categoryCode,
      categoryName,
      locationName: name,
      safegraphPlaceId: placeId,
    };

    if (city) restaurantData.addressCity = city;
    if (latitude) restaurantData.locationLatitude = latitude;
    if (longitude) restaurantData.locationLongitude = longitude;
    if (state) restaurantData.addressState = state;
    if (street) restaurantData.addressStreet = street;
    if (zip) restaurantData.addressZip = zip;

    if (polygonLats.length === polygonLongs.length) {
      const coordinates = [
        polygonLats.map((currentLat, index) => ([currentLat, polygonLongs[index]])),
      ];
      restaurantData.safegraphPolygon = {
        type: 'Polygon',
        coordinates,
      };
    }

    const data = await db.Restaurant.create(restaurantData);
    return data;
  },
};
