const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = require('graphql');
const {fetchSongforLyric} = require('../models/song');

const LyricType = new GraphQLObjectType({
  name:  'LyricType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    song: {
      type: require('./song_type'),
      async resolve({id},args) {
        return await fetchSongforLyric(id)
      }
    }
  })
});

module.exports = LyricType;
