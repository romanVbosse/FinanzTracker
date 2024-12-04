import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from '../components/NavBar';

const MonthlyOverviewScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Übersicht</Text>
      <View style={styles.box}>
        <View style={styles.barContainer}>
          <View style={styles.barIncome}></View>
          <Text style={styles.label}>Einnahmen/Monat:</Text>
          <Text style={styles.amount}>1500€</Text>
        </View>
        <View style={styles.barContainer}>
          <View style={styles.barExpense}></View>
          <Text style={styles.label}>Ausgaben/Monat:</Text>
          <Text style={styles.amount}>1200€</Text>
        </View>
        <Text style={styles.divider}></Text>
        <Text style={styles.label}>Differenz:</Text>
        <Text style={styles.difference}>+300€</Text>
      </View>
      <NavBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 20,
  },
  box: {
    width: '80%',
    backgroundColor: '#ececec',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  barContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  barIncome: {
    width: 50,
    height: 100,
    backgroundColor: 'green',
    marginBottom: 10,
  },
  barExpense: {
    width: 50,
    height: 100,
    backgroundColor: 'red',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  amount: {
    fontSize: 16,
    color: '#333',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#333',
    marginVertical: 20,
  },
  difference: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default MonthlyOverviewScreen;
