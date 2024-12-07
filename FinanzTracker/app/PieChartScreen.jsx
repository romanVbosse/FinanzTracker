import React from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import NavBar from './NavBar';
import styles from './styles/styles';

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

export default ExpenseOverviewScreen;
