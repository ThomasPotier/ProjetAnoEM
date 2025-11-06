// ------------------------
// CONFIGURATION FIREBASE
// ------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "...",
    authDomain: "...",
    databaseURL: "...",
    projectId: "...",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// -------------------------------------------------
// 1. Récupération automatique de tous les boutons
// -------------------------------------------------

const buttons = document.querySelectorAll(".toggle-btn");

buttons.forEach(btn => {
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
