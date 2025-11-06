import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


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


// ✅ Met à jour style + texte
function applyState(btn, value) {
if (value === "on") {
btn.classList.remove("off");
btn.classList.add("on");
btn.textContent = btn.dataset.label + " ON";
} else {
btn.classList.remove("on");
btn.classList.add("off");
btn.textContent = btn.dataset.label + " OFF";
}
}


// ✅ Toggle ON/OFF
␌
unction toggle(btn) {
const name = btn.name;
const next = btn.classList.contains("on") ? "off" : "on";
set(ref(db, "commande/" + name), next);
}


// ✅ Rendre tous les boutons ON/OFF
export function initCommande() {
document.querySelectorAll("button[name]").forEach(btn => {
if (btn.name === "ICT") return; // ICT est traité à part


btn.dataset.label = btn.textContent.replace("ON", "").replace("OFF", "").trim();


btn.classList.add("toggle-btn", "off");
btn.textContent = btn.dataset.label + " OFF";


btn.addEventListener("click", () => toggle(btn));


onValue(ref(db, "commande/" + btn.name), snap => {
applyState(btn, snap.val() || "off");
});
});


// ✅ ICT
const ictBtn = document.querySelector('button[name="ICT"]');
if (ictBtn) {
ictBtn.addEventListener("click", () => {
const val = document.getElementById("pet-select").value;
set(ref(db, "commande/ICT"), val);
});
}
}
