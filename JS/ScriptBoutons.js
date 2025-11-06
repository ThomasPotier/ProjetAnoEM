import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  // <-- ta config Firebase ici
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function ouvrirDJ() {
    await updateDoc(doc(db, "commande_moteur", "etat"), {
        DJ: "open"
    });
}
