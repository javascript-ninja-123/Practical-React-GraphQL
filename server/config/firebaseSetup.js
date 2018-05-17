const firebase = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://graphql-bcc75.firebaseio.com"
});


module.exports = firebase;
