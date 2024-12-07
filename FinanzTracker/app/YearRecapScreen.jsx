import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import NavBar from './NavBar';
import styles from './styles/styles';

const screenWidth = Dimensions.get('window').width;

const YearlyRecapScreen = () => {
  // Bar chart data for monthly expenses and income
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [5000, 4200, 4500, 4800, 4700, 4900, 4600, 4400, 4600, 4700, 4800, 4500],
        color: () => '#76C042', // green color for income
        label: 'Einkommen',
      },
      {
        data: [3000, 2800, 3100, 3000, 3200, 3300, 3100, 2900, 3000, 3100, 3200, 3000],
        color: () => '#D81B60', // pink color for expenses
        label: 'Ausgaben',
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Historie</Text>

      {/* Upper Box with the Bar Chart */}
      <View style={styles.box}>
        <BarChart
          data={data}
          width={screenWidth * 0.8}
          height={220}
          yAxisLabel="€"
          chartConfig={{
            backgroundColor: '#ececec',
            backgroundGradientFrom: '#ececec',
            backgroundGradientTo: '#ececec',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: () => '#000',
            barPercentage: 0.6,
          }}
          verticalLabelRotation={0}
          style={{
            borderRadius: 10,
          }}
        />
        <Text style={styles.chartText}>Jahresrückblick</Text>
      </View>

      {/* Lower Box with Yearly Expenses and Income Tabs */}
      <View style={styles.expenseBox}>
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
            <Text style={styles.tabText}>Ausgaben</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabText}>Einnahmen</Text>
          </TouchableOpacity>
        </View>

        {/* Expense List */}
        <View style={styles.expenseList}>
          <View style={styles.expenseItem}>
            <Text style={[styles.expenseColor, { backgroundColor: 'purple' }]}></Text>
            <Text style={styles.expenseText}>6000€ Auto</Text>
          </View>
          <View style={styles.expenseItem}>
            <Text style={[styles.expenseColor, { backgroundColor: 'cyan' }]}></Text>
            <Text style={styles.expenseText}>2400€ Benzin</Text>
          </View>
          <View style={styles.expenseItem}>
            <Text style={[styles.expenseColor, { backgroundColor: 'magenta' }]}></Text>
            <Text style={styles.expenseText}>1000€ Versicherung</Text>
          </View>
          <View style={styles.expenseItem}>
            <Text style={[styles.expenseColor, { backgroundColor: 'red' }]}></Text>
            <Text style={styles.expenseText}>500€ Diverses</Text>
          </View>
          <View style={styles.expenseItem}>
            <Text style={[styles.expenseColor, { backgroundColor: 'yellow' }]}></Text>
            <Text style={styles.expenseText}>5000€ Miete</Text>
          </View>
          <View style={styles.expenseItem}>
            <Text style={[styles.expenseColor, { backgroundColor: 'blue' }]}></Text>
            <Text style={styles.expenseText}>3600€ Essen</Text>
          </View>
          <View style={styles.expenseItem}>
            <Text style={[styles.expenseColor, { backgroundColor: 'pink' }]}></Text>
            <Text style={styles.expenseText}>2400€ Freizeit</Text>
          </View>
        </View>
      </View>
      <NavBar/>
    </View>
  );
};

export default YearlyRecapScreen;
