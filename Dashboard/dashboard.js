/* =========================================================
   COMPOSTCARE DASHBOARD
   NAVIGATION + SIDEBAR + PROFILE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     ELEMENTS
  ======================================================== */

  const dashboardSidebar = document.getElementById("dashboardSidebar");

  const dashboardMenuToggle = document.getElementById("dashboardMenuToggle");

  const dashboardSidebarClose = document.getElementById(
    "dashboardSidebarClose",
  );

  const dashboardOverlay = document.getElementById("dashboardOverlay");

  const dashboardPageTitle = document.getElementById("dashboardPageTitle");

  const dashboardProfileButton = document.getElementById(
    "dashboardProfileButton",
  );

  const dashboardProfileDropdown = document.getElementById(
    "dashboardProfileDropdown",
  );

  const dashboardNotificationButton = document.getElementById(
    "dashboardNotificationButton",
  );

  const dashboardLogout = document.getElementById("dashboardLogout");

  const dashboardDropdownLogout = document.getElementById(
    "dashboardDropdownLogout",
  );

  const dashboardRtlToggle = document.getElementById("dashboardRtlToggle");

  const dashboardThemeToggle = document.getElementById("dashboardThemeToggle");

  

  /* =======================================================
     ALL DASHBOARD SECTIONS
  ======================================================== */

  const dashboardSections = document.querySelectorAll(".dashboard-section");

  /* =======================================================
     ALL NAVIGATION ITEMS
  ======================================================== */

  const dashboardNavItems = document.querySelectorAll(".dashboard-nav-item");

  /* =======================================================
     ALL SECTION BUTTONS
     Includes buttons inside dashboard content
  ======================================================== */

  const dashboardSectionButtons = document.querySelectorAll("[data-section]");

  /* =======================================================
     OPEN SIDEBAR
  ======================================================== */

  function openSidebar() {
    if (!dashboardSidebar) {
      return;
    }

    dashboardSidebar.classList.add("open");

    if (dashboardOverlay) {
      dashboardOverlay.classList.add("open");
    }

    if (dashboardMenuToggle) {
      dashboardMenuToggle.setAttribute("aria-expanded", "true");
    }

    document.body.classList.add("dashboard-sidebar-open");
  }

  /* =======================================================
     CLOSE SIDEBAR
  ======================================================== */

  function closeSidebar() {
    if (!dashboardSidebar) {
      return;
    }

    dashboardSidebar.classList.remove("open");

    if (dashboardOverlay) {
      dashboardOverlay.classList.remove("open");
    }

    if (dashboardMenuToggle) {
      dashboardMenuToggle.setAttribute("aria-expanded", "false");
    }

    document.body.classList.remove("dashboard-sidebar-open");
  }

  /* =======================================================
     MOBILE / TABLET MENU BUTTON
  ======================================================== */

  if (dashboardMenuToggle) {
    dashboardMenuToggle.addEventListener("click", () => {
      const isOpen = dashboardSidebar.classList.contains("open");

      if (isOpen) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  /* =======================================================
     SIDEBAR CLOSE BUTTON
  ======================================================== */

  if (dashboardSidebarClose) {
    dashboardSidebarClose.addEventListener("click", closeSidebar);
  }

  /* =======================================================
     OVERLAY CLICK
  ======================================================== */

  if (dashboardOverlay) {
    dashboardOverlay.addEventListener("click", closeSidebar);
  }

  /* =======================================================
     SHOW DASHBOARD SECTION
  ======================================================== */

  function showDashboardSection(sectionName) {
    if (!sectionName) {
      return;
    }

    /* -----------------------------------------------------
       HIDE ALL SECTIONS
    ------------------------------------------------------ */

    dashboardSections.forEach((section) => {
      section.classList.remove("active");
    });

    /* -----------------------------------------------------
       SHOW ONLY SELECTED SECTION
    ------------------------------------------------------ */

    const selectedSection = document.querySelector(
      `.dashboard-section[data-page="${sectionName}"]`,
    );

    if (selectedSection) {
      selectedSection.classList.add("active");
    }

    /* -----------------------------------------------------
       UPDATE ACTIVE SIDEBAR ITEM
    ------------------------------------------------------ */

    dashboardNavItems.forEach((item) => {
      item.classList.remove("active");

      if (item.dataset.section === sectionName) {
        item.classList.add("active");
      }
    });

   

    /* -----------------------------------------------------
       CLOSE PROFILE DROPDOWN
    ------------------------------------------------------ */

    closeProfileDropdown();

    /* -----------------------------------------------------
       CLOSE SIDEBAR ON IPAD / MOBILE
    ------------------------------------------------------ */

    closeSidebar();

    /* -----------------------------------------------------
       RETURN CONTENT TO TOP
    ------------------------------------------------------ */

    const dashboardContent = document.querySelector(".dashboard-content");

    if (dashboardContent) {
      dashboardContent.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  /* =======================================================
     NAVIGATION CLICK
  ======================================================== */

  dashboardSectionButtons.forEach((item) => {
    item.addEventListener("click", () => {
      const sectionName = item.dataset.section;

      showDashboardSection(sectionName);
    });
  });

  /* =======================================================
     PROFILE DROPDOWN
  ======================================================== */

  function openProfileDropdown() {
    if (!dashboardProfileDropdown) {
      return;
    }

    dashboardProfileDropdown.classList.add("open");

    if (dashboardProfileButton) {
      dashboardProfileButton.classList.add("active");

      dashboardProfileButton.setAttribute("aria-expanded", "true");
    }
  }

  function closeProfileDropdown() {
    if (!dashboardProfileDropdown) {
      return;
    }

    dashboardProfileDropdown.classList.remove("open");

    if (dashboardProfileButton) {
      dashboardProfileButton.classList.remove("active");

      dashboardProfileButton.setAttribute("aria-expanded", "false");
    }
  }

  if (dashboardProfileButton) {
    dashboardProfileButton.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen = dashboardProfileDropdown.classList.contains("open");

      if (isOpen) {
        closeProfileDropdown();
      } else {
        openProfileDropdown();
      }
    });
  }

  /* =======================================================
     CLOSE PROFILE WHEN CLICKING OUTSIDE
  ======================================================== */

  document.addEventListener("click", (event) => {
    if (
      dashboardProfileDropdown &&
      dashboardProfileButton &&
      !dashboardProfileDropdown.contains(event.target) &&
      !dashboardProfileButton.contains(event.target)
    ) {
      closeProfileDropdown();
    }
  });

  /* =======================================================
     NOTIFICATION BUTTON
  ======================================================== */

  if (dashboardNotificationButton) {
    dashboardNotificationButton.addEventListener("click", () => {
      /*
          Notification functionality can be connected
          when the notification panel is added.
        */

      console.log("Notifications clicked");
    });
  }

  /* =======================================================
     LOGOUT
  ======================================================== */

  function handleLogout() {
    /*
      Add your real authentication logout logic here
      when backend authentication is connected.
    */

    window.location.href = "../Login/login.html";
  }

  if (dashboardLogout) {
    dashboardLogout.addEventListener("click", handleLogout);
  }

  if (dashboardDropdownLogout) {
    dashboardDropdownLogout.addEventListener("click", handleLogout);
  }

  /* =======================================================
     THEME TOGGLE
     Uses the same localStorage concept across pages.
  ======================================================== */

  if (dashboardThemeToggle) {
    dashboardThemeToggle.addEventListener("click", () => {
      const currentTheme = document.body.classList.contains("dark-mode");

      const newTheme = !currentTheme;

      document.body.classList.toggle("dark-mode", newTheme);

      localStorage.setItem("theme", newTheme ? "dark" : "light");

      updateThemeIcon();
    });
  }

  /* =======================================================
     UPDATE THEME ICON
  ======================================================== */

  function updateThemeIcon() {
    if (!dashboardThemeToggle) {
      return;
    }

    const isDark = document.body.classList.contains("dark-mode");

    dashboardThemeToggle.innerHTML = `
      <i data-lucide="${isDark ? "moon" : "sun"}"></i>
    `;

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  /* =======================================================
     LOAD SAVED THEME
  ======================================================== */

  function loadSavedTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    updateThemeIcon();
  }

  /* =======================================================
     RTL TOGGLE
  ======================================================== */

  if (dashboardRtlToggle) {
    dashboardRtlToggle.addEventListener("click", () => {
      const currentDirection = document.documentElement.getAttribute("dir");

      const newDirection = currentDirection === "rtl" ? "ltr" : "rtl";

      document.documentElement.setAttribute("dir", newDirection);

      localStorage.setItem("direction", newDirection);
    });
  }

  /* =======================================================
     LOAD SAVED RTL
  ======================================================== */

  function loadSavedDirection() {
    const savedDirection = localStorage.getItem("direction");

    if (savedDirection === "rtl") {
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
    }
  }

  /* =======================================================
     PLAN BUTTONS
  ======================================================== */

  const planButtons = document.querySelectorAll("[data-plan]");

  planButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedPlan = button.dataset.plan;

      /*
        Payment / subscription functionality
        can be connected later.
      */

      console.log("Selected plan:", selectedPlan);
    });
  });

  /* =======================================================
     SCHEDULE PICKUP
  ======================================================== */

  const schedulePickupButton = document.getElementById("schedulePickupButton");

  if (schedulePickupButton) {
    schedulePickupButton.addEventListener("click", () => {
      const pickupDate = document.getElementById("pickupDate")?.value;

      const pickupTime = document.getElementById("pickupTime")?.value;

      if (!pickupDate || !pickupTime) {
        alert("Please select a pickup date and time.");

        return;
      }

      /*
          Backend/API integration can be connected here.
        */

      alert("Your pickup has been scheduled successfully.");
    });
  }

  /* =======================================================
     SAVE PROFILE
  ======================================================== */

  const saveProfileButton = document.getElementById("saveProfileButton");

  if (saveProfileButton) {
    saveProfileButton.addEventListener("click", () => {
      /*
          Backend profile update can be connected here.
        */

      alert("Your profile has been updated successfully.");
    });
  }

  /* =======================================================
     INITIAL PAGE
  ======================================================== */

  showDashboardSection("overview");

  /* =======================================================
     LOAD SAVED SETTINGS
  ======================================================== */

  loadSavedTheme();

  loadSavedDirection();

  /* =======================================================
     INITIAL LUCIDE ICONS
  ======================================================== */

  if (window.lucide) {
    lucide.createIcons();
  }
});
