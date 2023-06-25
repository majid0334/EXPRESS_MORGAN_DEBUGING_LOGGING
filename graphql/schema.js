const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

const learningPathType = require("./types/learning.path-type");

const LearningPathModel = require("./../models/mongodb-models/learning-path-model");

function mapMongoIdToId(obj) {
  obj.id = obj._id;
  delete obj._id;
  return obj;
}

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    learningPaths: {
      type: new GraphQLList(learningPathType),
      resolve: async () => {
        const learningPaths = await LearningPathModel.find();
        learningPaths.forEach(mapMongoIdToId);
        return learningPaths;
      },
    },
    learningPath: {
      type: learningPathType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: async (_, { id }) => {
        const learningPath = await LearningPathModel.findById(id);
        return mapMongoIdToId(learningPath);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query,
});
