import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import NavBar from '../components/NavBar';

const screenWidth = Dimensions.get('window').width;

const ExpenseOverviewScreen = () => {
  // Data for the donut chart
  const data = [
    { name: 'Auto', amount: 500, color: 'purple', legendFontColor: '#333', legendFontSize: 15 },
    { name: 'Benzin', amount: 200, color: 'cyan', legendFontColor: '#333', legendFontSize: 15 },
    { name: 'Versicherung', amount: 100, color: 'magenta', legendFontColor: '#333', legendFontSize: 15 },
    { name: 'Diverses', amount: 200, color: 'red', legendFontColor: '#333', legendFontSize: 15 },
    { name: 'Miete', amount: 400, color: 'yellow', legendFontColor: '#333', legendFontSize: 15 },
    { name: 'Essen', amount: 300, color: 'blue', legendFontColor: '#333', legendFontSize: 15 },
    { name: 'Freizeit', amount: 200, color: 'pink', legendFontColor: '#333', legendFontSize: 15 },
    { name: 'Kleidung', amount: 100, color: 'red', legendFontColor: '#333', legendFontSize: 15 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ausgaben</Text>

      {/* Upper Box with the Pie Chart */}
      <View style={styles.box}>
        <PieChart
          data={data}
          width={screenWidth * 0.8}
          height={200}
          chartConfig={{
            backgroundColor: '#ececec',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          hasLegend={false}
        />
        <Text style={styles.chartText}>1500€/Monat</Text>
      </View>

      {/* Lower Box with the Expense List */}
      <View style={styles.expenseBox}>
        <View style={styles.expenseItem}>
          <Text style={[styles.expenseColor, { backgroundColor: 'purple' }]}></Text>
          <Text style={styles.expenseText}>500€ Auto</Text>
        </View>
        <View style={styles.expenseItem}>
          <Text style={[styles.expenseColor, { backgroundColor: 'cyan' }]}></Text>
          <Text style={styles.expenseText}>200€ Benzin</Text>
        </View>
        <View style={styles.expenseItem}>
          <Text style={[styles.expenseColor, { backgroundColor: 'magenta' }]}></Text>
          <Text style={styles.expenseText}>100€ Versicherung</Text>
        </View>
        <View style={styles.expenseItem}>
          <Text style={[styles.expenseColor, { backgroundColor: 'red' }]}></Text>
          <Text style={styles.expenseText}>200€ Diverses</Text>
        </View>
        <View style={styles.expenseItem}>
          <Text style={[styles.expenseColor, { backgroundColor: 'yellow' }]}></Text>
          <Text style={styles.expenseText}>400€ Miete</Text>
        </View>
        <View style={styles.expenseItem}>
          <Text style={[styles.expenseColor, { backgroundColor: 'blue' }]}></Text>
          <Text style={styles.expenseText}>300€ Essen</Text>
        </View>
        <View style={styles.expenseItem}>
          <Text style={[styles.expenseColor, { backgroundColor: 'pink' }]}></Text>
          <Text style={styles.expenseText}>200€ Freizeit</Text>
        </View>
        <View style={styles.expenseItem}>
          <Text style={[styles.expenseColor, { backgroundColor: 'red' }]}></Text>
          <Text style={styles.expenseText}>100€ Kleidung</Text>
        </View>
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
    paddingTop: 50,
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
    marginBottom: 20,
  },
  chartText: {
    fontSize: 20,
    color: '#333',
    marginTop: 10,
  },
  expenseBox: {
    width: '80%',
    backgroundColor: '#ececec',
    borderRadius: 10,
    padding: 20,
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  expenseColor: {
    width: 15,
    height: 15,
    marginRight: 10,
    borderRadius: 3,
  },
  expenseText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ExpenseOverviewScreen;
