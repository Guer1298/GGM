document.addEventListener("DOMContentLoaded", async () => {
  const isInSubfolder = window.location.pathname.includes("/pages/");
  const componentBasePath = isInSubfolder ? "../components/" : "components/";

  // Carga dinámica de un componente
  const loadComponent = async (selector, fileName) => {
    const container = document.querySelector(selector);
    const path = `${componentBasePath}${fileName}`;

    if (!container) return;

    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error(`No se pudo cargar ${path}`);
      container.innerHTML = await response.text();
    } catch (err) {
      console.error(`Error al cargar ${fileName}:`, err);
    }
  };

  // Cargar header y footer
  await Promise.all([
    loadComponent("#header", "header.html"),
    loadComponent("#footer", "footer.html")
  ]);

  // Inicializar menú responsive después de cargar el header
  initNavMenu();
});

function initNavMenu() {
  const toggleBtn = document.querySelector(".nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener("click", () => {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", String(!isExpanded));
    navMenu.classList.toggle("nav-open");
  });

  // Cierra el menú en móviles al hacer clic en un enlace
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("nav-open");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const isInPages = window.location.pathname.includes("/pages/");
  const basePath = isInPages ? "../" : "./";

  try {
    // Cargar header
    const headerRes = await fetch(basePath + "components/header.html");
    let headerHtml = await headerRes.text();
    headerHtml = headerHtml.replaceAll("[[BASE]]", basePath);
    document.getElementById("header").innerHTML = headerHtml;

    // Cargar footer
    const footerRes = await fetch(basePath + "components/footer.html");
    document.getElementById("footer").innerHTML = await footerRes.text();

    // Activar menú responsive
    initNavMenu();

  } catch (error) {
    console.error("Error al cargar componentes:", error);
  }
});

function initNavMenu() {
  const toggleBtn = document.querySelector(".nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", () => {
      const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
      toggleBtn.setAttribute("aria-expanded", String(!isExpanded));
      navMenu.classList.toggle("nav-open");
    });

    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("nav-open");
        toggleBtn.setAttribute("aria-expanded", "false");
      });
    });
  }
}

