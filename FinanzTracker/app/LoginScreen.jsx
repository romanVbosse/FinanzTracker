import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles/styles';
import { createNutzer, getLoggedInNutzer } from '../assets/logic/UserFunctions';
import { useRouter } from "expo-router"

const LoginScreen = () => {
  const navigation = useRouter();
  
  const handlePress = async () => {
    await createNutzer("Test");
    console.log(await getLoggedInNutzer());
    navigation.push("/EditingOverviewScreen");
  };

  return (
    <View style={styles.container}>
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
        />
        
        {/* Password Input */}
        <TextInput 
          style={styles.input}
          placeholder="Passwort"
          placeholderTextColor="#999"
          secureTextEntry
        />

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handlePress}>
          {/* <Link href="./screens/EditingOverviewScreen"> */}
            <Text style={styles.loginButtonText}>Einloggen</Text>
            {/* </Link> */}
        </TouchableOpacity>
        
      </View>

      {/* Registration Text */}
      <TouchableOpacity>
        <Text style={styles.registerText}>Neuen Account erstellen!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
