import { checkAuth } from "./auth.js";
checkAuth();

async function laden() {
  const data = await fetch("/data.json").then(r => r.json());
  const tbody = document.getElementById("liste") as HTMLTableSectionElement;

  tbody.innerHTML = "";

  data.teilnehmer.forEach((t: any) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${t.vorname}</td>
      <td>${t.name}</td>
      <td>${t.geburtsname}</td>
      <td>${t.email}</td>
      <td>${t.leistungskurs}</td>
      <td>${t.teilnahme ? "Ja" : "Nein"}</td>
    `;
    tbody.appendChild(tr);
  });
}

laden();
