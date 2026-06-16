var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function login() {
    return __awaiter(this, void 0, void 0, function* () {
        const pw = document.getElementById("pw").value;
        const config = yield fetch("/config.json").then(r => r.json());
        if (pw === config.password) {
            localStorage.setItem("auth", "ok");
            window.location.href = "anmelden.html";
        }
        else {
            alert("Falsches Passwort");
        }
    });
}
window.login = login;
