import { View, StyleSheet, Text } from "react-native";
import styles from "../screens/styles/styles";

const NavBar = () => { return(
    <View style={styles.navBar}>
        <Text style={styles.navButton}>📊</Text>
        <Text style={styles.navButton}>🏠</Text>
        <Text style={styles.navButton}>🔄</Text>
     </View>
)};

export default NavBar;