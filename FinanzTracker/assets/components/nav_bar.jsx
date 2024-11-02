import { View, StyleSheet, Text } from "react-native";

const NavBar = () => { return(
    <View style={styles.navBar}>
        <Text style={styles.navButton}>📊</Text>
        <Text style={styles.navButton}>🏠</Text>
        <Text style={styles.navButton}>🔄</Text>
     </View>
)};

const styles = StyleSheet.create({
    navBar: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        backgroundColor: '#ccc',
        paddingVertical: 10,
      },
      navButton: {
        fontSize: 24,
      },
})

export default NavBar;