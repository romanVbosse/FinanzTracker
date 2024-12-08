import Nutzer from "./User";
import { Kategorie, Zahlung } from "./BaseClass";
import { deleteData, saveData, getData } from "./TemporarySerialization";
import { elementHinzufuegen, elementLoeschen } from "./BaseClassFunctions";


/**
 * Creates a new Nutzer JSON object with empty categories.
 * @param {string} benutzername - The name of the user.
 * @return {Nutzer} - A new Nutzer instance.
 */
async function createNutzer(benutzername) {
  const newNutzer = new Nutzer(benutzername);

  newNutzer.ausgaben.push(new Kategorie('Ausgaben', '#FF0000'));
  newNutzer.einnahmen.push(new Kategorie('Einnahmen', '#00FF00'));

  await saveData(benutzername, newNutzer);
  await saveData("loggedInUser", benutzername);

  const testNutzer = await getData(benutzername);

  elementHinzufuegen(testNutzer, "Ausgaben", new Kategorie("Miete", "#AAAAAA"));

  elementHinzufuegen(testNutzer, "Miete", new Zahlung("Kaltmiete", "#BBBBBB", "500€", "monthly"));

  await saveData(benutzername, testNutzer);
  return newNutzer;
}

/**
 * Updates an existing Nutzer JSON object with the provided tree.
 * @param {string} benutzername - The name of the user.
 * @param {Nutzer} nutzer - The updated Nutzer object.
 * @return {Boolean} - It worked yay.
 */
async function updateNutzer(benutzername, nutzer) {
  await saveData(benutzername, nutzer);
  return true;
}

/**
 * delete user from database
 * @param {string} benutzername - The name of the user.
 */
async function deleteNutzer(benutzername) {
  // TODO: Nutzer in DB finden und löschen
  // localStorage.removeItem(benutzername);
}

/**
 * returns logged in user
 * @returns {string} benutzername - The name of the logged in user.
 */
async function getLoggedInNutzer(){
  return await getData("loggedInUser");
}

/**
 * sets logged in user
 * @param {string} benutzername - The name of the logged in user.
 */
async function setLoggedInNutzer(){
  // return JSON.parse(localStorage.getItem('loggedInUser'));
}

/**
 * return user object for name
 * @param {benutzername} string Name of user
 * @returns {Nutzer} Nutzer Object of User.
 */
async function getNutzerByName(benutzername) {
  return await getData(benutzername);
}


export { createNutzer, deleteNutzer, updateNutzer, getLoggedInNutzer, setLoggedInNutzer, getNutzerByName };