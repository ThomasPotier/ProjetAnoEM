import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDt-8EIGD1cXh5Z5Xwu6mYx6iyJ930sAtA",
  authDomain: "anomalieem-a07d7.firebaseapp.com",
  databaseURL: "https://anomalieem-a07d7-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "anomalieem-a07d7",
  storageBucket: "anomalieem-a07d7.firebasestorage.app",
  messagingSenderId: "999584942159",
  appId: "1:999584942159:web:2a53de5b7a5a89b9a5023a"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const btnOpen = document.querySelector('button[name="DJO"]');  // Ouverture DJ
const btnClose = document.querySelector('button[name="DJF"]'); // Fermeture DJ

btnOpen.addEventListener("click", () => {
  set(ref(db, "commande/DJ"), "open-" + Date.now());
});

btnClose.addEventListener("click", () => {
  set(ref(db, "commande/DJ"), "close-" + Date.now());
});
