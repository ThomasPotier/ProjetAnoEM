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


// ✅ Affiche / cache un voyant
function bind(name, id) {
const el = document.getElementById(id);
if (!el) return;
onValue(ref(db, "commande/" + name), snap => {
el.style.display = snap.val() === "on" ? "block" : "none";
});
}


export function initPupitre() {
const anomalies = [
"Isolement", "CVS", "LSGSusp", "AutreCab", "Pat", "DfPortes",
"AutFermDJ", "TBogS", "TBogD", "AlarmeSai", "DfComAut",
"DfFrein", "DfDessFrein", "SableAut", "UrgVA", "UrgRS",
"UrgKVB", "LSI"
];


anomalies.forEach(name => bind(name, name));


// ✅ ICT
onValue(ref(db, "commande/ICT"), snap => {
const v = snap.val();
const el = document.getElementById("ICT");
if (el && v !== null) el.textContent = v;
});
}
