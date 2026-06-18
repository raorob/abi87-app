export function initLoader() {
    window.addEventListener("load", () => {
        document.body.classList.add("loaded");
    });
}
// global verfügbar machen, falls nötig
window.initLoader = initLoader;
