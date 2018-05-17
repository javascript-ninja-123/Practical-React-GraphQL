const firebase = require('../config/firebaseSetup');
const db = firebase.database();
const lyricRef = db.ref('lyric');
const {promisify} = require('../util/promise');


const addLyric = async (content,songId) => {
  const id = lyricRef.push().key;

  await lyricRef.push({
    content,
    songId,
    likes:0,
    id
  })
  return {
    content,
    songId,
    likes:0,
    id
  }
}


const addLike = async (id) => {
  const snap = await lyricRef.orderByChild('id').equalTo(id).once("child_added")
  const newLikes = parseInt(snap.val().likes) + 1;
  await promisify(() => snap.ref.update({likes:newLikes}))
  return {
    likes:newLikes
  }
}

const fetchLyric = async id => {
  const snap = await lyricRef.orderByChild('id').equalTo(id).once("child_added")
  return snap.val()
}

const fetchLyrics = async songId => {
  const snap = await lyricRef.orderByChild('songId').equalTo(songId).once('value')
  if(Object.keys(snap.val()).length > 1){
    return Object.values(snap.val())
  }
  return [snap.val()];
}

const deleteLyric = async songId => {
  const snap = await lyricRef.orderByChild('songId').equalTo(songId).once('value')
  snap.ref.remove();
}

module.exports = {
  addLyric,
  addLike,
  fetchLyrics,
  fetchLyric,
  deleteLyric
}
