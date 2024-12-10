import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import styles from "./styles/styles";

const NavBar = () => {
  const navigation = useRouter();

  const handlePress = (path) => {
    navigation.push(path);
  };

  return (
    <View style={styles.navBar}>
      <Text
        style={styles.navButton}
        onPress={() => handlePress("/YearRecapScreen")}
      >
        📊
      </Text>
      <Text
        style={styles.navButton}
        onPress={() => handlePress("/PieChartScreen")}
      >
        🏠
      </Text>
      <Text
        style={styles.navButton}
        onPress={() => handlePress("/EditingOverviewScreen")}
      >
        🔄
      </Text>
    </View>
  );
};

export default NavBar;
