export default {
  // User specific functions
  sightings: async (parent, args, context) => {
    const { db } = context;
    const queryObj = { where: {} };
    const data = await db.Sighting.findAll(queryObj);
    return data;
  },
};
