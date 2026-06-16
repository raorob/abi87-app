import { checkAuth } from "./auth.js";
checkAuth();

const repoUrl = "https://api.github.com/repos/DEINUSER/DEINREPO/contents/public/data.json";
const token = "__GITHUB_TOKEN__"; // in Azure als Secret setzen

async function speichern(e: Event) {
  e.preventDefault();

  const eintrag = {
    vorname: (document.getElementById("vorname") as HTMLInputElement).value,
    name: (document.getElementById("name") as HTMLInputElement).value,
    geburtsname: (document.getElementById("geburtsname") as HTMLInputElement).value,
    email: (document.getElementById("email") as HTMLInputElement).value,
    leistungskurs: (document.getElementById("lk") as HTMLSelectElement).value,
    teilnahme: (document.getElementById("teilnahme") as HTMLInputElement).checked,
    timestamp: new Date().toISOString()
  };

  const file = await fetch(repoUrl, {
    headers: { "Authorization": `token ${token}` }
  }).then(r => r.json());

  const content = JSON.parse(atob(file.content));
  content.teilnehmer.push(eintrag);

  const update = {
    message: "Neuer Teilnehmer",
    content: btoa(JSON.stringify(content, null, 2)),
    sha: file.sha
  };

  await fetch(repoUrl, {
    method: "PUT",
    headers: {
      "Authorization": `token ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(update)
  });

  alert("Danke für deine Anmeldung!");
}

document.getElementById("form")!.addEventListener("submit", speichern);
