import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { StackedBarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import NavBar from "./NavBar";
import styles from "./styles/styles";
import { CheckBox } from "react-native-elements";
import {
  getLoggedInNutzer,
  getNutzerByName,
} from "../assets/logic/UserFunctions";

const screenWidth = Dimensions.get("window").width;

const YearlyRecapScreen = () => {
  const [currentItems, setCurrentItems] = useState([]); // Items at the current depth
  const [currentItemsChecked, setCurrentItemsChecked] = useState([]); // Items at the current depth
  const [path, setPath] = useState([]); // Track navigation path

  const [isLoading, setIsLoading] = useState(true); // Loading state

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

  const toggleCheckBox = (item) => {
    const index = currentItems.findIndex((element) => element === item);
    const newChecked = [...currentItemsChecked];
    newChecked[index] = !newChecked[index];
    setCurrentItemsChecked(newChecked);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => handleKategoriePress(item)}
      >
        <Text style={[styles.itemText, { color: item.farbe }]}>
          {item.name}
        </Text>
        <CheckBox
          checked={
            currentItemsChecked[
              currentItems.findIndex((element) => element === item)
            ]
          }
          onPress={() => toggleCheckBox(item)}
        />
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

  const BarChartScreen = ({
    currentItems,
    path,
    handleBackPress,
    renderItem,
  }) => {
    const [labels, setLabels] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [legend, setLegend] = React.useState([]);
    const [barColors, setBarColors] = React.useState([]);
    console.log(currentItems + " " + typeof currentItems);

    useEffect(() => {
      const newLabels = [];
      const newData = [];
      const newLegend = [];
      const newBarColors = [];

      for (const item of currentItems) {
        newLabels.push(item.name);
        newLegend.push(item.name);
        newBarColors.push(item.farbe);

        let sum = [100, 300];
        newData.push(sum);
      }

      setLabels(newLabels);
      setData(newData);
      setLegend(newLegend);
      setBarColors(newBarColors);
    }, [currentItems]);

    return (
      <View style={styles.container}>
        <View style={styles.upperBox}>
          <Text style={styles.title}>Yearly Recap</Text>
          <StackedBarChart
            data={{
              labels: labels,
              data: data,
              legend: legend,
              barColors: barColors,
            }}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
          />
        </View>
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
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BarChartScreen
        currentItems={currentItems}
        path={path}
        handleBackPress={handleBackPress}
        renderItem={renderItem}
      />
      <NavBar />
    </View>
  );
};

export default YearlyRecapScreen;
