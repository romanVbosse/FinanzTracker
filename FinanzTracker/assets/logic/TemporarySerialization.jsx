import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveDataFB, deleteDataFB } from './Firebase';

// Save data
const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    if(key !== "loggedInUser") {
      await saveDataFB(key, key, JSON.parse(JSON.stringify(value)));
    }
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

// Retrieve data
const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};

// Delete data
const deleteData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    await deleteDataFB(key, key);
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};

export { deleteData, saveData, getData };
