document.getElementById("anmeldenForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const vorname = (document.getElementById("vorname") as HTMLInputElement).value;
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const geburtsname = (document.getElementById("geburtsname") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const leistungskurs = (document.getElementById("leistungskurs") as HTMLSelectElement).value;
    const teilnahme = (document.getElementById("teilnahme") as HTMLInputElement).checked;

    // 1. Bestehende Daten laden
    const res = await fetch("/data.json");
    const data = await res.json();

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
    await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    alert("Erfolgreich gespeichert!");
});
