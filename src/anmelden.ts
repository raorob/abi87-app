import { checkAuth } from "./auth.js";
checkAuth();

import { getBlobUrl } from "./config.js";

document.getElementById("anmeldenForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const button = (e.submitter as HTMLButtonElement);
    button.disabled = true;

    const vorname = (document.getElementById("vorname") as HTMLInputElement).value.trim();
    const name = (document.getElementById("name") as HTMLInputElement).value.trim();
    const geburtsname = (document.getElementById("geburtsname") as HTMLInputElement).value.trim();
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const leistungskurs = (document.getElementById("leistungskurs") as HTMLSelectElement).value;

    const blobUrl = await getBlobUrl();

    // 1. Bestehende Datei laden
    const res = await fetch(blobUrl);
    const data = await res.json();

    // 2. Prüfen, ob Teilnehmer bereits existiert
    const exists = data.teilnehmer.some((t: any) =>
        t.vorname.toLowerCase() === vorname.toLowerCase() &&
        t.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
        alert(`${vorname} ${name} ist bereits angemeldet.`);
        button.disabled = false; // wieder aktivieren
        return;
    }

    // 3. Neuen Teilnehmer hinzufügen
    data.teilnehmer.push({
        vorname,
        name,
        geburtsname,
        email,
        leistungskurs,
        teilnahme: true,
        timestamp: new Date().toISOString()
    });

    // 4. JSON in Blob umwandeln
    const updatedBlob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json"
    });

    // 5. Datei zurück in Blob Storage hochladen
    const uploadRes = await fetch(blobUrl, {
        method: "PUT",
        headers: {
            "x-ms-blob-type": "BlockBlob",
            "Content-Type": "application/json"
        },
        body: updatedBlob
    });

    if (!uploadRes.ok) {
        alert("Fehler beim Speichern in Azure Blob Storage");
        button.disabled = false;
        return;
    }

    alert("Anmeldung war erfolgreich!");
});
