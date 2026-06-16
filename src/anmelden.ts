document.getElementById("anmeldenForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const vorname = (document.getElementById("vorname") as HTMLInputElement).value;
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const geburtsname = (document.getElementById("geburtsname") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const leistungskurs = (document.getElementById("leistungskurs") as HTMLSelectElement).value;

    const teilnahme = true;

    const res = await fetch("/data.json");
    const data = await res.json();

    data.teilnehmer.push({
        vorname,
        name,
        geburtsname,
        email,
        leistungskurs,
        teilnahme,
        timestamp: new Date().toISOString()
    });

    await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    alert("Erfolgreich gespeichert!");
});
