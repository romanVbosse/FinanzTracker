/**
 * Fügt einer Kategorie eine neue Kategorie oder Zahlung hinzu.
 * @param {Object} baum - Die JSON-Baumstruktur.
 * @param {string} kategorieName - Der Name der Zielkategorie, der das Element hinzugefügt werden soll.
 * @param {Object} neuesElement - Das neue Element (Kategorie oder Zahlung).
 * @returns {boolean} - Gibt zurück, ob das Element erfolgreich hinzugefügt wurde.
 */
function kategorieHinzufuegen(baum, kategorieName, neuesElement) {
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
        const hinzugefuegt = kategorieHinzufuegen(kind, kategorieName, neuesElement);
        if (hinzugefuegt) {
          return true; // Element wurde in einem Kind erfolgreich hinzugefügt
        }
      }
    }
  
    return false; // Zielkategorie nicht gefunden
  }
  
  export { kategorieHinzufuegen }