import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import styles from "./styles/styles";

const NavBar = () => {
  const navigation = useRouter();

  const handlePress = (path) => {
    navigation.push(path);
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => handlePress("/YearRecapScreen")}>
        <Image
          source={require("../assets/bars-sortieren.png")}
          style={styles.navBarIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress("/PieChartScreen")}>
        <Image
          source={require("../assets/chart-pie-alt.png")}
          style={styles.navBarIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress("/EditingOverviewScreen")}>
        <Image
          source={require("../assets/schaltflache-bearbeiten.png")}
          style={styles.navBarIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;
