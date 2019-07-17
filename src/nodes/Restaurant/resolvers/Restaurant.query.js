export default {
  // User specific functions
  restaurants: async (parent, args, context) => {
    const { db } = context;
    const queryObj = { where: {} };
    const data = await db.Restaurant.findAll(queryObj);
    return data;
  },
};
