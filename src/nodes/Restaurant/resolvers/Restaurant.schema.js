export default {
  _id: parent => parent.id,
  city: parent => parent.addressCity,
  state: parent => parent.addressState,
  street: parent => parent.addressStreet,
  zip: parent => parent.addressZip,
  categoryCode: parent => parent.categoryCode,
  categoryName: parent => parent.categoryName,
  name: parent => parent.locationName,
  latitude: parent => parent.locationLatitude,
  longitude: parent => parent.locationLongitude,
  placeId: parent => parent.safegraphPlaceId,
  polygon: parent => parent.safegraphPolygon.coordinates[0].map(
    ([lat, long]) => ({ lat, long }),
  ),
};
