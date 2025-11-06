import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

/// ✅ CONFIG FIREBASE
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


/// ✅ Fonction générique pour activer/désactiver un voyant
function listenTo(name, elementId) {
  onValue(ref(db, "commande/" + name), (snap) => {
    const v = snap.val() || "";
    const el = document.getElementById(elementId);

    if (!el) return;

    if (v.startsWith("open")) el.style.display = "block";
    if (v.startsWith("close")) el.style.display = "none";
  });
}

/// ✅ DJ
listenTo("DJ", "lsDJ");

/// ✅ Isolement
listenTo("Isolement", "Isolement");

/// ✅ CVS
listenTo("CVS", "CVS");

/// ✅ LSGSusp
listenTo("LSGSusp", "LSGSusp");

/// ✅ AutreCab
listenTo("AutreCab", "AutreCab");


/// ✅ ICT (affichage direct)
onValue(ref(db, "commande/ICT"), snap => {
  const v = snap.val();
  if (v !== null) document.getElementById("ICT").textContent = v;
});
