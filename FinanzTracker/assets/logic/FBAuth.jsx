import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, sendPasswordResetEmail, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importiere AsyncStorage
import { FIREBASE_AUTH } from "../../FirebaseConfig"; // Importiere deine Firebase-Konfiguration

// Sign-up (Registrierung) Funktion
export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
    console.log("User registered:", userCredential.user);
    await AsyncStorage.setItem('user', JSON.stringify(userCredential.user)); // Speichere Benutzerinformationen lokal
    return userCredential.user; // Gibt den registrierten Benutzer zurück
  } catch (error) {
    console.error("Error during sign-up:", error.message);
    throw error; // Wirft den Fehler weiter für die Behandlung im Frontend
  }
};

// Sign-in (Anmeldung) Funktion
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    console.log("User signed in:", userCredential.user);
    await AsyncStorage.setItem('user', JSON.stringify(userCredential.user)); // Speichere Benutzerinformationen lokal
    return userCredential.user; // Gibt den angemeldeten Benutzer zurück
  } catch (error) {
    console.error("Error during sign-in:", error.message);
    throw error; // Wirft den Fehler weiter für die Behandlung im Frontend
  }
};

// Password ändern (Signed-in user)
export const changePassword = async (newPassword) => {
  const user = FIREBASE_AUTH.currentUser;

  if (user) {
    try {
      await updatePassword(user, newPassword);
      console.log("Password updated successfully.");
      await AsyncStorage.setItem('user', JSON.stringify(user)); // Aktualisiere Benutzerinformationen lokal
    } catch (error) {
      console.error("Error changing password:", error.message);
      throw error;
    }
  } else {
    throw new Error("No user is logged in.");
  }
};

// Schickt Password zurücksetzen Email
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(FIREBASE_AUTH, email);
    console.log(`Password reset email sent to ${email}.`);
  } catch (error) {
    console.error("Error sending password reset email:", error.message);
    throw error;
  }
};