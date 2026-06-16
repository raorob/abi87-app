"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
(_a = document.getElementById("anmeldenForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const vorname = document.getElementById("vorname").value;
    const name = document.getElementById("name").value;
    const geburtsname = document.getElementById("geburtsname").value;
    const email = document.getElementById("email").value;
    const leistungskurs = document.getElementById("leistungskurs").value;
    const teilnahme = document.getElementById("teilnahme").checked;
    // 1. Bestehende Daten laden
    const res = yield fetch("/data.json");
    const data = yield res.json();
    // 2. Neuen Teilnehmer hinzufügen
    data.teilnehmer.push({
        vorname,
        name,
        geburtsname,
        email,
        leistungskurs,
        teilnahme,
        timestamp: new Date().toISOString()
    });
    // 3. API aufrufen → HIER passiert das Speichern
    yield fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    alert("Erfolgreich gespeichert!");
}));
