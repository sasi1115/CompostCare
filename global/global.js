/* =========================================================
   GLOBAL STORAGE
   ========================================================= */

const THEME_STORAGE_KEY = "theme";
const DIRECTION_STORAGE_KEY = "direction";


/* =========================================================
   APPLY SAVED THEME IMMEDIATELY
   ========================================================= */

function applySavedTheme() {

    const savedTheme =
        localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

    } else {

        document.body.classList.remove("dark-mode");

    }
}


/* =========================================================
   APPLY SAVED RTL / LTR IMMEDIATELY
   ========================================================= */

function applySavedDirection() {

    const savedDirection =
        localStorage.getItem(DIRECTION_STORAGE_KEY);

    document.documentElement.setAttribute(
        "dir",
        savedDirection === "rtl"
            ? "rtl"
            : "ltr"
    );
}


/* =========================================================
   APPLY SAVED SETTINGS
   ========================================================= */

function applySavedSettings() {

    applySavedTheme();
    applySavedDirection();

}


/* =========================================================
   NAVBAR
   ========================================================= */

function initNavbar() {

    const headerActions =
        document.querySelector(".header-actions");

    const navbar =
        document.querySelector(".navbar");

    if (!headerActions || !navbar) {
        return;
    }


    /* =====================================================
       PREVENT DUPLICATE INITIALIZATION
    ===================================================== */

    if (navbar.dataset.initialized === "true") {
        return;
    }

    navbar.dataset.initialized = "true";


    /* =====================================================
       MOBILE MENU BUTTON
    ===================================================== */

    const menuBtn =
        document.createElement("button");

    menuBtn.className = "menu-btn";
    menuBtn.type = "button";

    menuBtn.setAttribute(
        "aria-label",
        "Toggle navigation"
    );

    menuBtn.setAttribute(
        "aria-expanded",
        "false"
    );

    menuBtn.innerHTML =
        '<i class="fa-solid fa-bars"></i>';


    /* =====================================================
       RESPONSIVE BREAKPOINT

       iPad Mini      → 768 × 1024
       Samsung S8+    → 360 × 740
       Nest Hub       → 1024 × 600 = DESKTOP

       No device detection.
       Width + height only.
    ===================================================== */

    const mobileBreakpoint =
        window.matchMedia(
            "(max-width: 768px) and (max-height: 1024px)"
        );


    /* =====================================================
       UPDATE NAVBAR
    ===================================================== */

    function updateNavbar() {

        if (mobileBreakpoint.matches) {

            /* ---------------------------------------------
               iPAD MINI / SAMSUNG S8+
            --------------------------------------------- */

            if (!headerActions.contains(menuBtn)) {

                headerActions.appendChild(menuBtn);

            }

        } else {

            /* ---------------------------------------------
               DESKTOP / NEST HUB
            --------------------------------------------- */

            menuBtn.remove();

            navbar.classList.remove("active");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            menuBtn.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        }

    }


    /* Initial check */

    updateNavbar();


    /* Check when screen size changes */

    if (mobileBreakpoint.addEventListener) {

        mobileBreakpoint.addEventListener(
            "change",
            updateNavbar
        );

    } else {

        mobileBreakpoint.addListener(
            updateNavbar
        );

    }


    /* =====================================================
       MOBILE MENU CLICK
    ===================================================== */

    menuBtn.addEventListener(
        "click",
        function () {

            navbar.classList.toggle("active");

            const isOpen =
                navbar.classList.contains("active");


            menuBtn.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );


            const icon =
                menuBtn.querySelector("i");

            if (!icon) {
                return;
            }


            if (isOpen) {

                icon.classList.replace(
                    "fa-bars",
                    "fa-xmark"
                );

            } else {

                icon.classList.replace(
                    "fa-xmark",
                    "fa-bars"
                );

            }

        }
    );

}



/* =========================================================
   MOBILE DROPDOWN
   ========================================================= */

function initMobileDropdown() {

    const dropdown =
        document.querySelector(".dropdown");

    if (!dropdown) {
        return;
    }


    /* Prevent duplicate initialization */

    if (dropdown.dataset.initialized === "true") {
        return;
    }

    dropdown.dataset.initialized = "true";


    const link =
        dropdown.querySelector(":scope > a");

    if (!link) {
        return;
    }


    link.addEventListener(
        "click",
        function (e) {

            const mobileBreakpoint =
                window.matchMedia(
                    "(max-width: 768px) and (max-height: 1024px)"
                );


            if (mobileBreakpoint.matches) {

                e.preventDefault();

                dropdown.classList.toggle(
                    "active"
                );

            }

        }
    );

}



/* =========================================================
   ACTIVE NAVIGATION LINK
   ========================================================= */

function setActiveLink() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    const links =
        document.querySelectorAll(
            ".navbar a"
        );


    links.forEach(function (link) {

        const href =
            link.getAttribute("href");

        if (!href || href === "#") {
            return;
        }


        const page =
            href.split("/")
                .pop()
                .split("?")[0];


        if (page === currentPage) {

            link.classList.add("active");


            const dropdown =
                link.closest(".dropdown");


            if (dropdown) {

                const dropdownLink =
                    dropdown.querySelector(
                        ":scope > a"
                    );

                if (dropdownLink) {

                    dropdownLink.classList.add(
                        "active"
                    );

                }

            }

        }

    });

}



/* =========================================================
   DARK / LIGHT MODE
   ========================================================= */

function initTheme() {

    const themeToggle =
        document.getElementById(
            "themeToggle"
        );

    /*
     * Even if the theme button does not exist,
     * saved theme should still be applied.
     */

    applySavedTheme();


    if (!themeToggle) {
        return;
    }


    /* =====================================================
       PREVENT DUPLICATE EVENT LISTENER
    ===================================================== */

    if (themeToggle.dataset.initialized === "true") {

        updateThemeIcon();

        return;
    }

    themeToggle.dataset.initialized = "true";


    /* =====================================================
       UPDATE ICON
    ===================================================== */

    updateThemeIcon();


    /* =====================================================
       THEME BUTTON
    ===================================================== */

    themeToggle.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "dark-mode"
            );


            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );


            /*
             * SAVE THEME
             *
             * dark  → dark mode
             * light → light mode
             */

            localStorage.setItem(
                THEME_STORAGE_KEY,
                isDark
                    ? "dark"
                    : "light"
            );


            updateThemeIcon();

        }
    );

}



/* =========================================================
   THEME ICON
   ========================================================= */

function updateThemeIcon() {

    const themeToggle =
        document.getElementById(
            "themeToggle"
        );

    if (!themeToggle) {
        return;
    }


    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    themeToggle.innerHTML =
        isDark
            ? '<i data-lucide="sun"></i>'
            : '<i data-lucide="moon"></i>';


    themeToggle.setAttribute(
        "aria-pressed",
        isDark
            ? "true"
            : "false"
    );


    if (
        typeof lucide !== "undefined"
    ) {

        lucide.createIcons();

    }

}



/* =========================================================
   RTL / LTR
   ========================================================= */

function initRTL() {

    const rtlToggle =
        document.getElementById(
            "rtlToggle"
        );


    /*
     * Always apply saved direction,
     * even when RTL button doesn't exist.
     */

    applySavedDirection();


    if (!rtlToggle) {
        return;
    }


    /* =====================================================
       PREVENT DUPLICATE EVENT LISTENER
    ===================================================== */

    if (rtlToggle.dataset.initialized === "true") {

        updateRTLButton();

        return;
    }

    rtlToggle.dataset.initialized = "true";


    /* =====================================================
       UPDATE BUTTON
    ===================================================== */

    updateRTLButton();


    /* =====================================================
       RTL BUTTON
    ===================================================== */

    rtlToggle.addEventListener(
        "click",
        function () {

            const currentDirection =
                document.documentElement
                    .getAttribute("dir");


            const newDirection =
                currentDirection === "rtl"
                    ? "ltr"
                    : "rtl";


            /*
             * APPLY NEW DIRECTION
             */

            document.documentElement.setAttribute(
                "dir",
                newDirection
            );


            /*
             * SAVE NEW DIRECTION
             */

            localStorage.setItem(
                DIRECTION_STORAGE_KEY,
                newDirection
            );


            updateRTLButton();

        }
    );

}



/* =========================================================
   RTL BUTTON
   ========================================================= */

function updateRTLButton() {

    const rtlToggle =
        document.getElementById(
            "rtlToggle"
        );

    if (!rtlToggle) {
        return;
    }


    const isRTL =
        document.documentElement
            .getAttribute("dir") === "rtl";


    /*
     * IMPORTANT:
     * Button text stays LTR.
     *
     * RTL mode  → LTR
     * LTR mode  → RTL
     */

    rtlToggle.textContent =
        isRTL
            ? "LTR"
            : "RTL";


    rtlToggle.setAttribute(
        "aria-pressed",
        isRTL
            ? "true"
            : "false"
    );


    /*
     * Keep button text direction LTR
     */

    rtlToggle.style.direction = "ltr";
    rtlToggle.style.unicodeBidi = "isolate";

}



/* =========================================================
   LUCIDE ICONS
   ========================================================= */

function initializeLucideIcons() {

    if (
        typeof lucide !== "undefined"
    ) {

        lucide.createIcons();

    }

}



/* =========================================================
   WAIT FOR NAVBAR
   ========================================================= */

function initializeGlobalFeatures() {

    /*
     * ALWAYS APPLY SAVED SETTINGS FIRST
     *
     * This means every page remembers:
     *
     * Theme  → dark / light
     * RTL    → rtl / ltr
     */

    applySavedSettings();


    const navbar =
        document.querySelector(".navbar");

    const headerActions =
        document.querySelector(".header-actions");

    const themeToggle =
        document.getElementById(
            "themeToggle"
        );

    const rtlToggle =
        document.getElementById(
            "rtlToggle"
        );


    /*
     * Navbar may be inserted dynamically.
     *
     * Wait only for navbar elements.
     *
     * Theme and RTL do NOT depend on
     * both buttons existing anymore.
     */

    if (
        navbar &&
        headerActions
    ) {

        initNavbar();
        initMobileDropdown();
        setActiveLink();

    }


    /*
     * Initialize theme whenever its
     * button is available.
     */

    if (themeToggle) {

        initTheme();

    }


    /*
     * Initialize RTL whenever its
     * button is available.
     */

    if (rtlToggle) {

        initRTL();

    }


    /*
     * Initialize Lucide icons.
     */

    initializeLucideIcons();


    /*
     * If navbar/buttons are dynamically loaded,
     * check again after a short delay.
     */

    if (
        !navbar ||
        !headerActions ||
        !themeToggle ||
        !rtlToggle
    ) {

        setTimeout(
            initializeGlobalFeatures,
            50
        );

    }

}



/* =========================================================
   START
   ========================================================= */

/*
 * Apply saved theme + RTL immediately.
 */

applySavedSettings();


/*
 * Wait until DOM is ready.
 */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeGlobalFeatures
    );

} else {

    initializeGlobalFeatures();

}
/* =========================================================
   SCROLL REVEAL MOTION
   Adds fade-up / fade-left / fade-right / scale effects to
   existing page content without requiring HTML changes.
   ========================================================= */

function initScrollRevealMotion() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const selectors = [
        "main section h1", "main section h2", "main section h3",
        "main section p", "main section [class*='card']",
        "main section [class*='image']", "main section [class*='content']",
        "section h1", "section h2", "section h3",
        "section [class*='card']"
    ];

    const elements = [...new Set(document.querySelectorAll(selectors.join(",")))].filter((el) => {
        return !el.closest(".site-header, .navbar, .main-navigation, .dropdown-menu, footer") &&
               !el.classList.contains("reveal-motion");
    });

    elements.forEach((el, index) => {
        el.classList.add("reveal-motion");

        const className = (el.className || "").toString().toLowerCase();
        const isImage = el.tagName === "IMG" || className.includes("image") || className.includes("visual");
        const isCard = className.includes("card");

        if (isImage) {
            el.classList.add(index % 2 === 0 ? "fade-right" : "fade-left");
        } else if (isCard) {
            el.classList.add("fade-up", `motion-delay-${(index % 4) + 1}`);
        } else {
            el.classList.add("fade-up");
        }
    });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -45px 0px" });

    elements.forEach((el) => observer.observe(el));
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initScrollRevealMotion);
} else {
    initScrollRevealMotion();
}
