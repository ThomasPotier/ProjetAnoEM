// ------------------------
// CONFIGURATION FIREBASE
// ------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDt-8EIGD1cXh5Z5Xwu6mYx6iyJ930sAtA",

  authDomain: "anomalieem-a07d7.firebaseapp.com",

  databaseURL: "https://anomalieem-a07d7-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "anomalieem-a07d7",

  storageBucket: "anomalieem-a07d7.firebasestorage.app",

  messagingSenderId: "999584942159",

  appId: "1:999584942159:web:2a53de5b7a5a89b9a5023a"

};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// -------------------------------------------------
// 1. Récupération automatique de tous les boutons
// -------------------------------------------------

const buttons = document.querySelectorAll(".toggle-btn");

buttons.forEach(btn => {

  btn.classList.remove("on");
  btn.classList.add("off");
  btn.textContent = btn.textContent.replace("ON", "OFF");

    const key = btn.getAttribute("name"); // ex: "LSI", "DJO", "CVS"

    btn.addEventListener("click", async () => {
        const stateRef = ref(db, "pupitre/" + key);

        const snapshot = await get(stateRef);
        const current = snapshot.exists() ? snapshot.val() : false;

        await set(stateRef, !current);   // on inverse la valeur

        // Changement visuel sur le bouton (ON/OFF)
        btn.classList.toggle("off");
        btn.classList.toggle("on");

        // Remplacer le texte OFF → ON ou ON → OFF
        if (!current) {
            btn.textContent = btn.textContent.replace("OFF", "ON");
        } else {
            btn.textContent = btn.textContent.replace("ON", "OFF");
        }
    });
});

// -------------------------------------------------
// 2. Gestion spéciale du champ ICT (sélecteur)
// -------------------------------------------------

const ictButton = document.querySelector('button[name="ICT"]');
const ictSelect = document.getElementById("comptage-select");

ictButton.addEventListener("click", () => {
    const value = ictSelect.value;
    if (value === "") return;

    set(ref(db, "pupitre/ICT"), value);
});
