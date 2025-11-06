import { onSnapshot, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./JS/ImportFirebase.js";

onSnapshot(doc(db, "commande_moteur", "etat"), (snapshot) => {
    const data = snapshot.data();

    if (data.DJ === "open") {
        document.getElementById("imgDJ").style.display = "block";
    } else {
        document.getElementById("imgDJ").style.display = "none";
    }
});
