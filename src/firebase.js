import firebase from 'firebase';
import 'firebase/firestore';

require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyDfPJO8Yl5LEuk8aQeT8THWOHJjI-ZS88k',
  authDomain: 'meeting-chat-2f264.firebaseapp.com',
  databaseURL: 'https://meeting-chat-2f264.firebaseio.com',
  projectId: 'meeting-chat-2f264',
  storageBucket: 'meeting-chat-2f264.appspot.com',
  messagingSenderId: '471512516195',
  appId: '1:471512516195:web:24da584c0509b051749a56',
};
// Initialize Firebase
const firebasee = firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();

// window.db = db;

// db.settings({
//   timestampsInSnapshots: true,
// });

export default firebasee.firestore();
