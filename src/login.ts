export async function login() {
  const pw = (document.getElementById("pw") as HTMLInputElement).value;
  const config = await fetch("/config.json").then(r => r.json());

  if (pw === config.password) {
    localStorage.setItem("auth", "ok");
    window.location.href = "anmelden.html";
  } else {
    alert("Falsches Passwort");
  }
}

(window as any).login = login;
