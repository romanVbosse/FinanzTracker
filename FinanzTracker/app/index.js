import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import MonthlyOverviewScreen from '../assets/screens/MonthlyOverview.jsx';
import ExpenseOverviewScreen from '../assets/screens/PieChartScreen.jsx';
import YearlyRecapScreen from '../assets/screens/YearRecapScreen.jsx';
import ExpenseEditScreen from '../assets/screens/EditingOverviewScreen.jsx';
import React from 'react';
import LoginScreen from '../assets/screens/LoginScreen.jsx';

export default function App() {
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
