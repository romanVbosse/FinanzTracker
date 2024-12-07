import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles/styles';
import { getLoggedInNutzer, getNutzerByName } from '../assets/logic/UserFunctions';


const ExpenseEditScreen = () => {
  const [currentItems, setCurrentItems] = useState([]); // Items at the current depth
  const [path, setPath] = useState([]); // Track navigation path
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Load the initial tree from AsyncStorage
  useEffect(() => {
    const loadInitialTree = async () => {
      try {
        const loggedInUser = await getLoggedInNutzer();
        console.log("logged in as " + loggedInUser);
        const jsonTree = await getNutzerByName(loggedInUser); // Fetch the tree from storage
        console.log("tree " + JSON.stringify(jsonTree));
        if (jsonTree) {
          setCurrentItems([...jsonTree.ausgaben, ...jsonTree.einnahmen]); // Combine ausgaben and einnahmen
        }
      } catch (error) {
        console.error('Error loading tree:', error);
      } finally {
        setIsLoading(false); // Stop loading spinner
      }
    };

    loadInitialTree();
  }, []);

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

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

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
