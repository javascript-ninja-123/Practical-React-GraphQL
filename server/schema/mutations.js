const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const {addSong,deleteSong} = require('../models/song');
const {addLyric, addLike} = require('../models/lyric');
const SongType = require('./song_type');
const LyricType = require('./lyric_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSong: {
      type: SongType,
      args: {
        title: { type: GraphQLString }
      },
      resolve(parentValue, { title }) {
        return addSong(title);
      }
    },
    addLyricToSong: {
      type: LyricType,
      args: {
        content: { type: GraphQLString },
        songId: { type: GraphQLID }
      },
      resolve(parentValue, { content, songId }) {
        return addLyric(content,songId);
      }
    },
    likeLyric: {
      type: LyricType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return addLike(id);
      }
    },
    deleteSong: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return deleteSong(id);
      }
    }
  }
});

module.exports = mutation;
