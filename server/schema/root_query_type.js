const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const SongType = require('./song_type');
const LyricType = require('./lyric_type');
const {fetchSong,fetchSongs} = require('../models/song')
const {fetchLyric} = require('../models/lyric');


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    songs: {
      type: new GraphQLList(SongType),
      resolve() {
        return fetchSongs();
      }
    },
    song: {
      type: SongType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return fetchSong(id);
      }
    },
    lyric: {
      type: LyricType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { id }) {
      return fetchLyric(id);
      }
    }
  })
});

module.exports = RootQuery;
