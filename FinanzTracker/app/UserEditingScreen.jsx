import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, SafeAreaView } from "react-native";
import NavBar from "./NavBar";
import styles from "./styles/styles";
import {
  getLoggedInNutzer,
  getNutzerByName,
} from "../assets/logic/UserFunctions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { changePassword } from "../assets/logic/FBAuth";
import { FIREBASE_AUTH } from "../FirebaseConfig";

const UserEditingScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const navigation = useRouter();

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = FIREBASE_AUTH.currentUser;
    if(user){
    if (password === confirmPassword && password !== '') {
      changePassword(password);
      alert('Password changed successfully');
    } else {
      alert('Passwords do not match or are empty');
    }
  }
  };

  const handleLogout = () => {
    navigation.push("/LoginScreen");
    clearAsyncStorage();
    alert('Logged out successfully');
  };

  
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>User Overview</Text>
        <Text> {getLoggedInNutzer()} </Text>
        <View>
          <Text>New Password:</Text>
          <TextInput secureTextEntry value={password} onChangeText={handlePasswordChange} />
        </View>
        <View>
          <Text>Confirm Password:</Text>
          <TextInput secureTextEntry value={confirmPassword} onChangeText={handleConfirmPasswordChange} />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Password ändern</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogout}>
          <Text style={styles.loginButtonText}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <NavBar />
    </View>
  );
};

export default UserEditingScreen;