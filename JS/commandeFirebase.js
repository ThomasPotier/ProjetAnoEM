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

    // Si rien n'est sélectionné, on ne fait rien
    if (value === "") return;

    // Envoi de la valeur à Firebase
    set(ref(db, "pupitre/ICT"), value);
});


//-------------------------------
// 4. Gestion de la tension Ligne
//-------------------------------

// Sliders
const sliderContinue = document.getElementById("tensionContinue");
const sliderMono = document.getElementById("tensionMono");
const sliderEffortmetre = document.getElementById("effortmetre");

// Fonction d'exclusivité
function exclusiviteTension(source) {
    if (source === "continue") {
        if (sliderContinue.value > 0) {
            sliderMono.value = 0;
        }
    } else if (source === "mono") {
        if (sliderMono.value > 0) {
            sliderContinue.value = 0;
        }
    }
}

// --- Sliders : appliquer l'exclusivité en direct ---
sliderContinue.addEventListener("input", () => {
    exclusiviteTension("continue");
});

sliderMono.addEventListener("input", () => {
    exclusiviteTension("mono");
});

// --- Boutons Tension Continue ---
document.querySelector('button[name="UContinuV"]').addEventListener("click", () => {
    sliderContinue.value = 100;
    exclusiviteTension("continue");
});

document.querySelector('button[name="UContinuJ"]').addEventListener("click", () => {
    sliderContinue.value = 50;
    exclusiviteTension("continue");
});

document.querySelector('button[name="UContinuZ"]').addEventListener("click", () => {
    sliderContinue.value = 0;
    // pas besoin d'exclusivité quand c’est 0
});

// --- Boutons Tension Mono ---
document.querySelector('button[name="UMonoV"]').addEventListener("click", () => {
    sliderMono.value = 100;
    exclusiviteTension("mono");
});

document.querySelector('button[name="UMonoJ"]').addEventListener("click", () => {
    sliderMono.value = 50;
    exclusiviteTension("mono");
});

document.querySelector('button[name="UMonoZ"]').addEventListener("click", () => {
    sliderMono.value = 0;
    // pas besoin d'exclusivité quand c’est 0
});

// --- Boutons EffortMEtre ---
document.querySelector('button[name="EffTraction"]').addEventListener("click", () => {
    sliderEffortmetre.value = 100;
});

document.querySelector('button[name="EffZero"]').addEventListener("click", () => {
    sliderEffortmetre.value = 50;
});

document.querySelector('button[name="EffFrein"]').addEventListener("click", () => {
    sliderEffortmetre.value = 2;
    // pas besoin d'exclusivité quand c’est 0
});

// -------------------------------------------------
// 4. Envoi Firebase des jauges Mono / Continue
//     OPTION A : valeur brute
//     OPTION B : seulement au relâchement
// -------------------------------------------------

// --- Fonction d'envoi ---
function envoyerFirebaseTension() {
    // Tension Mono
    set(ref(db, "pupitre/UMono"), Number(sliderMono.value));

    // Tension Continue
    set(ref(db, "pupitre/UContinue"), Number(sliderContinue.value));

    // Effortmètre
    set(ref(db, "pupitre/EffMetre"), Number(sliderEffortmetre.value));
}

// --- RELÂCHEMENT des sliders ---
sliderMono.addEventListener("change", () => {
    exclusiviteTension("mono");
    envoyerFirebaseTension();
});

sliderContinue.addEventListener("change", () => {
    exclusiviteTension("continue");
    envoyerFirebaseTension();
});

sliderEffortmetre.addEventListener("change", () => {
    envoyerFirebaseTension();
});

// --- Boutons Mono ---
document.querySelector('button[name="UMonoV"]').addEventListener("click", () => {
    sliderMono.value = 100;
    exclusiviteTension("mono");
    envoyerFirebaseTension();
});

document.querySelector('button[name="UMonoJ"]').addEventListener("click", () => {
    sliderMono.value = 50;
    exclusiviteTension("mono");
    envoyerFirebaseTension();
});

document.querySelector('button[name="UMonoZ"]').addEventListener("click", () => {
    sliderMono.value = 8;
    exclusiviteTension("mono");
    envoyerFirebaseTension();
});

// --- Boutons Continue ---
document.querySelector('button[name="UContinuV"]').addEventListener("click", () => {
    sliderContinue.value = 100;
    exclusiviteTension("continue");
    envoyerFirebaseTension();
});

document.querySelector('button[name="UContinuJ"]').addEventListener("click", () => {
    sliderContinue.value = 50;
    exclusiviteTension("continue");
    envoyerFirebaseTension();
});

document.querySelector('button[name="UContinuZ"]').addEventListener("click", () => {
    sliderContinue.value = 8;
    exclusiviteTension("continue");
    envoyerFirebaseTension();
});

// --- Boutons EffortMetre ---
document.querySelector('button[name="EffTraction"]').addEventListener("click", () => {
    sliderEffortmetre.value = 100;
    envoyerFirebaseTension();
});

document.querySelector('button[name="EffZero"]').addEventListener("click", () => {
    sliderEffortmetre.value = 50;
    envoyerFirebaseTension();
});

document.querySelector('button[name="EffFrein"]').addEventListener("click", () => {
    sliderEffortmetre.value = 2;
    envoyerFirebaseTension();
});
