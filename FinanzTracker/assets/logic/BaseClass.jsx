  class BaseClass {
    constructor(name, farbe) {
      this.name = name;
      this.farbe = farbe;
    }
  }
  
  class Kategorie extends BaseClass {
    constructor(name, farbe) {
      super(name, farbe);
      this.zahlungen = []; // Hier entweder Wieder Kategorie oder Zahlung rein
    }
  }
  
  class Zahlung extends BaseClass {
    constructor(name, farbe, menge, regelmäßigkeit) {
      super(name, farbe);
      this.menge = menge;
      this.regelmäßigkeit = regelmäßigkeit; // Regelmäßigkeit in Tagen
      this.erfolgteZahlungen = []; // Liste von Beträgen
    }

    addErfolgteZahlung(betrag) {
      this.erfolgteZahlungen.push(betrag);
    }
  }

  class erfolgteZahlung {
    constructor(datum, menge){
        this.datum = datum;
        this.menge = menge;
    }
  }
  
  export { Kategorie, Zahlung, erfolgteZahlung };
  