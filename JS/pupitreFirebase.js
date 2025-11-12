import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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
// Association directe CLE Firebase → ID du pupitre
// -------------------------------------------------
const map = {
    DJO: "lsDJ",
    Isolement: "Isolement",
    CVS: "CVS",
    LSGSusp: "LSGSusp",
    AutreCab: "AutreCab",
    Pat: "Patinage",      // mettre l'id si tu veux le contrôler
    DfPortes: "DfPortes",
    AutFermDJ: "AutFermDJ",
    TBogS: "TBogS",
    TBogD: "TBogD",
    AlarmeSai: "AlarmeSai",
    DfComAut: "DfComAut",
    DfFrein: "DfFrein",
    DfDessFrein: "DfDessFrein",
    SableAut: "SableAut",
    UrgVA: "UrgVA",
    UrgRS: "UrgRS",
    UrgKVB: "UrgKVB",
    LSI: "LSI",
    ICT: "ict-value"
};

// -------------------------------------------------
// Observer le nœud complet "pupitre"
// -------------------------------------------------
onValue(ref(db, "pupitre"), (snapshot) => {
    const data = snapshot.val() || {};

    Object.keys(map).forEach(key => {
        const elementId = map[key];
        const el = document.getElementById(elementId);

        if (!el) return;

        if (key === "ICT") {
            el.textContent = data.ICT ?? "";
            return;
        }

        el.style.display = data[key] ? "block" : "none";

        if (["UrgVA", "UrgRS", "UrgKVB"].includes(key)) {
            const parentDiv = el.parentElement;   // div20, div21 ou div22

            if (data[key]) {
                parentDiv.style.backgroundColor = "#e8461e";
            } else {
                parentDiv.style.backgroundColor = "transparent"; // ou "", selon ton CSS
            }
        }

    });

//**************************
//Gestion de l'iv
//***************************

// Fonction pour convertir vitesse → angle (exemple : 0 km/h → 0°, 160 km/h → 180°)
function vitesseToAngle(vitesse) {
    const minAngle = 71;    // angle mini
    const maxAngle = 180;  // angle maxi
    const maxVitesse = 160; // valeur max du slider
    return minAngle + (vitesse / maxVitesse) * (maxAngle - minAngle);
}

// Observer la valeur vitesse
onValue(ref(db, "pupitre/vitesse"), (snapshot) => {
    const vitesse = snapshot.val() || 0;
    const angle = vitesseToAngle(vitesse);

    const needle = document.getElementById("needle");
    if (needle) {
        needle.style.transform = `rotate(${angle}deg)`;
    }
});




    //Gestion de la tension Ligne

    if (data.UMono !== undefined) {
      const jaugeMono = document.getElementById("jaugeMono");
      jaugeMono.style.height = (0 + data.UMono) + "%";
    }

    if (data.UContinue !== undefined) {
      const jaugeContinue = document.getElementById("jaugeContinue");
      jaugeContinue.style.height = (0 + data.UContinue) + "%";
    }

    if (data.EffMetre !== undefined) {
      const jaugeEffort = document.getElementById("jaugeEffort");
      jaugeEffort.style.height = (0 + data.EffMetre) + "%";
    }

});
