import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import LoginScreen from './LoginScreen.jsx';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const navigation = useRouter();

  useEffect(() => {
    const clearAsyncStorage = async () => {
      try {
        await AsyncStorage.clear();
        console.log('AsyncStorage cleared');
      } catch (error) {
        console.error('Error clearing AsyncStorage:', error);
      }
    };

    clearAsyncStorage();
  }, []);

  return (
    <View style={styles.container}>
      <LoginScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
