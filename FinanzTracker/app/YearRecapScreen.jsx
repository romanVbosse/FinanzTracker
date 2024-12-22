import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import NavBar from "./NavBar";
import styles from "./styles/styles";

const screenWidth = Dimensions.get("window").width;

const YearlyRecapScreen = () => {
  return (
    <View style={styles.container}>
      <NavBar />
    </View>
  );
};

export default YearlyRecapScreen;
