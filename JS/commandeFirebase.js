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

// ✅ Met à jour le style et le texte du bouton
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

// ✅ Active/désactive une anomalie
function toggle(btn) {
  const name = btn.name;
  const isOn = btn.classList.contains("on");
  const newState = isOn ? "off" : "on";

  set(ref(db, "commande/" + name), newState);
}

// ✅ Rendre tous les boutons ON/OFF
document.querySelectorAll("button[name]").forEach(btn => {

  // Garde le label original
  btn.dataset.label = btn.textContent.replace("ON", "").replace("OFF", "").trim();

  btn.classList.add("toggle-btn", "off");
  btn.textContent = btn.dataset.label + " OFF";

  // Clique = toggle
  btn.addEventListener("click", () => toggle(btn));

  // ✅ Synchronisation en temps réel
  onValue(ref(db, "commande/" + btn.name), snap => {
    const val = snap.val() || "off";
    applyState(btn, val);
  });
});
