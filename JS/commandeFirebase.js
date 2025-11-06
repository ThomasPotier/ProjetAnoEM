import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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


/// ✅ Fonction ON/OFF générique
async function toggleAction(name) {

  const r = ref(db, "commande/" + name);
  const snap = await get(r);
  const current = snap.exists() ? snap.val() : "off";

  const next = current === "on" ? "off" : "on";

  await set(r, next);

  console.log(name, "→", next);
}

/// ✅ Quand un bouton est cliqué → toggle
document.querySelectorAll("button[name]").forEach(btn => {

  btn.addEventListener("click", () => {

    if (btn.name === "ICT") {
      // ICT = valeur spéciale (pas ON/OFF)
      const val = document.getElementById("pet-select").value;
      set(ref(db, "commande/ICT"), val);
    }

    else {
      toggleAction(btn.name);
    }
  });
});
