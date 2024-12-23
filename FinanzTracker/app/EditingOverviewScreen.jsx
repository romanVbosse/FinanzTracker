import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
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
  findeElement,
} from "../assets/logic/BaseClassFunctions";
import { Kategorie, Zahlung, Regularity } from "../assets/logic/BaseClass";
import NavBar from "./NavBar";
import DateTimePicker from "@react-native-community/datetimepicker";

const ExpenseEditScreen = () => {
  const [tree, setTree] = useState({}); // The JSON tree structure
  const [currentItems, setCurrentItems] = useState([]); // Items at the current depth
  const [path, setPath] = useState([]); // Track navigation path
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isEditing, setIsEditing] = useState(-1); // Editing state
  const [isAdding, setIsAdding] = useState(false); // Adding state
  const [addString, setAddString] = useState(""); // String to add
  const [isKategorie, setIsKategorie] = useState(true); // Type of element to add
  const [showDatePicker, setShowDatePicker] = useState(false); // Date picker state

  // States for categories of Kategorie and Zahlung for editing
  const [originalName, setOriginalName] = useState("");
  const [editName, setEditName] = useState("");
  const [editFarbe, setEditFarbe] = useState("");
  const [editBetrag, setEditBetrag] = useState(-1);
  const [editTime, setEditTime] = useState(-1);
  const [editRythmus, setEditRythmus] = useState(-1);
  const [editZahlungen, setEditZahlungen] = useState([]);
  const [currentZahlungIndex, setCurrentZahlungIndex] = useState(-1);

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

  // set variables to the currently edited item
  const handleEditPress = (item) => {
    setIsEditing(currentItems.indexOf(item));
    setOriginalName(item.name);
    setEditName(item.name);
    setEditFarbe(item.farbe);
    if (item.typ === "zahlung") {
      setEditBetrag(item.menge);
      setEditTime(item.regelmäßigkeit.time);
      console.log("rhytmus", item.regelmäßigkeit.anzahl);
      setEditRythmus(item.regelmäßigkeit.anzahl);
      console.log("rhytmus", editRythmus);
      setEditZahlungen(item.erfolgteZahlungen);
    }
  };

  const resetEditPress = () => {
    setIsEditing(-1);
  };

  const saveEditPress = async (item) => {
    // Create a copy of the tree
    const newTree = { ...tree };

    //check if inputs are valid
    if (editName === "" || editFarbe === "") {
      alert("Please fill out all fields");
      return;
    }
    if (findeElement(newTree, editName) && editName !== originalName) {
      alert("Element already exists");
      return;
    }
    if (editFarbe.length !== 7 || editFarbe[0] !== "#") {
      alert("Invalid color");
      return;
    }

    // write new item values to the tree
    if (item.typ === "kategorie") {
      elementBearbeiten(
        newTree,
        originalName,
        new Kategorie(editName, editFarbe)
      );
    } else if (item.typ === "zahlung") {
      if (editBetrag === -1 || editTime === -1 || editRythmus === -1) {
        alert("Please fill out all fields");
        return;
      }
      elementBearbeiten(
        newTree,
        originalName,
        new Zahlung(
          editName,
          editFarbe,
          editBetrag,
          new Regularity(editTime, editRythmus),
          editZahlungen
        )
      );
    }

    // Call the updateNutzer function to save the updated tree
    const loggedInUser = await getLoggedInNutzer();
    await updateNutzer(loggedInUser, newTree);

    // Reload the tree
    await loadInitialTree();

    // Reset the editing state
    setIsEditing(-1);
  };

  // delete element from tree
  const handleDeletePress = async (item) => {
    const newTree = { ...tree };
    elementLoeschen(newTree, item.name);
    const loggedInUser = await getLoggedInNutzer();
    await updateNutzer(loggedInUser, newTree);
    await loadInitialTree();
    setIsEditing(-1);
  };

  // set variables to enable adding a new element
  const handleAddKatPress = () => {
    setIsAdding(true);
    setIsKategorie(true);
    setAddString("Neue Kategorie");
  };

  const handleAddZahPress = () => {
    setIsAdding(true);
    setIsKategorie(false);
    setAddString("Neue Zahlung");
  };

  // open date picker and set the date of the selected payment
  const handleDatePress = (index) => {
    // If index is an object, extract the number
    if (typeof index === "object" && index !== null) {
      index = index.index; // Adjust this line based on the actual structure of the object
    }

    setCurrentZahlungIndex(index);
    setShowDatePicker(true);
  };

  const handleAmountChange = (text, index) => {
    let prevZahlungen = [...editZahlungen];
    prevZahlungen[index].menge = text;
    setEditZahlungen(prevZahlungen);
  };

  const handleDeleteZahlung = (index) => {
    const newZahlungen = editZahlungen.filter((_, i) => i !== index);
    setEditZahlungen(newZahlungen);
  };

  // add a new payment to the list of payments
  const handleAddZahlung = (item) => {
    let time = new Date().getTime();
    const newZahlungen = [
      ...editZahlungen,
      {
        datum: new Date(time).toISOString().split("T")[0],
        menge: item.menge,
      },
    ];
    setEditZahlungen(newZahlungen);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const newZahlungen = [...editZahlungen];
      newZahlungen[currentZahlungIndex].datum = selectedDate
        .toISOString()
        .split("T")[0];
      setEditZahlungen(newZahlungen);
    }
  };

  // add a new element to the tree
  const handleAddElement = async (item) => {
    const newTree = { ...tree };
    console.log("Adding element:", addString);
    // check if name is already in use
    if (findeElement(newTree, addString) || addString === "") {
      alert("Element already exists");
      return;
    }
    if (isKategorie) {
      const newKategorie = new Kategorie(addString, "#000000");
      console.log(JSON.stringify(newKategorie));
      elementHinzufuegen(newTree, item.name, newKategorie);
    } else {
      const newZahlung = new Zahlung(
        addString,
        "#000000",
        "0",
        new Regularity(30, 1),
        []
      );
      elementHinzufuegen(newTree, item.name, newZahlung);
    }
    console.log(JSON.stringify(newTree));
    const loggedInUser = await getLoggedInNutzer();
    await updateNutzer(loggedInUser, newTree);
    await loadInitialTree();
    setIsEditing(-1);
    setIsAdding(false);
    setAddString("");
  };

  // renders items in the list
  const renderItem = ({ item }) =>
    currentItems.indexOf(item) === isEditing ? (
      // editing view of the element with inputs
      item.typ === "kategorie" ? (
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleKategoriePress(item)}
        >
          <Text>Name</Text>
          <TextInput
            style={[styles.textInput, { color: item.farbe }]}
            value={editName}
            onChangeText={setEditName}
          />
          <Text>Farbe</Text>
          <TextInput
            style={[styles.textInput, { color: item.farbe }]}
            value={editFarbe}
            onChangeText={setEditFarbe}
          />
          {isAdding ? (
            <>
              <Text>Name des neuen Objekts</Text>
              <TextInput
                style={styles.textInput}
                value={addString}
                onChangeText={setAddString}
              />
              <TouchableOpacity
                style={styles.editButton}
                onPress={async () => {
                  await handleAddElement(item);
                }}
              >
                <Text style={styles.editButtonText}>Hinzufügen</Text>
              </TouchableOpacity>
            </>
          ) : null}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              handleAddKatPress();
            }}
          >
            <Text style={styles.editButtonText}>Neue Kategorie</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              handleAddZahPress();
            }}
          >
            <Text style={styles.editButtonText}>Neue Zahlung</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={async () => {
              await saveEditPress(item);
            }}
          >
            <Text style={styles.editButtonText}>Speichern</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => resetEditPress()}
          >
            <Text style={styles.editButtonText}>Abbrechen</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleKategoriePress(item)}
        >
          <Text>Name</Text>
          <TextInput
            style={[styles.textInput, { color: item.farbe }]}
            value={editName}
            onChangeText={setEditName}
          />
          <Text>Farbe</Text>
          <TextInput
            style={[styles.textInput, { color: item.farbe }]}
            value={editFarbe}
            onChangeText={setEditFarbe}
          />
          <Text>Betrag</Text>
          <TextInput
            style={[styles.textInput, { color: item.farbe }]}
            value={editBetrag}
            onChangeText={setEditBetrag}
            keyboardType="numeric"
          />
          <Text>Rythmus</Text>
          <TextInput
            style={[styles.textInput, { color: item.farbe }]}
            value={editRythmus.toString()}
            onChangeText={setEditRythmus}
            keyboardType="numeric"
          />
          <Text>Zeitintervall</Text>
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
          <View style={styles.erfolgteZahlungContainer}>
            <Text>Erfolgte Zahlungen:</Text>
            {editZahlungen.map((zahlung, index) => (
              <View key={index} style={styles.zahlungItem}>
                <Text>Datum</Text>
                <TouchableOpacity onPress={() => handleDatePress(index)}>
                  <Text style={styles.zahlungDate}>
                    {zahlung.datum.split("T")[0]}
                  </Text>
                </TouchableOpacity>
                <Text>Menge</Text>
                <TextInput
                  style={styles.textInput}
                  value={editZahlungen[index].menge.toString()}
                  onChangeText={(text) => handleAmountChange(text, index)}
                  keyboardType="numeric"
                />
                <TouchableOpacity onPress={() => handleDeleteZahlung(index)}>
                  <Text style={styles.deleteButton}>Löschen</Text>
                </TouchableOpacity>
              </View>
            ))}
            {showDatePicker && (
              <DateTimePicker
                value={new Date(editZahlungen[currentZahlungIndex].datum)}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            <TouchableOpacity onPress={() => handleAddZahlung(item)}>
              <Text style={styles.addButton}>Erfolgte Zahlung hinzufügen</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={async () => {
              await saveEditPress(item);
            }}
          >
            <Text style={styles.editButtonText}>Speichern</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => resetEditPress()}
          >
            <Text style={styles.editButtonText}>Abbrechen</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )
    ) : (
      // normal view of the element
      <TouchableOpacity
        style={styles.item}
        onPress={() => handleKategoriePress(item)}
      >
        <View style={styles.itemContent}>
          <View>
            <Text style={[styles.itemText, { color: item.farbe }]}>
              {item.name}
            </Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditPress(item)}
            >
              <Text style={styles.editButtonText}>Anpassen</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleDeletePress(item)}
            >
              <Text style={styles.editButtonText}>Löschen</Text>
            </TouchableOpacity>
          </View>
          <View>
            {item.typ === "kategorie" ? (
              <Image
                source={require("../assets/ordner.png")}
                style={styles.navBarIcon}
              />
            ) : (
              <Image
                source={require("../assets/euro.png")}
                style={styles.navBarIcon}
              />
            )}
          </View>
        </View>
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
      <Text style={styles.title}>Zahlungen Anpassen</Text>
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
