var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { checkAuth } from "./auth.js";
checkAuth();
const repoUrl = "https://api.github.com/repos/DEINUSER/DEINREPO/contents/public/data.json";
const token = "__GITHUB_TOKEN__"; // in Azure als Secret setzen
function speichern(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const eintrag = {
            vorname: document.getElementById("vorname").value,
            name: document.getElementById("name").value,
            geburtsname: document.getElementById("geburtsname").value,
            email: document.getElementById("email").value,
            leistungskurs: document.getElementById("lk").value,
            teilnahme: document.getElementById("teilnahme").checked,
            timestamp: new Date().toISOString()
        };
        const file = yield fetch(repoUrl, {
            headers: { "Authorization": `token ${token}` }
        }).then(r => r.json());
        const content = JSON.parse(atob(file.content));
        content.teilnehmer.push(eintrag);
        const update = {
            message: "Neuer Teilnehmer",
            content: btoa(JSON.stringify(content, null, 2)),
            sha: file.sha
        };
        yield fetch(repoUrl, {
            method: "PUT",
            headers: {
                "Authorization": `token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(update)
        });
        alert("Danke für deine Anmeldung!");
    });
}
document.getElementById("form").addEventListener("submit", speichern);
