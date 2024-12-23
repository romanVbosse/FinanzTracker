class BaseClass {
  constructor(name, farbe, typ) {
    this.name = name;
    this.farbe = farbe;
    this.typ = typ;
  }
}

class Kategorie extends BaseClass {
  constructor(name, farbe) {
    super(name, farbe, "kategorie");
    this.kinder = [];
  }
}

class Zahlung extends BaseClass {
  constructor(name, farbe, menge, regelmäßigkeit, erfolgteZahlungen) {
    super(name, farbe, "zahlung");
    this.menge = menge;
    this.regelmäßigkeit = regelmäßigkeit;
    this.erfolgteZahlungen = erfolgteZahlungen;
  }
}

class erfolgteZahlung {
  constructor(datum, menge) {
    this.datum = datum;
    this.menge = menge;
  }
}

class Regularity {
  constructor(time, anzahl) {
    this.time = time;
    this.anzahl = anzahl;
  }
}

export { Kategorie, Zahlung, erfolgteZahlung, Regularity };
