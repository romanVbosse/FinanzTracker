import Nutzer from "./User";
import { Kategorie, Zahlung, Regularity } from "./BaseClass";
import { deleteData, saveData, getData } from "./TemporarySerialization";
import { elementHinzufuegen, elementLoeschen } from "./BaseClassFunctions";

/**
 * Creates a new Nutzer JSON object with empty categories.
 * @param {string} benutzername - The name of the user.
 * @return {Nutzer} - A new Nutzer instance.
 */
async function createNutzer(benutzername) {
  const newNutzer = new Nutzer(benutzername);

  newNutzer.ausgaben.push(new Kategorie("Ausgaben", "#FF0000"));
  newNutzer.einnahmen.push(new Kategorie("Einnahmen", "#00FF00"));

  await saveData(benutzername, newNutzer);
  await saveData("loggedInUser", benutzername);

  return newNutzer;
}

async function createTestNutzer() {
  const newNutzer = {
    benutzername: "TestNutzer",
    ausgaben: [
      {
        name: "Ausgaben",
        farbe: "#FF0000",
        typ: "kategorie",
        kinder: [
          {
            name: "Miete",
            farbe: "#AAAAAA",
            typ: "kategorie",
            kinder: [
              {
                name: "Kaltmiete",
                farbe: "#BBBBBB",
                typ: "zahlung",
                menge: "500",
                regelmäßigkeit: { time: 30, anzahl: 1 },
                erfolgteZahlungen: [],
              },
              {
                name: "Warmmiete",
                farbe: "#FF00FF",
                typ: "zahlung",
                menge: "1000",
                regelmäßigkeit: { time: 30, anzahl: 1 },
                erfolgteZahlungen: [],
              },
            ],
          },
          {
            name: "Freizeit",
            farbe: "#000000",
            typ: "zahlung",
            menge: "50",
            regelmäßigkeit: { time: 7, anzahl: 1 },
            erfolgteZahlungen: [
              { datum: new Date(2024, 11, 23), menge: "200" },
              { datum: new Date(2024, 11, 10), menge: "50" },
            ],
          },
          {
            name: "Essen",
            farbe: "#00AFAF",
            typ: "zahlung",
            menge: "10",
            regelmäßigkeit: { time: "1", anzahl: 1 },
            erfolgteZahlungen: [
              { datum: new Date(2024, 11, 7), menge: "400" },
              { datum: new Date(2024, 11, 10), menge: "50" },
            ],
          },
        ],
      },
    ],
    einnahmen: [
      {
        name: "Einnahmen",
        farbe: "#00FF00",
        typ: "kategorie",
        kinder: [
          {
            name: "Job",
            farbe: "#000000",
            typ: "zahlung",
            menge: "2000",
            regelmäßigkeit: { time: 30, anzahl: 1 },
            erfolgteZahlungen: [
              { datum: new Date(2024, 10, 23), menge: "2000" },
              { datum: new Date(2024, 11, 23), menge: "2100" },
            ],
          },
        ],
      },
    ],
  };
  await saveData("TestNutzer", newNutzer);
  await saveData("loggedInUser", "TestNutzer");
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
async function getLoggedInNutzer() {
  return await getData("loggedInUser");
}

/**
 * sets logged in user
 * @param {string} benutzername - The name of the logged in user.
 */
async function setLoggedInNutzer() {
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

export {
  createNutzer,
  createTestNutzer,
  deleteNutzer,
  updateNutzer,
  getLoggedInNutzer,
  setLoggedInNutzer,
  getNutzerByName,
};
