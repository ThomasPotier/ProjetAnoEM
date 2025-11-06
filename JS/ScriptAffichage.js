import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  // <-- ta config Firebase ici
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// écouter Firestore en temps réel
onSnapshot(doc(db, "commande_moteur", "etat"), (snapshot) => {
    const data = snapshot.data();

    if (data.DJ === "open") {
        document.getElementById("imgDJ").style.display = "block";
    } else {
        document.getElementById("imgDJ").style.display = "none";
    }
});
