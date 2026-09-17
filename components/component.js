document.addEventListener("DOMContentLoaded", () => {
  loadNavbar();
  loadFooter();
});

/* =========================================================
   LOAD NAVBAR
========================================================= */

async function loadNavbar() {
  const navbarContainer = document.getElementById("navbar");

  if (!navbarContainer) {
    return;
  }

  try {
    const response = await fetch("../components/navbar.html");

    if (!response.ok) {
      throw new Error("Failed to load navbar");
    }

    const navbarHTML = await response.text();

    navbarContainer.innerHTML = navbarHTML;

    /* Navbar HTML is now available */
    initializeNavbar();
  } catch (error) {
    console.error("Navbar loading error:", error);
  }
}

/* =========================================================
   NAVBAR INITIALIZATION
========================================================= */

function initializeNavbar() {
  const headerActions = document.querySelector(".header-actions");
  const mainNavigation = document.querySelector(".main-navigation");
  const navList = document.querySelector(".nav-links");
  const loginLink = document.querySelector(".login-link");

  /* =======================================================
     CHECK REQUIRED ELEMENTS
  ======================================================= */

  if (!headerActions || !mainNavigation || !navList || !loginLink) {
    console.error("Navbar elements not found");
    return;
  }

  /* =======================================================
     CREATE MOBILE MENU BUTTON
  ======================================================= */

  const menuToggle = document.createElement("button");

  menuToggle.className = "mobile-menu-toggle";
  menuToggle.type = "button";

  menuToggle.setAttribute("aria-label", "Toggle navigation");

  menuToggle.setAttribute("aria-expanded", "false");

  menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

  /* =======================================================
     RESPONSIVE CHECK

     iPad Mini     768 × 1024
     Galaxy S8+    360 × 740
     Nest Hub      1024 × 600 → DESKTOP
  ======================================================= */

  function isMobileSize() {
    return window.innerWidth <= 768 && window.innerHeight <= 1024;
  }

  /* =======================================================
     GET DROPDOWN ITEMS
  ======================================================= */

  function getDropdownItems() {
    return document.querySelectorAll(".nav-item.dropdown");
  }

  /* =======================================================
     CLOSE ALL DROPDOWNS
  ======================================================= */

  function closeAllDropdowns(except = null) {
    getDropdownItems().forEach((dropdownItem) => {
      if (dropdownItem === except) {
        return;
      }

      dropdownItem.classList.remove("active");

      const dropdownLink = dropdownItem.querySelector(":scope > .nav-link");

      if (dropdownLink) {
        dropdownLink.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* =======================================================
     CLOSE MOBILE MENU
  ======================================================= */

  function closeMobileMenu() {
    mainNavigation.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

    closeAllDropdowns();

    initializeIcons();
  }

  /* =======================================================
     OPEN MOBILE MENU
  ======================================================= */

  function openMobileMenu() {
    mainNavigation.classList.add("active");

    menuToggle.setAttribute("aria-expanded", "true");

    menuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    initializeIcons();
  }

  /* =======================================================
     UPDATE LOGIN POSITION
  ======================================================= */

  function updateLoginPosition() {
    if (isMobileSize()) {
      /* MOBILE / IPAD */

      if (!navList.contains(loginLink)) {
        navList.appendChild(loginLink);
      }
    } else {
      /* DESKTOP / NEST HUB */

      if (!headerActions.contains(loginLink)) {
        headerActions.insertBefore(loginLink, headerActions.lastElementChild);
      }
    }
  }

  /* =======================================================
     UPDATE MOBILE BUTTON
  ======================================================= */

  function updateMobileButton() {
    updateLoginPosition();

    if (isMobileSize()) {
      /* MOBILE / IPAD */

      if (!headerActions.contains(menuToggle)) {
        headerActions.appendChild(menuToggle);
      }
    } else {
      /* DESKTOP */

      closeMobileMenu();

      menuToggle.remove();
    }
  }

  /* =======================================================
     MOBILE MENU TOGGLE
  ======================================================= */

  menuToggle.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    const isOpen = mainNavigation.classList.contains("active");

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  /* =======================================================
     MOBILE / IPAD DROPDOWN
     
    
  ======================================================= */
  /* =======================================================
   HOME DROPDOWN
   MOBILE / IPAD / DESKTOP / NEST HUB
======================================================= */

  const dropdownLinks = document.querySelectorAll(
    ".nav-item.dropdown > .nav-link",
  );

  dropdownLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      const dropdownItem = this.closest(".nav-item.dropdown");

      if (!dropdownItem) {
        return;
      }

      const isOpen = this.getAttribute("aria-expanded") === "true";

      /* ===================================================
       CLOSE OTHER DROPDOWNS
    =================================================== */

      closeAllDropdowns(dropdownItem);

      /* ===================================================
       TOGGLE CURRENT DROPDOWN
    =================================================== */

      if (isOpen) {
        dropdownItem.classList.remove("active");

        this.setAttribute("aria-expanded", "false");
      } else {
        dropdownItem.classList.add("active");

        this.setAttribute("aria-expanded", "true");
      }
    });
  });
  /* =======================================================
     NORMAL NAVIGATION LINKS
  ======================================================= */

  const normalNavLinks = document.querySelectorAll(
    ".nav-item:not(.dropdown) > .nav-link",
  );

  normalNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (isMobileSize()) {
        closeMobileMenu();
      }
    });
  });

  /* =======================================================
     DROPDOWN MENU LINKS
     
     Clicking Home1 / Home2 etc.
     closes mobile menu after navigation.
  ======================================================= */

  const dropdownMenuLinks = document.querySelectorAll(
    ".dropdown-menu .dropdown-link",
  );

  dropdownMenuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (isMobileSize()) {
        closeMobileMenu();
      }
    });
  });

  /* =======================================================
   ACTIVE NAVIGATION LINK
======================================================= */

  const currentPage = window.location.pathname.split("/").pop();

  /* =======================================================
   CLEAR ALL ACTIVE LINKS
======================================================= */

  document.querySelectorAll(".nav-link, .dropdown-link").forEach((link) => {
    link.classList.remove("active");
  });

  /* =======================================================
   NORMAL NAVIGATION LINKS
======================================================= */

  document
    .querySelectorAll(".nav-item:not(.dropdown) > .nav-link")
    .forEach((link) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      const linkPage = href.split("/").pop();

      if (linkPage === currentPage) {
        link.classList.add("active");
      }
    });

  /* =======================================================
   HOME DROPDOWN LINKS
======================================================= */

  const homeDropdown = document.querySelector(".nav-item.dropdown");

  const homeLink = homeDropdown?.querySelector(":scope > .nav-link");

  const homeDropdownLinks = homeDropdown?.querySelectorAll(
    ".dropdown-menu .dropdown-link",
  );

  /* =======================================================
   HOME 1 / HOME 2 ACTIVE STATE
======================================================= */

  if (homeDropdownLinks) {
    homeDropdownLinks.forEach((link) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      const linkPage = href.split("/").pop();

      if (linkPage === currentPage) {
        /* Activate Home */
        homeLink?.classList.add("active");

        /* Activate Home 1 or Home 2 */
        link.classList.add("active");
      }
    });
  }
  /* =======================================================
     RESIZE HANDLING
  ======================================================= */

  window.addEventListener("resize", updateMobileButton);

  /* =======================================================
     LUCIDE ICONS
  ======================================================= */

  function initializeIcons() {
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }

  /* =======================================================
     INITIAL NAVBAR SETUP
  ======================================================= */

  updateMobileButton();

  initializeIcons();
}

/* =========================================================
   LOAD FOOTER
========================================================= */

async function loadFooter() {
  const footerContainer = document.getElementById("footer");

  if (!footerContainer) {
    return;
  }

  try {
    const response = await fetch("../components/footer.html");

    if (!response.ok) {
      throw new Error("Failed to load footer");
    }

    const footerHTML = await response.text();

    footerContainer.innerHTML = footerHTML;

    initializeFooter();
  } catch (error) {
    console.error("Footer loading error:", error);
  }
}

/* =========================================================
   FOOTER INITIALIZATION
========================================================= */

function initializeFooter() {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}
