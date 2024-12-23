// styles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Allgemeine Container-Stile
  container: {
    flex: 1,
    backgroundColor: "#232323",
    alignItems: "center",
    justifyContent: "center",
  },
  // Header-Stil
  header: {
    fontSize: 30,
    color: "#fff",
    marginBottom: 20,
  },
  // Box-Stil
  box: {
    width: "90%",
    backgroundColor: "#ececec",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  // Eingabefeld-Stil
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  // Button-Stile
  loginButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  // Text-Stile
  registerText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 20,
    textDecorationLine: "underline",
  },
  // Navigation-Leiste
  navBar: {
    flex: 1,
    height: 60,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "#ccc",
    paddingVertical: 10,
  },
  navBarIcon: {
    width: 24,
    height: 24,
    tintColor: "#333",
  },
  navButton: {
    fontSize: 24,
  },
  list: {
    marginTop: 10,
  },
  item: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
    width: "100%",
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 18,
    marginBottom: 5,
  },
  linkText: {
    color: "#007BFF",
    marginTop: 5,
  },
  backButton: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  backButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#232323",
  },
  loadingText: {
    fontSize: 20,
    color: "#888",
  },
  upperBox: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  lowerBox: {
    flex: 1,
    paddingBottom: 60,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#FFF",
  },
  zahlungDate: {
    fontSize: 16,
    color: "#000",
    padding: 10,
    backgroundColor: "#ddd", // Ensure this contrasts with the text color
    marginVertical: 5,
  },
});

export default styles;
