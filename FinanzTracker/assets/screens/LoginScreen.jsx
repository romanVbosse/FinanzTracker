import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './styles/styles';

const LoginScreen = () => {
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
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Einloggen</Text>
        </TouchableOpacity>
      </View>

      {/* Registration Text */}
      <TouchableOpacity>
        <Text style={styles.registerText}>Noch kein Konto? Jetzt registrieren</Text>
      </TouchableOpacity>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#232323',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   header: {
//     fontSize: 30,
//     color: '#fff',
//     marginBottom: 20,
//   },
//   box: {
//     width: '90%',
//     backgroundColor: '#ececec',
//     borderRadius: 10,
//     padding: 20,
//     alignItems: 'center',
//   },
//   input: {
//     width: '100%',
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 15,
//     fontSize: 16,
//     color: '#333',
//   },
//   loginButton: {
//     backgroundColor: 'blue',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   registerText: {
//     color: '#fff',
//     fontSize: 14,
//     marginTop: 20,
//     textDecorationLine: 'underline',
//   },
// });

export default LoginScreen;
