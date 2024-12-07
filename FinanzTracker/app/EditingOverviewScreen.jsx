import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles/styles';
import { getLoggedInNutzer, getNutzerByName } from '../assets/logic/UserFunctions';


const ExpenseEditScreen = () => {
  const initialTree = {"benutzername":"Test","ausgaben":[{"name":"Ausgaben","farbe":"#FF0000","typ":"kategorie","kinder":[{"name":"Miete","farbe":"#AAAAAA","typ":"kategorie","kinder":[]}]}],"einnahmen":[{"name":"Einnahmen","farbe":"#00FF00","typ":"kategorie","kinder":[]}]};
  const [currentItems, setCurrentItems] = useState([...initialTree.ausgaben, ...initialTree.einnahmen]); // Start with Ausgaben and Einnahmen
  const [path, setPath] = useState([]); // Track the navigation path

  const handleKategoriePress = (item) => {
    if (item.kinder && Array.isArray(item.kinder)) {
      setPath([...path, currentItems]); // Save current depth to path
      setCurrentItems(item.kinder); // Navigate to children
    }
  };

  const handleBackPress = () => {
    if (path.length > 0) {
      const previousItems = path[path.length - 1]; // Get last level from path
      setPath(path.slice(0, -1)); // Remove last level from path
      setCurrentItems(previousItems); // Navigate back
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleKategoriePress(item)}>
      <Text style={[styles.itemText, { color: item.farbe }]}>{item.name}</Text>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      {path.length > 0 && (
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={currentItems}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default ExpenseEditScreen;
