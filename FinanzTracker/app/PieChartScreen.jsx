import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import PieChart from "react-native-pie-chart";
import NavBar from "./NavBar";
import styles from "./styles/styles";
import {
  getLoggedInNutzer,
  getNutzerByName,
} from "../assets/logic/UserFunctions";
import { getSumOfPayments } from "../assets/logic/BaseClassFunctions";

const ExpenseOverviewScreen = () => {
  const [currentItems, setCurrentItems] = useState([]); // Items at the current depth
  const [path, setPath] = useState([]); // Track navigation path
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Function to load the initial tree from AsyncStorage
  const loadInitialTree = async () => {
    try {
      const loggedInUser = await getLoggedInNutzer();
      const jsonTree = await getNutzerByName(loggedInUser); // Fetch the tree from storage
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
    if (item.kinder && Array.isArray(item.kinder) && item.kinder.length > 0) {
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

  // renders items in the list
  const renderItem = ({ item }) => {
    console.log("Item:", item);
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => handleKategoriePress(item)}
      >
        <View>
          <Text style={[styles.itemText, { color: item.farbe }]}>
            {item.name}
          </Text>
          <Text style={styles.itemText}>
            {getSumOfPayments(item, 30) + "€/Monat"}
          </Text>
        </View>
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
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const PieChartScreen = ({
    currentItems,
    path,
    handleBackPress,
    renderItem,
  }) => {
    const [series, setSeries] = useState([]);
    const [sliceColor, setSliceColor] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const seriesData = currentItems.map((item) => getSumOfPayments(item, 30));
      const colors = currentItems.map((item) => item.farbe);

      // Check if the seriesData is valid
      const totalSum = seriesData.reduce((acc, value) => acc + value, 0);
      if (totalSum > 0) {
        setSeries(seriesData);
        setSliceColor(colors);
      } else {
        // Handle the case where the series data is invalid
        setSeries([1]); // Set a default value to avoid the error
        setSliceColor(["#cccccc"]); // Set a default color
      }

      setIsLoading(false);
    }, [currentItems]);

    useEffect(() => {
      // Simulate loading data
      setIsLoading(false);
    }, []);

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      );
    }

    const widthAndHeight = 250;

    return (
      <View style={styles.container}>
        {/* Upper Box with the Pie Chart */}
        <View style={styles.upperBox}>
          <Text style={styles.title}>Übersicht</Text>
          {series.length > 0 && (
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              sliceColor={sliceColor}
              coverRadius={0.45}
              coverFill={"#232323"}
            />
          )}
        </View>

        {/* Lower Box with the Expense List */}
        <View style={styles.lowerBox}>
          {path.length > 0 && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
            >
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
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <PieChartScreen
        currentItems={currentItems}
        path={path}
        handleBackPress={handleBackPress}
        renderItem={renderItem}
      />
      <NavBar />
    </View>
  );
};

export default ExpenseOverviewScreen;
