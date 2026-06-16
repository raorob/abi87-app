interface Teilnehmer {
    name: string;
    email: string;
    timestamp: string;
}

interface DataFile {
    teilnehmer: Teilnehmer[];
}

document.getElementById("anmeldenForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;

    // 1. Bestehende Daten laden
    const res = await fetch("/data.json");
    const data: DataFile = await res.json();

    // 2. Neuen Teilnehmer hinzufügen
    data.teilnehmer.push({
        name,
        email,
        timestamp: new Date().toISOString()
    });

    // 3. Neue Daten an API senden
    await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    alert("Erfolgreich gespeichert!");
});
