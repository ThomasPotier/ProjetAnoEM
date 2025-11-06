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

/// ✅ Fonction générique pour envoyer une action
function sendAction(name, value = true) {
  set(ref(db, "commande/" + name), value + "-" + Date.now());
}

/// ✅ Ajout d’un listener sur TOUS les boutons
document.querySelectorAll("button[name]").forEach(btn => {

  btn.addEventListener("click", () => {

    // Cas spécial pour ICT (avec sélecteur)
    if (btn.name === "ICT") {
      const val = document.getElementById("pet-select").value;
      sendAction("ICT", val);
    }

    // Tous les autres boutons
    else {
      sendAction(btn.name);
    }
  });
});
