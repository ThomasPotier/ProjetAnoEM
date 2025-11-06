  // Import the functions you need from the SDKs you need

  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use

  // https://firebase.google.com/docs/web/setup#available-libraries


  // Your web app's Firebase configuration

  const firebaseConfig = {

    apiKey: "AIzaSyDt-8EIGD1cXh5Z5Xwu6mYx6iyJ930sAtA",

    authDomain: "anomalieem-a07d7.firebaseapp.com",

    projectId: "anomalieem-a07d7",

    storageBucket: "anomalieem-a07d7.firebasestorage.app",

    messagingSenderId: "999584942159",

    appId: "1:999584942159:web:2a53de5b7a5a89b9a5023a"

  };


  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // rendre le Firestore utilisable dans ScriptBoutons.js
  window.db = db;
  window.doc = doc;
  window.updateDoc = updateDoc;
  window.onSnapshot = onSnapshot;
