import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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

const djImg = document.getElementById("lsDJ");

// Écoute de l'ordre DJ (open/close avec horodatage)
onValue(ref(db, "commande/DJ"), (snap) => {
  const v = (snap.val() || "").toString();
  if (v.startsWith("open")) {
    djImg.style.display = "block";   // équivalent de "display: active" (qui n'existe pas)
  } else if (v.startsWith("close")) {
    djImg.style.display = "none";
  }
});
