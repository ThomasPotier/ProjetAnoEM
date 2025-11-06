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

// ✅ Fonction générique : ON → affiche, OFF → cache
function connect(name, id) {
  const el = document.getElementById(id);

  onValue(ref(db, "commande/" + name), snap => {
    const v = snap.val();
    if (v === "on") el.style.display = "block";
    else el.style.display = "none";
  });
}

// ✅ Connexions pupitre
connect("Isolement", "Isolement");
connect("CVS", "CVS");
connect("LSGSusp", "LSGSusp");
connect("AutreCab", "AutreCab");
connect("Pat", "Pat");
connect("DfPortes", "DfPortes");
connect("AutFermDJ", "AutFermDJ");
connect("TBogS", "TBogS");
connect("TBogD", "TBogD");
connect("AlarmeSai", "AlarmeSai");
connect("DfComAut", "DfComAut");
connect("DfFrein", "DfFrein");
connect("DfDessFrein", "DfDessFrein");
connect("SableAut", "SableAut");
connect("UrgVA", "UrgVA");
connect("UrgRS", "UrgRS");
connect("UrgKVB", "UrgKVB");
connect("LSI", "LSI");
