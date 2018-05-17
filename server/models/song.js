const firebase = require('../config/firebaseSetup');
const db = firebase.database();
const songRef = db.ref('song');
const {promisify} = require('../util/promise');
const {fetchLyric} = require('./lyric');

const addSong = async (title) => {
  const id = songRef.push().key;
  try{
    await songRef.push({title,id});
    return {
        title,
        id
    }
  }
  catch(err){
    return err
  }
}


const deleteSong = async id => {
  const snap = await songRef.orderByChild('id').equalTo(id).once("child_added");
  await promisify(() => snap.ref.remove());
  return {
    id
  }
}

const fetchSong = async id => {
  const snap = await songRef.orderByChild('id').equalTo(id).once("child_added");
  return snap.val();
}

const fetchSongs = async () => {
  const snap = await songRef.once('value')
  console.log(snap.val())
  return Object.values(snap.val())
}

const fetchSongforLyric = async lyricId => {
  const {songId} = await fetchLyric(lyricId);
  return fetchSong(songId)
}

module.exports = {
  addSong,
  deleteSong,
  fetchSong,
  fetchSongs,
  fetchSongforLyric
}
