import restaurantMutationResolvers from './Restaurant.mutation';
import restaurantQueryResolvers from './Restaurant.query';
import restaurantSchemaResolvers from './Restaurant.schema';

export default {
  schemaRootName: 'Restaurant',
  Mutation: restaurantMutationResolvers,
  Query: restaurantQueryResolvers,
  Schema: restaurantSchemaResolvers,
};
