import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { Zahlung } from "./BaseClass";

/**
 * Fügt einer Kategorie eine neue Kategorie oder Zahlung hinzu.
 * @param {Object} baum - Die JSON-Baumstruktur.
 * @param {string} kategorieName - Der Name der Zielkategorie, der das Element hinzugefügt werden soll.
 * @param {Object} neuesElement - Das neue Element (Kategorie oder Zahlung).
 * @returns {boolean} - Gibt zurück, ob das Element erfolgreich hinzugefügt wurde.
 */
function elementHinzufuegen(baum, kategorieName, neuesElement) {
  if (baum.benutzername) {
    for (let ausgabe of baum.ausgaben) {
      elementHinzufuegen(ausgabe, kategorieName, neuesElement);
    }
    for (let einnahme of baum.einnahmen) {
      elementHinzufuegen(einnahme, kategorieName, neuesElement);
    }
  }

  // Prüfen, ob der aktuelle Knoten die Zielkategorie ist
  if (baum.typ === "kategorie" && baum.name === kategorieName) {
    // Neues Element zur Liste der Kinder hinzufügen
    if (!baum.kinder) {
      baum.kinder = [];
    }
    baum.kinder.push(neuesElement);
    console.log("Element hinzugefügt" + neuesElement);
    return true; // Element wurde erfolgreich hinzugefügt
  }

  // Rekursiv alle Kinder durchlaufen, wenn vorhanden
  if (baum.kinder && Array.isArray(baum.kinder)) {
    for (let kind of baum.kinder) {
      const hinzugefuegt = elementHinzufuegen(
        kind,
        kategorieName,
        neuesElement
      );
      if (hinzugefuegt) {
        return true; // Element wurde in einem Kind erfolgreich hinzugefügt
      }
    }
  }
  return false; // Zielkategorie nicht gefunden
}

// helper function that searches through the tree to see if the element exists
function findeElement(baum, name) {
  if (baum.benutzername) {
    for (let ausgabe of baum.ausgaben) {
      const element = findeElement(ausgabe, name);
      if (element) {
        return element;
      }
    }
    for (let einnahme of baum.einnahmen) {
      const element = findeElement(einnahme, name);
      if (element) {
        return element;
      }
    }
  }
  if (!baum.kinder || !Array.isArray(baum.kinder)) {
    return null; // No children to search
  }

  // Search in the children array of the current node
  for (let kind of baum.kinder) {
    if (kind.name === name) {
      return kind;
    }
  }

  // Recursively search in children
  for (let kind of baum.kinder) {
    if (kind.typ === "kategorie") {
      const element = findeElement(kind, name);
      if (element) {
        return element;
      }
    }
  }

  return null; // Element not found
}

/**
 * Löscht eine Kategorie oder Zahlung aus dem JSON-Baum.
 * @param {Object} baum - Die JSON-Baumstruktur.
 * @param {string} name - Der Name der Kategorie oder Zahlung, die gelöscht werden soll.
 * @returns {boolean} - Gibt zurück, ob das Element erfolgreich gelöscht wurde.
 */
function elementLoeschen(baum, name) {
  if (baum.benutzername) {
    for (let ausgabe of baum.ausgaben) {
      elementLoeschen(ausgabe, name);
    }
    for (let einnahme of baum.einnahmen) {
      elementLoeschen(einnahme, name);
    }
  }
  if (!baum.kinder || !Array.isArray(baum.kinder)) {
    return false; // Kein Kinder-Array vorhanden, nichts zu löschen
  }

  // Prevent deletion of root-level "Einnahme" or "Ausgabe" categories
  if ((baum.name === "Einnahme" || baum.name === "Ausgabe") && !baum.isRoot) {
    alert("Root-level categories cannot be deleted");
    return false; // Root-level categories cannot be deleted
  }

  // Suchen und löschen im kinder-Array des aktuellen Knotens
  const initialLength = baum.kinder.length;
  baum.kinder = baum.kinder.filter((kind) => kind.name !== name);

  // Wenn das Element gefunden und gelöscht wurde
  if (baum.kinder.length < initialLength) {
    return true;
  }

  // Rekursiv in die Kinder-Knoten gehen
  for (let kind of baum.kinder) {
    if (kind.typ === "kategorie") {
      const geloescht = elementLoeschen(kind, name);
      if (geloescht) {
        return true;
      }
    }
  }

  return false; // Ziel-Element wurde nicht gefunden
}

/**
 * Ersetzt eine Kategorie oder Zahlung aus dem JSON-Baum.
 * @param {Object} baum - Die JSON-Baumstruktur.
 * @param {string} name - Der Name der Kategorie oder Zahlung, die ersetzt werden soll.
 * @param {Object} neuesElement - Das neue Objekt
 * @returns {boolean} - Gibt zurück, ob das Element erfolgreich gelöscht wurde.
 */
function elementBearbeiten(baum, name, neuesElement) {
  if (baum.benutzername) {
    for (let ausgabe of baum.ausgaben) {
      elementBearbeiten(ausgabe, name, neuesElement);
    }
    for (let einnahme of baum.einnahmen) {
      elementBearbeiten(einnahme, name, neuesElement);
    }
  }
  if (!baum.kinder || !Array.isArray(baum.kinder)) {
    return false; // No children to edit
  }

  // Find the target element
  for (let i = 0; i < baum.kinder.length; i++) {
    if (baum.kinder[i].name === name) {
      const altesElement = baum.kinder[i];

      // Preserve children and replace the element
      neuesElement.kinder = altesElement.kinder || [];
      baum.kinder[i] = neuesElement;
      console.log("Element found and replaced" + name + neuesElement);
      return true; // Element found and replaced
    }
  }

  // Recursively search in children
  for (let kind of baum.kinder) {
    if (kind.typ === "kategorie") {
      const bearbeitet = elementBearbeiten(kind, name, neuesElement);
      if (bearbeitet) {
        return true; // Element edited successfully
      }
    }
  }

  return false; // Element not found
}

/**
 * Gives you the summed up amount of all payments in the given Kategorie/Zahlung.
 * @param {Object} baum - Part of the tree to sum up.
 * @param {Float} days - Number of days between Zahlungen.
 * @return {Float} - Amount of all payments in the category.
 */
function getSumOfPayments(baum, days) {
  let sum = 0;
  if (baum.benutzername) {
    for (let ausgabe of baum.ausgaben) {
      sum += getSumOfPayments(ausgabe, days);
    }
    for (let einnahme of baum.einnahmen) {
      sum += getSumOfPayments(einnahme, days);
    }
  }
  if (baum.typ === "zahlung") {
    console.log("Menge: " + baum.menge);
    let value = parseFloat(baum.menge) * (days / getDays(baum));
    return Math.round(value * 100) / 100;
  }
  if (!baum.kinder || !Array.isArray(baum.kinder)) {
    return 0;
  }
  for (let kind of baum.kinder) {
    sum += getSumOfPayments(kind, days);
  }
  console.log("Summe: " + sum);
  return Math.round(sum * 100) / 100;
}

/**
 * Gives you the summed up amount of all payments in the given Kategorie/Zahlung and timeframe.
 * @param {Object} baum - Part of the tree to sum up.
 * @param {Date} startDate - StartDate
 * @param {Date} endDate - EndDate
 * @return {Float} - Amount of all payments in the category and timeframe.
 */
function getZahlungenSummeInTimeFrame(baum, startDate, endDate) {
  let sum = 0;
  if (baum.benutzername) {
    for (let ausgabe of baum.ausgaben) {
      sum += getZahlungenSummeInTimeFrame(ausgabe, startDate, endDate);
    }
    for (let einnahme of baum.einnahmen) {
      sum += getZahlungenSummeInTimeFrame(einnahme, startDate, endDate);
    }
  }
  if (baum.typ === "zahlung") {
    let value = getSummeInTimeFrame(baum, startDate, endDate);
    console.log("Menge: " + value);
    return Math.round(value * 100) / 100;
  }
  if (!baum.kinder || !Array.isArray(baum.kinder)) {
    return 0;
  }
  for (let kind of baum.kinder) {
    sum += getZahlungenSummeInTimeFrame(kind, startDate, endDate);
  }
  console.log("Summe: " + sum);
  return Math.round(sum * 100) / 100;
}

//helper function
function getSummeInTimeFrame(zahlung, startDate, endDate) {
  let sum = 0;
  for (let erfolgteZahlung of zahlung.erfolgteZahlungen) {
    if (
      erfolgteZahlung.datum >= startDate &&
      erfolgteZahlung.datum <= endDate
    ) {
      sum += parseFloat(erfolgteZahlung.menge);
    }
  }
  return sum;
}

/**
 * Gives you the number of days between Zahlungen.
 * @param {Zahlung} zahlung - The Zahlung you want the days from.
 * @return {Float} - Number of days.
 */
function getDays(zahlung) {
  console.log("Zahlung " + JSON.stringify(zahlung));
  return (
    parseFloat(zahlung.regelmäßigkeit.time) *
    parseFloat(zahlung.regelmäßigkeit.anzahl)
  );
}

//helper function
function invertColor(hex) {
  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }
  // invert color components
  var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
    g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
    b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
  // pad each with zeros and return
  return "#" + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join("0");
  return (zeros + str).slice(-len);
}

export {
  elementHinzufuegen,
  elementLoeschen,
  elementBearbeiten,
  getSumOfPayments,
  getZahlungenSummeInTimeFrame,
  invertColor,
  findeElement,
};
