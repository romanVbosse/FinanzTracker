import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles/styles';
import { getLoggedInNutzer, getNutzerByName, updateNutzer } from '../assets/logic/UserFunctions';
import NavBar from './NavBar';
import { elementBearbeiten } from '../assets/logic/BaseClassFunctions';


const ExpenseEditScreen = () => {
  const [tree, setTree] = useState({ }); // The JSON tree structure
  const [currentItems, setCurrentItems] = useState([]); // Items at the current depth
  const [path, setPath] = useState([]); // Track navigation path
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isEditing, setIsEditing] = useState(-1); // Editing state

  // States for categories of Kategorie and Zahlung for editing
  const [originalName, setOriginalName] = useState('');
  const [editName, setEditName] = useState('');
  const [editFarbe, setEditFarbe] = useState(''); 
  const [editBetrag, setEditBetrag] = useState(-1);
  const [editRythmus, setEditRythmus] = useState(-1);

  // Function to load the initial tree from AsyncStorage
  const loadInitialTree = async () => {
    try {
      const loggedInUser = await getLoggedInNutzer();
      const jsonTree = await getNutzerByName(loggedInUser); // Fetch the tree from storage
      setTree(jsonTree); // Save the tree to state
      if (jsonTree) {
        setCurrentItems([...jsonTree.ausgaben, ...jsonTree.einnahmen]); // Combine ausgaben and einnahmen
      }
    } catch (error) {
      console.error('Error loading tree:', error);
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  // useEffect to load the tree on component mount
  useEffect(() => {
    loadInitialTree();
  }, []);

  const handleKategoriePress = (item) => {
    setIsEditing(-1);
    if (item.kinder && Array.isArray(item.kinder)) {
      setPath([...path, currentItems]); // Save current depth to path
      setCurrentItems(item.kinder); // Navigate to children
    }
  };

  const handleBackPress = () => {
    setIsEditing(-1);
    if (path.length > 0) {
      const previousItems = path[path.length - 1]; // Get last level from path
      setPath(path.slice(0, -1)); // Remove last level from path
      setCurrentItems(previousItems); // Navigate back
    }
  };

  const handleEditPress = (item) => {
    setIsEditing(currentItems.indexOf(item));
    setOriginalName(item.name);
    setEditName(item.name);
    setEditFarbe(item.farbe);
    if (item.typ === "zahlung") {
      setEditBetrag(item.menge);
      setEditRythmus(item.regelmäßigkeit);
    } 
  };

  const resetEditPress = () => { 
    setIsEditing(-1);
  };

  const saveEditPress = async (item) => {
    // Create a copy of the tree
    const newTree = { ...tree };

    if (item.typ === "kategorie") {
      elementBearbeiten(newTree, originalName, { name: editName, farbe: editFarbe });
      console.log('Updated tree with name:'+ originalName + JSON.stringify(newTree));
    } else if (item.typ === "zahlung") {
      elementBearbeiten(newTree, originalName, { name: editName, farbe: editFarbe, menge: editBetrag, regelmäßigkeit: editRythmus });
      console.log('Updated tree:', JSON.stringify(newTree));
    }

    // Call the updateNutzer function to save the updated tree
    const loggedInUser = await getLoggedInNutzer();
    console.log('Logged in Nutzer:', loggedInUser); // Log the name of the logged-in Nutzer
    await updateNutzer(loggedInUser, newTree);

    // Update the state with the new tree
    setTree(newTree);

    // Reload the tree
    await loadInitialTree();

    // Reset the editing state
    setIsEditing(-1);
  };

  // renders items in the list
  const renderItem = ({ item }) => (
    currentItems.indexOf(item) === isEditing ? (
      item.typ === "kategorie" ? (
        <TouchableOpacity style={styles.item} onPress={() => handleKategoriePress(item)}>
          <TextInput
            style={[styles.itemText, { color: item.farbe }]}
            value={editName}
            onChangeText={setEditName}
          />
          <TextInput
            style={[styles.itemText, { color: item.farbe }]}
            value={editFarbe}
            onChangeText={setEditFarbe}
          />
          <TouchableOpacity style={styles.editButton} onPress={async () => { 
            await saveEditPress(item); 
          }}>
            <Text style={styles.editButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={() => resetEditPress()}>
            <Text style={styles.editButtonText}>Cancel</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.item} onPress={() => handleKategoriePress(item)}>
          <TextInput
            style={[styles.itemText, { color: item.farbe }]}
            value={editName}
            onChangeText={setEditName}
          />
          <TextInput
            style={[styles.itemText, { color: item.farbe }]}
            value={editFarbe}
            onChangeText={setEditFarbe}
          />
          <TextInput
            style={[styles.itemText, { color: item.farbe }]}
            value={editBetrag}
            onChangeText={setEditBetrag}
          />
          <TextInput
            style={[styles.itemText, { color: item.farbe }]}
            value={editRythmus}
            onChangeText={setEditRythmus} 
          />
          <TouchableOpacity style={styles.editButton} onPress={async () => { 
            await saveEditPress(item); 
          }}>
            <Text style={styles.editButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={() => resetEditPress()}>
            <Text style={styles.editButtonText}>Cancel</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )
    ) : (
      <TouchableOpacity style={styles.item} onPress={() => handleKategoriePress(item)}>
        <Text style={[styles.itemText, { color: item.farbe }]}>{item.name}</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEditPress(item)}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    )
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
