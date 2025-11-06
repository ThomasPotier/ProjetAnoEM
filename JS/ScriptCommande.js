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
document.querySelector('button[name="Isolement"]').onclick = () => sendOpen("Isolement");
document.querySelector('button[name="IsolementOFF"]').onclick = () => sendClose("Isolement");


/// ✅ CVS
document.querySelector('button[name="CVS"]').onclick = () => sendOpen("CVS");
document.querySelector('button[name="CVSOFF"]').onclick = () => sendClose("CVS");


/// ✅ LSGSusp
document.querySelector('button[name="LSGSusp"]').onclick = () => sendOpen("LSGSusp");
document.querySelector('button[name="LSGSuspOFF"]').onclick = () => sendClose("LSGSusp");


/// ✅ AutreCab
document.querySelector('button[name="AutreCab"]').onclick = () => sendOpen("AutreCab");
document.querySelector('button[name="AutreCabOFF"]').onclick = () => sendClose("AutreCab");


/// ✅ ICT (cas particulier)
document.querySelector('button[name="ICT"]').onclick = () => {
  const val = document.getElementById("pet-select").value;
  set(ref(db, "commande/ICT"), val);
};
