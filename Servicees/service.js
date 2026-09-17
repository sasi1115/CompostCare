/* =========================================================
   SERVICES FILTER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".services-filter-button");

  const serviceCards = document.querySelectorAll(".services-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.filter;

      /* ---------------------------------------------
               UPDATE ACTIVE BUTTON
            --------------------------------------------- */

      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      /* ---------------------------------------------
               SHOW ONLY SELECTED CATEGORY
            --------------------------------------------- */

      serviceCards.forEach((card) => {
        const cardCategory = card.dataset.category;

        if (cardCategory === selectedCategory) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  /* ---------------------------------------------
       SHOW HOME SERVICES BY DEFAULT
    --------------------------------------------- */

  serviceCards.forEach((card) => {
    if (card.dataset.category === "home") {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});
/* =========================================================
   WASTE IMPACT CALCULATOR
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const spaceSelect = document.getElementById("wasteSpace");
  const peopleSelect = document.getElementById("wastePeople");
  const wasteLevelSelect = document.getElementById("wasteLevel");

  const calculateButton = document.getElementById("calculateWasteButton");

  const monthlyWaste = document.getElementById("monthlyWaste");

  const yearlyWaste = document.getElementById("yearlyWaste");

  const potentialCompost = document.getElementById("potentialCompost");

  const resultMessage = document.getElementById("wasteResultMessage");

  /* =====================================================
       WASTE CALCULATION DATA
    ===================================================== */

  const wasteRates = {
    low: 0.35,
    medium: 0.55,
    high: 0.75,
  };

  /* =====================================================
       SPACE LABELS
    ===================================================== */

  const spaceLabels = {
    home: "home composting solution",
    apartment: "community composting solution",
    office: "workplace composting solution",
    commercial: "commercial composting solution",
  };

  /* =====================================================
       CALCULATE IMPACT
    ===================================================== */

  calculateButton.addEventListener("click", () => {
    const space = spaceSelect.value;
    const people = Number(peopleSelect.value);
    const wasteLevel = wasteLevelSelect.value;

    /* ---------------------------------------------
           VALIDATION
        --------------------------------------------- */

    if (!space || !people || !wasteLevel) {
      resultMessage.textContent =
        "Please select all three options to calculate your estimated impact.";

      return;
    }

    /* ---------------------------------------------
           MONTHLY WASTE
        --------------------------------------------- */

    const dailyWaste = people * wasteRates[wasteLevel];

    const monthly = Math.round(dailyWaste * 30);

    /* ---------------------------------------------
           YEARLY WASTE
        --------------------------------------------- */

    const yearly = monthly * 12;

    /* ---------------------------------------------
           ESTIMATED COMPOST
           Approx. 40% of organic waste
        --------------------------------------------- */

    const compost = Math.round(monthly * 0.4);

    /* ---------------------------------------------
           UPDATE RESULTS
        --------------------------------------------- */

    monthlyWaste.textContent = `${monthly} kg`;

    yearlyWaste.textContent = `${yearly} kg`;

    potentialCompost.textContent = `~${compost} kg`;

    /* ---------------------------------------------
           UPDATE MESSAGE
        --------------------------------------------- */

    resultMessage.textContent = `Based on your selections, your space may benefit from a ${spaceLabels[space]}.`;

    /* ---------------------------------------------
           SCROLL RESULT INTO VIEW ON MOBILE
        --------------------------------------------- */

    if (window.innerWidth <= 768) {
      document.querySelector(".waste-calculator-result").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

