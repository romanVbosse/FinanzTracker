import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import MonthlyOverviewScreen from './assets/screens/monthly_overview.jsx';
import ExpenseOverviewScreen from './assets/screens/pie_chart_screen.jsx';

export default function App() {
  return (
    <View style={styles.container}>
      <ExpenseOverviewScreen />
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
