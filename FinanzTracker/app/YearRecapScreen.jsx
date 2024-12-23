import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { StackedBarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import NavBar from "./NavBar";
import styles from "./styles/styles";
import { CheckBox } from "react-native-elements";
import {
  getLoggedInNutzer,
  getNutzerByName,
} from "../assets/logic/UserFunctions";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getZahlungenSummeInTimeFrame } from "../assets/logic/BaseClassFunctions";

const screenWidth = Dimensions.get("window").width;

const YearRecapScreen = () => {
  const [currentItems, setCurrentItems] = useState([]); // Items at the current depth
  const [currentItemsChecked, setCurrentItemsChecked] = useState([]); // Items at the current depth
  const [path, setPath] = useState([]); // Track navigation path
  const [showDatePicker, setShowDatePicker] = useState(false);
  let time = new Date().getTime();
  const [endDate, setEndDate] = useState(
    new Date(time).toISOString().split("T")[0]
  );
  console.log("endDate initialized as: " + endDate);
  // startDate soll 6 wochen vor endDate sein
  let startTime = time - 6 * 7 * 24 * 60 * 60 * 1000;
  const [startDate, setStartDate] = useState(
    new Date(startTime).toISOString().split("T")[0]
  );
  console.log("startDate initialized as: " + startDate);
  const [intervall, setIntervall] = useState(7);

  const [editTime, setEditTime] = useState("start");

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
      setCurrentItemsChecked(new Array(item.kinder.length).fill(false));
    }
  };

  const handleBackPress = () => {
    if (path.length > 0) {
      const previousItems = path[path.length - 1]; // Get last level from path
      setPath(path.slice(0, -1)); // Remove last level from path
      setCurrentItems(previousItems); // Navigate back
      setCurrentItemsChecked(new Array(previousItems.length).fill(false));
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

  const handleDatePress = (type) => {
    setShowDatePicker(true);
    setEditTime(type);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    const regularStartDate = new Date(startDate);
    const regularEndDate = new Date(endDate);
    const regularSelectedDate = new Date(selectedDate);
    if (selectedDate) {
      if (editTime === "start") {
        if (selectedDate > endDate) {
          alert("Startdatum muss vor dem Enddatum liegen");
          return;
        }
        if (selectedDate > new Date()) {
          alert("Startdatum kann nicht in der Zukunft liegen");
          return;
        }
        let minimalDate = new Date();
        minimalDate.setDate(regularEndDate.getDate() - 6 * intervall);
        if (regularSelectedDate < minimalDate) {
          alert("Maximal 6 Instanzen des Intervalls vor dem Enddatum");
          setStartDate(minimalDate.toISOString().split("T")[0]);
          return;
        }
        setStartDate(new Date(selectedDate).toISOString().split("T")[0]);
      } else {
        console.log("##############sind in end");
        if (selectedDate < startDate) {
          alert("Enddatum muss nach dem Startdatum liegen");
          return;
        }
        if (selectedDate > new Date()) {
          alert("Enddatum kann nicht in der Zukunft liegen");
          return;
        }
        let maximalDate = new Date();
        maximalDate.setDate(regularStartDate.getDate() + 6 * intervall);
        if (
          selectedDate >
          new Date(new Date(maximalDate).toISOString().split("T")[0])
        ) {
          alert("Maximal 6 Instanzen des Intervalls nach dem Startdatum");
          setEndDate(
            new Date(new Date(maximalDate).toISOString().split("T")[0])
          );
          return;
        }
        console.log("############## haben umsetzen erreicht");
        setEndDate(new Date(selectedDate).toISOString().split("T")[0]);
        console.log("############## neues enddatum: " + endDate);
      }
    }
  };

  const handleIntervallChange = (value) => {
    let maximalStartDate = new Date(endDate) - 6 * value * 24 * 60 * 60 * 1000;
    if (new Date(startDate) < new Date(maximalStartDate)) {
      setStartDate(
        new Date(new Date(maximalStartDate).toISOString().split("T")[0])
      );
    }
    setIntervall(value);
  };

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

      const chosenItems = [];
      for (const item of currentItems) {
        if (
          currentItemsChecked[
            currentItems.findIndex((element) => element === item)
          ]
        ) {
          chosenItems.push(item);
        }
      }

      chosenItems.forEach((item) => {
        newLegend.push(item.name);
        newBarColors.push(item.farbe);
      });

      const timeFrame = new Date(endDate) - new Date(startDate);
      const intervallsAmount = Math.ceil(
        timeFrame / (intervall * 24 * 60 * 60 * 1000)
      );
      console.log("intervallsAmount: " + intervallsAmount);
      for (let i = 0; i < intervallsAmount; i++) {
        const newDate = new Date(startDate);
        newDate.setDate(newDate.getDate() + i * intervall);
        const formattedNewDate = newDate.toISOString().split("T")[0];
        const newEndDate = new Date(newDate);
        newEndDate.setDate(newEndDate.getDate() + intervall);
        const formattedNewEndDate = newEndDate.toISOString().split("T")[0];
        const newLabel =
          intervall < 365
            ? formattedNewDate[5] +
              formattedNewDate[6] +
              "." +
              formattedNewDate[8] +
              formattedNewDate[9]
            : formattedNewDate[0] +
              formattedNewDate[1] +
              formattedNewDate[2] +
              formattedNewDate[3];
        newLabels.push(newLabel); //hier zeitintervall

        const payments = [];
        for (const item of chosenItems) {
          let sum = getZahlungenSummeInTimeFrame(
            item,
            formattedNewDate,
            formattedNewEndDate
          );
          payments.push(sum);
        }
        newData.push(payments);
        console.log("new data is ", newData);
      }

      setLabels(newLabels);
      setData(newData);
      setLegend(newLegend);
      setBarColors(newBarColors);
    }, [currentItemsChecked, startDate, endDate, intervall]);

    return (
      <View>
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
          <View>
            <Text style={styles.subTitle}>Intervall</Text>
            <Picker
              selectedValue={intervall}
              style={styles.picker}
              onValueChange={(itemValue) => handleIntervallChange(itemValue)}
            >
              <Picker.Item label="Daily" value={1} />
              <Picker.Item label="Weekly" value={7} />
              <Picker.Item label="Monthly" value={30} />
              <Picker.Item label="Yearly" value={365} />
            </Picker>
            <Text style={styles.subTitle}>Startdatum</Text>
            <TouchableOpacity onPress={() => handleDatePress("start")}>
              <Text style={styles.zahlungDate}>
                {new Date(startDate).toISOString().split("T")[0]}
              </Text>
            </TouchableOpacity>
            <Text style={styles.subTitle}>Enddatum</Text>
            <TouchableOpacity onPress={() => handleDatePress("end")}>
              <Text style={styles.zahlungDate}>
                {new Date(endDate).toISOString().split("T")[0]}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={
                  editTime === "start" ? new Date(startDate) : new Date(endDate)
                }
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
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
      <SafeAreaView>
        <BarChartScreen
          currentItems={currentItems}
          path={path}
          handleBackPress={handleBackPress}
          renderItem={renderItem}
        />
      </SafeAreaView>
      <NavBar />
    </View>
  );
};

export default YearRecapScreen;
