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

  console.log(JSON.stringify(testNutzer));

  elementHinzufuegen(testNutzer, "Ausgaben", new Kategorie("Miete", "#AAAAAA"));

  console.log("1 mal dazu \n" + JSON.stringify(testNutzer));

  elementHinzufuegen(testNutzer, "Miete", new Zahlung("Kaltmiete", "BBBBBB", "500€", "monthly"));

  console.log("2 mal dazu \n" + JSON.stringify(testNutzer));
  return newNutzer;
}

/**
 * delete user from database
 * @param {string} benutzername - The name of the user.
 */
function deleteNutzer(benutzername) {
  // TODO: Nutzer in DB finden und löschen
  // localStorage.removeItem(benutzername);
}

/**
 * returns logged in user
 * @returns {string} benutzername - The name of the logged in user.
 */
function getLoggedInNutzer(){
  return getData("loggedInUser").benutzername;
}

/**
 * sets logged in user
 * @param {string} benutzername - The name of the logged in user.
 */
function setLoggedInNutzer(){
  // return JSON.parse(localStorage.getItem('loggedInUser'));
}

/**
 * return user object for name
 * @param {benutzername} string Name of user
 * @returns {Nutzer} Nutzer Object of User.
 */
function getNutzerByName(benutzername) {
  return getData(benutzername);
}


export { createNutzer, deleteNutzer, getLoggedInNutzer, setLoggedInNutzer, getNutzerByName };