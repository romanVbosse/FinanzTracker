import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "./styles/styles";
import {
  createNutzer,
  createTestNutzer,
  getLoggedInNutzer,
} from "../assets/logic/UserFunctions";
import { signInWithEmail, signUpWithEmail } from "../assets/logic/FBAuth";
import { useRouter } from "expo-router";
import { getDataFB } from "../assets/logic/Firebase";
import { saveData } from "../assets/logic/TemporarySerialization";

const LoginScreen = () => {
  const navigation = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(true);

  const handlePress = async () => {
    await createTestNutzer();
    console.log(await getLoggedInNutzer());
    navigation.push("/PieChartScreen");
  };

  // Handle Login
  const handleLogin = async () => {
    try {
      const user = await signInWithEmail(email, password);
      await saveData("loggedInUser", email);
      console.log("Logged in user:", user);
      Alert.alert("Erfolg", "Sie sind eingeloggt!");

      // Hole die Daten aus Firebase
      const userData = await getDataFB(email, email);
      if (userData) {
        // Speichere die Daten in AsyncStorage
        await saveData(email, userData);
      }

      navigation.push("/PieChartScreen"); // Navigiere zur nächsten Seite
    } catch (error) {
      console.error("Error logging in:", error.message);
      Alert.alert("Fehler", error.message);
    }
  };

  // Handle Sign-Up
  const handleSignUp = async () => {
    try {
      const user = await signUpWithEmail(email, password);
      await createNutzer(email);
      console.log("Registered user:", user);
      Alert.alert("Erfolg", "Ihr Account wurde erstellt!");
      navigation.push("/PieChartScreen"); // Navigiere zur nächsten Seite
    } catch (error) {
      console.error("Error signing up:", error.message);
      Alert.alert("Fehler", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {loggingIn ? (
        <View>
          {/* Header */}
          <Text style={styles.header}>Login</Text>

          {/* Input Box */}
          <View style={styles.box}>
            {/* Email Input */}
            <TextInput
              style={styles.input}
              placeholder="E-Mail"
              placeholderTextColor="#999"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            {/* Password Input */}
            <TextInput
              style={styles.input}
              placeholder="Passwort"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Einloggen</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handlePress}>
              <Text style={styles.loginButtonText}>Test-Account</Text>
            </TouchableOpacity>
          </View>

          {/* Registration Text */}
          <TouchableOpacity onPress={() => {setLoggingIn(false);console.log("Logging in: ", loggingIn)}}>
            <Text style={styles.registerText}>Neuen Account erstellen!</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          {/* Header */}
          <Text style={styles.header}>Registrieren</Text>

          {/* Input Box */}
          <View style={styles.box}>
            {/* Email Input */}
            <TextInput
              style={styles.input}
              placeholder="E-Mail"
              placeholderTextColor="#999"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            {/* Password Input */}
            <TextInput
              style={styles.input}
              placeholder="Passwort"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            {/* Sign-Up Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
              <Text style={styles.loginButtonText}>Registrieren</Text>
            </TouchableOpacity>
          </View>

          {/* Back to Login Text */}
          <TouchableOpacity onPress={() => setLoggingIn(true)}>
            <Text style={styles.registerText}>Zurück zum Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default LoginScreen;
