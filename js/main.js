document.addEventListener("DOMContentLoaded", async () => {
  const isInSubfolder = window.location.pathname.includes("/pages/");
  const basePath = isInSubfolder ? "../" : "./";
  const componentPath = basePath + "components/";

  // Función para cargar componentes HTML reutilizables
  const loadComponent = async (selector, fileName, replaceBase = false) => {
    const container = document.querySelector(selector);
    if (!container) return;

    try {
      const res = await fetch(componentPath + fileName);
      if (!res.ok) throw new Error(`No se pudo cargar ${fileName}`);
      let html = await res.text();

      if (replaceBase) {
        html = html.replaceAll("[[BASE]]", basePath);
      }

      container.innerHTML = html;
    } catch (err) {
      console.error(`Error al cargar ${fileName}:`, err);
    }
  };

  // Cargar header y footer
  await Promise.all([
    loadComponent("#header", "header.html", true),
    loadComponent("#footer", "footer.html")
  ]);

  // Inicializar navegación después de cargar el header
  initNavMenu();
});

/**
 * Activa el menú hamburguesa con accesibilidad y cierre automático.
 */
function initNavMenu() {
  const toggleBtn = document.querySelector(".nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener("click", () => {
    const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", String(!expanded));
    navMenu.classList.toggle("nav-open");
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("nav-open");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });
}
