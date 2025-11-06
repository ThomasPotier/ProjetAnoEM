onValue(ref(db, "commande/DJO"), (snapshot) => {
const val = snapshot.val();
const el = document.getElementById("lsDJ");
if (val) {
el.style.display = "block";
}
});


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


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


// ✅ Fonction pour envoyer une action
function sendAction(name, value = true) {
set(ref(db, "commande/" + name), value);
}


// ✅ Associer tous les boutons automatiquement
const buttons = document.querySelectorAll("button[name]");
buttons.forEach(btn => {
btn.addEventListener("click", () => {
if (btn.name === "ICT") {
const val = document.getElementById("pet-select").value;
sendAction("ICT", val);
} else {
sendAction(btn.name);
}
});
});
