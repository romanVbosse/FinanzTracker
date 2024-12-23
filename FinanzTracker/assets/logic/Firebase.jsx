import { FIRESTORE_DB } from "../../FirebaseConfig";
import { collection, setDoc, getDoc, deleteDoc, doc } from 'firebase/firestore';

// Save data
const saveDataFB = async (collectionName, docId, value) => {
    try {
        const docRef = doc(FIRESTORE_DB, collectionName, docId); // Referenz auf ein Dokument
        await setDoc(docRef, value); // Daten speichern
        console.log(`Data saved to collection '${collectionName}', document '${docId}'.`);
    } catch (error) {
        console.error("Error saving data:", error);
    }
};

// Retrieve data
const getDataFB = async (collectionName, docId) => {
    try {
        const docRef = doc(FIRESTORE_DB, collectionName, docId); // Referenz auf ein Dokument
        const docSnap = await getDoc(docRef); // Daten abrufen
        if (docSnap.exists()) {
          return docSnap.data(); // Gibt die gespeicherten Daten zurück
        } else {
          console.log(`No document found in collection '${collectionName}', document '${docId}'.`);
          return null;
        }
    } catch (error) {
        console.error("Error retrieving data:", error);
        return null;
    }
};

// Delete data
const deleteDataFB = async (collectionName, docId) => {
    try {
        const docRef = doc(FIRESTORE_DB, collectionName, docId); // Referenz auf ein Dokument
        await deleteDoc(docRef); // Dokument löschen
        console.log(`Document '${docId}' deleted from collection '${collectionName}'.`);
    } catch (error) {
        console.error("Error deleting data:", error);
    }
};

export { deleteDataFB, saveDataFB, getDataFB };