import sightingMutationResolvers from './Sighting.mutation';
import sightingQueryResolvers from './Sighting.query';
import sightingSchemaResolvers from './Sighting.schema';

export default {
  schemaRootName: 'Sighting',
  Mutation: sightingMutationResolvers,
  Query: sightingQueryResolvers,
  Schema: sightingSchemaResolvers,
};
