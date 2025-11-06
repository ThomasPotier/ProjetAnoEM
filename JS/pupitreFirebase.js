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

        // --- Jauge VL(M) ---
        if (key === "VLM") {
            const needle = document.getElementById("needle-mono");

            if (data.VLM === "Z") {
                needle.style.transform = "translateY(80px)";
            }
            else if (data.VLM === "J") {
                needle.style.transform = "translateY(25px)";
            }
            else if (data.VLM === "V") {
                needle.style.transform = "translateY(-60px)";
            }
        }

        // --- Jauge VL(C) ---
        if (key === "VLC") {
            const needle = document.getElementById("needle-continu");

            if (data.VLC === "Z") {
                needle.style.transform = "translateY(80px)";
            }
            else if (data.VLC === "J") {
                needle.style.transform = "translateY(25px)";
            }
            else if (data.VLC === "V") {
                needle.style.transform = "translateY(-60px)";
            }
        }
    });
});
