/**
 * Fügt einer Kategorie eine neue Kategorie oder Zahlung hinzu.
 * @param {Object} baum - Die JSON-Baumstruktur.
 * @param {string} kategorieName - Der Name der Zielkategorie, der das Element hinzugefügt werden soll.
 * @param {Object} neuesElement - Das neue Element (Kategorie oder Zahlung).
 * @returns {boolean} - Gibt zurück, ob das Element erfolgreich hinzugefügt wurde.
 */
function elementHinzufuegen(baum, kategorieName, neuesElement) {
  //TODO: Check ob schon existiert
   if(baum.benutzername) {
    for (let ausgabe of baum.ausgaben) {
      elementHinzufuegen(ausgabe, kategorieName, neuesElement);
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
        const hinzugefuegt = elementHinzufuegen(kind, kategorieName, neuesElement);
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
  if(baum.benutzername) {
    for (let ausgabe of baum.ausgaben) {
      elementLoeschen(ausgabe, name);
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
  
  
  export { elementHinzufuegen, elementLoeschen };