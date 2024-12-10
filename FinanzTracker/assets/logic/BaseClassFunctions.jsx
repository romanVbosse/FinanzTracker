import { Zahlung } from "./BaseClass";

/**
 * Fügt einer Kategorie eine neue Kategorie oder Zahlung hinzu.
 * @param {Object} baum - Die JSON-Baumstruktur.
 * @param {string} kategorieName - Der Name der Zielkategorie, der das Element hinzugefügt werden soll.
 * @param {Object} neuesElement - Das neue Element (Kategorie oder Zahlung).
 * @returns {boolean} - Gibt zurück, ob das Element erfolgreich hinzugefügt wurde.
 */
function elementHinzufuegen(baum, kategorieName, neuesElement) {
  //TODO: Check ob schon existiert
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
    // bitte den shit stehen lassen funktioniert nur wenn das hier steht?!?!??!?!?
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

export {
  elementHinzufuegen,
  elementLoeschen,
  elementBearbeiten,
  getSumOfPayments,
};
