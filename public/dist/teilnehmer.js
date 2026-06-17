import { checkAuth } from "./auth.js";
checkAuth();
import { getBlobUrl } from "./config.js";
async function laden() {
    // Blob-URL erst hier laden → kein Top-Level-await nötig
    const blobUrl = await getBlobUrl();
    // 1. Daten aus Azure Blob Storage laden
    const data = await fetch(blobUrl).then(r => r.json());
    // 2. Tabelle füllen
    const tbody = document.getElementById("liste");
    tbody.innerHTML = "";
    data.teilnehmer.forEach((t) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${t.vorname}</td>
      <td>${t.name}</td>
      <td>${t.geburtsname || ""}</td>
      <td>${t.email}</td>
      <td>${t.leistungskurs}</td>
      <td>${t.teilnahme ? "Ja" : "Nein"}</td>
    `;
        tbody.appendChild(tr);
    });
}
laden();
