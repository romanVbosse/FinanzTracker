import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles/styles';

const ExpenseEditScreen = () => {
  // Sample expenses data
  const expenses = [
    { label: 'Auto', amount: '500€', color: 'purple' },
    { label: 'Benzin', amount: '200€', color: 'cyan' },
    { label: 'Versicherung', amount: '100€', color: 'magenta' },
    { label: 'Diverses', amount: '200€', color: 'red' },
    { label: 'Miete', amount: '400€', color: 'yellow' },
    { label: 'Essen', amount: '300€', color: 'blue' },
    { label: 'Freizeit', amount: '200€', color: 'pink' },
    { label: 'Kleidung', amount: '100€', color: 'red' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ausgaben bearbeiten</Text>

      <View style={styles.box}>
        <ScrollView contentContainerStyle={styles.expenseList}>
          {expenses.map((expense, index) => (
            <View key={index} style={styles.expenseItem}>
              <View style={[styles.expenseColor, { backgroundColor: expense.color }]}></View>
              {/* <TouchableOpacity onPress={() => console.log(`Edit ${expense.label}`)} style={styles.expenseTextContainer}> */}
                <Text style={styles.expenseText}>{`${expense.amount} ${expense.label}`}</Text>
              {/* </TouchableOpacity> */}
              <TouchableOpacity onPress={() => console.log(`Settings for ${expense.label}`)}>
                <MaterialIcons name="settings" size={20} color="black" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        
        {/* New Expense Button */}
        <TouchableOpacity style={styles.newExpenseButton}>
          <Text style={styles.newExpenseButtonText}>Neue Ausgabe</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExpenseEditScreen;
