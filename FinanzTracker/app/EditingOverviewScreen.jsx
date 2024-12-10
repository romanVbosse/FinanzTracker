import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./styles/styles";
import {
  getLoggedInNutzer,
  getNutzerByName,
  updateNutzer,
} from "../assets/logic/UserFunctions";
import {
  elementBearbeiten,
  elementHinzufuegen,
  elementLoeschen,
} from "../assets/logic/BaseClassFunctions";
import { Kategorie, Zahlung, Regularity } from "../assets/logic/BaseClass";
import NavBar from "./NavBar";

const ExpenseEditScreen = () => {
  const [tree, setTree] = useState({}); // The JSON tree structure
  const [currentItems, setCurrentItems] = useState([]); // Items at the current depth
  const [path, setPath] = useState([]); // Track navigation path
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isEditing, setIsEditing] = useState(-1); // Editing state

  // States for categories of Kategorie and Zahlung for editing
  const [originalName, setOriginalName] = useState("");
  const [editName, setEditName] = useState("");
  const [editFarbe, setEditFarbe] = useState("");
  const [editBetrag, setEditBetrag] = useState(-1);
  const [editTime, setEditTime] = useState(-1);
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
      console.error("Error loading tree:", error);
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
    if (item.kinder && Array.isArray(item.kinder) && item.kinder.length > 0) {
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
      setEditTime(item.regelmäßigkeit.time);
      setEditRythmus(item.regelmäßigkeit.anzahl);
    }
  };

  const resetEditPress = () => {
    setIsEditing(-1);
  };

  const saveEditPress = async (item) => {
    // Create a copy of the tree
    const newTree = { ...tree };

    if (item.typ === "kategorie") {
      elementBearbeiten(
        newTree,
        originalName,
        new Kategorie(editName, editFarbe)
      );
      console.log(
        "Updated tree with name:" + originalName + JSON.stringify(newTree)
      );
    } else if (item.typ === "zahlung") {
      elementBearbeiten(
        newTree,
        originalName,
        new Zahlung(
          editName,
          editFarbe,
          editBetrag,
          new Regularity(editTime, editRythmus)
        )
      );
      console.log(
        "Updated tree with name:" + originalName + JSON.stringify(newTree)
      );
    }

    // Call the updateNutzer function to save the updated tree
    const loggedInUser = await getLoggedInNutzer();
    console.log("Logged in Nutzer:", loggedInUser); // Log the name of the logged-in Nutzer
    await updateNutzer(loggedInUser, newTree);

    // Reload the tree
    await loadInitialTree();

    // Reset the editing state
    setIsEditing(-1);
  };

  const handleDeletePress = async (item) => {
    const newTree = { ...tree };
    elementLoeschen(newTree, item.name);
    const loggedInUser = await getLoggedInNutzer();
    await updateNutzer(loggedInUser, newTree);
    await loadInitialTree();
    setIsEditing(-1);
  };

  const handleAddKatPress = async (item) => {
    const newTree = { ...tree };
    const newKategorie = new Kategorie("Neue Kategorie", "#000000");
    elementHinzufuegen(newTree, item.name, newKategorie);
    const loggedInUser = await getLoggedInNutzer();
    await updateNutzer(loggedInUser, newTree);
    await loadInitialTree();
    setIsEditing(-1);
  };

  const handleAddZahPress = async (item) => {
    const newTree = { ...tree };
    const newZahlung = new Zahlung(
      "Neue Zahlung",
      "#000000",
      "10000",
      new Regularity(30, 1)
    );
    elementHinzufuegen(newTree, item.name, newZahlung);
    const loggedInUser = await getLoggedInNutzer();
    await updateNutzer(loggedInUser, newTree);
    await loadInitialTree();
    setIsEditing(-1);
  };

  // renders items in the list
  const renderItem = ({ item }) =>
    currentItems.indexOf(item) === isEditing ? (
      item.typ === "kategorie" ? (
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleKategoriePress(item)}
        >
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
          <TouchableOpacity
            style={styles.editButton}
            onPress={async () => {
              await handleAddKatPress(item);
            }}
          >
            <Text style={styles.editButtonText}>Add Kategorie</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={async () => {
              await handleAddZahPress(item);
            }}
          >
            <Text style={styles.editButtonText}>Add Zahlung</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={async () => {
              await saveEditPress(item);
            }}
          >
            <Text style={styles.editButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => resetEditPress()}
          >
            <Text style={styles.editButtonText}>Cancel</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleKategoriePress(item)}
        >
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
            value={editRythmus.toString()}
            onChangeText={(text) => setEditRythmus(parseFloat(text))}
            keyboardType="numeric"
          />
          <Picker
            selectedValue={editTime}
            style={styles.picker}
            onValueChange={(itemValue) => setEditTime(itemValue)}
          >
            <Picker.Item label="Daily" value={1} />
            <Picker.Item label="Weekly" value={7} />
            <Picker.Item label="Monthly" value={30} />
            <Picker.Item label="Yearly" value={365} />
          </Picker>
          <TouchableOpacity
            style={styles.editButton}
            onPress={async () => {
              await saveEditPress(item);
            }}
          >
            <Text style={styles.editButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => resetEditPress()}
          >
            <Text style={styles.editButtonText}>Cancel</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )
    ) : (
      <TouchableOpacity
        style={styles.item}
        onPress={() => handleKategoriePress(item)}
      >
        <Text style={[styles.itemText, { color: item.farbe }]}>
          {item.name}
        </Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEditPress(item)}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleDeletePress(item)}
        >
          <Text style={styles.editButtonText}>Delete</Text>
        </TouchableOpacity>
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
      <NavBar />
    </View>
  );
};

export default ExpenseEditScreen;
