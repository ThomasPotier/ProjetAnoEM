import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "...",
    authDomain: "...",
    databaseURL: "...",
    projectId: "...",
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
    });
});
