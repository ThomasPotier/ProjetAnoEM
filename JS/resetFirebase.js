import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

// ----------------------------------------
// RESET COMPLET DU PUPITRE A CHAQUE CHARGEMENT
// ----------------------------------------

const defaultState = {
    DJO: false,
    Isolement: false,
    CVS: false,
    LSGSusp: false,
    AutreCab: false,
    Pat: false,
    DfPortes: false,
    AutFermDJ: false,
    TBogS: false,
    TBogD: false,
    AlarmeSai: false,
    DfComAut: false,
    DfFrein: false,
    DfDessFrein: false,
    SableAut: false,
    UrgVA: false,
    UrgRS: false,
    UrgKVB: false,
    LSI: false,
    ICT: ""      // affichage vide pour le compteur
};

// Remise à zéro du nœud pupitre
set(ref(db, "pupitre"), defaultState);
