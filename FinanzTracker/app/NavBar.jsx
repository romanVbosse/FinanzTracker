import { View, StyleSheet, Text } from "react-native";
import styles from "./styles/styles";
import { useRouter } from "expo-router"

const navigation = useRouter();

const handlePress = (path) => {
    navigation.push(path);
};

const NavBar = () => { return(
    <View style={styles.navBar}>
        <Text style={styles.navButton} onPress={handlePress("/YearRecapScreen")}>📊</Text>
        <Text style={styles.navButton} onPress={handlePress("/PieChartScreen")}>🏠</Text>
        <Text style={styles.navButton} onPress={handlePress("/MonthlyOverviewScreen")}>🔄</Text>
     </View>
)};

export default NavBar;