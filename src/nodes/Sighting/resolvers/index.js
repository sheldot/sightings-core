import sightingtMutationResolvers from './Sighting.mutation';
import sightingtQueryResolvers from './Sighting.query';
import sightingtSchemaResolvers from './Sighting.schema';

export default {
  schemaRootName: 'Sighting',
  Mutation: sightingtMutationResolvers,
  Query: sightingtQueryResolvers,
  Schema: sightingtSchemaResolvers,
};
