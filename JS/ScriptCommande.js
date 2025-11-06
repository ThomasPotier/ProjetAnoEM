import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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


/// ✅ Fonction générique comme DJ : open/close
function sendOpen(name) {
  set(ref(db, "commande/" + name), "open-" + Date.now());
}

function sendClose(name) {
  set(ref(db, "commande/" + name), "close-" + Date.now());
}

/// ✅ BOUTONS DJ
document.querySelector('button[name="DJO"]').onclick = () => sendOpen("DJ");
document.querySelector('button[name="DJF"]').onclick = () => sendClose("DJ");


/// ✅ ISOLEMENT
document.querySelector('button[name="Isolement_ON"]').onclick = () => sendOpen("Isolement");
document.querySelector('button[name="Isolement_OFF"]').onclick = () => sendClose("Isolement");


/// ✅ CVS
document.querySelector('button[name="CVS_ON"]').onclick = () => sendOpen("CVS");
document.querySelector('button[name="CVS_OFF"]').onclick = () => sendClose("CVS");


/// ✅ LSGSusp
document.querySelector('button[name="LSGSusp_ON"]').onclick = () => sendOpen("LSGSusp");
document.querySelector('button[name="LSGSusp_OFF"]').onclick = () => sendClose("LSGSusp");


/// ✅ AutreCab
document.querySelector('button[name="AutreCab_ON"]').onclick = () => sendOpen("AutreCab");
document.querySelector('button[name="AutreCab_OFF"]').onclick = () => sendClose("AutreCab");


/// ✅ ICT (cas particulier)
document.querySelector('button[name="ICT"]').onclick = () => {
  const val = document.getElementById("pet-select").value;
  set(ref(db, "commande/ICT"), val);
};
