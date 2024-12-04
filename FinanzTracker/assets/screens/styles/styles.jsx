// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Allgemeine Container-Stile
  container: {
    flex: 1,
    backgroundColor: '#232323',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Header-Stil
  header: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 20,
  },
  // Box-Stil
  box: {
    width: '90%',
    backgroundColor: '#ececec',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  // Eingabefeld-Stil
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  // Button-Stile
  loginButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  // Text-Stile
  registerText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  // Navigation-Leiste
  navBar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#ccc',
    paddingVertical: 10,
  },
  navBarIcon: {
    width: 24,
    height: 24,
    tintColor: '#333',
  },
  navButton: {
    fontSize: 24,
  }
});

export default styles;
