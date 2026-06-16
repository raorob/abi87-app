export function checkAuth() {
    if (localStorage.getItem("auth") !== "ok") {
        window.location.href = "login.html";
    }
}
