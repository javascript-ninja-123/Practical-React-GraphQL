const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const LyricType = require('./lyric_type');
const {addSong} = require('../models/song');
const {fetchLyrics} = require('../models/lyric');

const SongType = new GraphQLObjectType({
  name:  'SongType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    lyrics: {
      type: new GraphQLList(LyricType),
      resolve({id},args) {
        return fetchLyrics(id)
      }
    }
  })
});

module.exports = SongType;
