import { Mutation, Query } from './Base.resolver';
import BaseSchema from './Base.schema.graphql';

import Restaurant from './Restaurant/Restaurant.node';
import Sighting from './Sighting/Sighting.node';

const graphNodes = {
  Restaurant,
  Sighting,
};

const internalResolvers = {
  Mutation,
  Query,
};
let internalTypeDefs = [BaseSchema];

// Loop over all the nodes
Object.keys(graphNodes).forEach((modelName) => {
  const currentNode = graphNodes[modelName];

  // Merge new schema
  if (currentNode.typedefs) {
    internalTypeDefs = [
      ...internalTypeDefs,
      ...currentNode.typedefs,
    ];
  }

  // In the resolver map connect current node
  if (currentNode.resolvers.schemaRootName) {
    internalResolvers[currentNode.resolvers.schemaRootName] = currentNode.resolvers.Schema;
  }

  // Consolidate mutation resolvers
  if (currentNode.resolvers.Mutation) {
    internalResolvers.Mutation = {
      ...internalResolvers.Mutation,
      ...currentNode.resolvers.Mutation,
    };
  }

  // Consolidate query resolvers
  if (currentNode.resolvers.Query) {
    internalResolvers.Query = {
      ...internalResolvers.Query,
      ...currentNode.resolvers.Query,
    };
  }
});

export const resolvers = internalResolvers;
export const typeDefs = internalTypeDefs;
