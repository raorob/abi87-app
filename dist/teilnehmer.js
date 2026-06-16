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
function laden() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetch("/data.json").then(r => r.json());
        const tbody = document.getElementById("liste");
        tbody.innerHTML = "";
        data.teilnehmer.forEach((t) => {
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
    });
}
laden();
