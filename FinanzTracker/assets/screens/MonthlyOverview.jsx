import React from 'react';
import { View, Text } from 'react-native';
import NavBar from '../components/NavBar';
import styles from './styles/styles';

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

export default MonthlyOverviewScreen;
