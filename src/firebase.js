import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDn7gQLQDeCgzOBQBOItGk2clovn4v71cE",
    authDomain: "discord-clone-578fd.firebaseapp.com",
    databaseURL: "https://discord-clone-578fd.firebaseio.com",
    projectId: "discord-clone-578fd",
    storageBucket: "discord-clone-578fd.appspot.com",
    messagingSenderId: "347704924154",
    appId: "1:347704924154:web:d608c57a64859efbfdf643",
    measurementId: "G-YZH79HSCXX"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;