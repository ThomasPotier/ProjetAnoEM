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


function bind(name, id) {
const el = document.getElementById(id);
if (!el) return;
onValue(ref(db, "commande/" + name), snap => {
const v = snap.val();
el.style.display = v === "on" ? "block" : "none";
});
}


bind("Isolement", "Isolement");
bind("CVS", "CVS");
bind("LSGSusp", "LSGSusp");
bind("AutreCab", "AutreCab");
bind("Pat", "Pat");
bind("DfPortes", "DfPortes");
bind("AutFermDJ", "AutFermDJ");
bind("TBogS", "TBogS");
bind("TBogD", "TBogD");
bind("AlarmeSai", "AlarmeSai");
bind("DfComAut", "DfComAut");
bind("DfFrein", "DfFrein");
bind("DfDessFrein", "DfDessFrein");
bind("SableAut", "SableAut");
bind("UrgVA", "UrgVA");
bind("UrgRS", "UrgRS");
bind("UrgKVB", "UrgKVB");
bind("LSI", "LSI");


// ICT
onValue(ref(db, "commande/ICT"), snap => {
const v = snap.val();
const el = document.getElementById("ICT");
if (el && v !== null) el.textContent = v;
});
