/* =========================================================
   WHY COMPOSTCARE - DYNAMIC NUMBER COUNTER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const whyStats = document.querySelectorAll(".home2-why-number");

  if (!whyStats.length) {
    return;
  }

  whyStats.forEach((stat) => {
    const target = Number(stat.dataset.target);
    const suffix = stat.dataset.suffix || "";

    if (isNaN(target)) {
      return;
    }

    const duration = 1800;
    let startTime = null;

    function updateCounter(currentTime) {
      if (!startTime) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      /*
       * Ease-out animation
       */
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(easedProgress * target);

      stat.textContent = currentValue.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        stat.textContent = target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(updateCounter);
  });
});
const compostMyths = [
  {
    number: "01",
    myth: "“Composting smells bad.”",
    mythDescription:
      "Many people believe that composting naturally creates unpleasant odors.",
    answer: "A healthy compost system should not smell bad.",
    explanation:
      "The right balance of organic material, moisture, and airflow helps create healthy compost without unpleasant odors.",
    tip: "Keep your compost balanced and well aerated.",
  },
  {
    number: "02",
    myth: "“You need a big garden to compost.”",
    mythDescription:
      "Many people assume composting only works when you have plenty of outdoor space.",
    answer: "You can compost even when space is limited.",
    explanation:
      "Compact composting solutions can work beautifully for balconies, patios, and smaller homes.",
    tip: "Choose a composting setup that fits your available space.",
  },
  {
    number: "03",
    myth: "“Composting takes too much time.”",
    mythDescription:
      "It can seem like composting requires constant attention and daily maintenance.",
    answer: "Composting can become a simple part of your routine.",
    explanation:
      "Once your system is set up, maintaining the right balance takes surprisingly little effort.",
    tip: "Keep your routine simple and let nature do the work.",
  },
  {
    number: "04",
    myth: "“Composting attracts pests.”",
    mythDescription:
      "Poorly managed compost can create conditions that attract unwanted visitors.",
    answer: "A well-managed compost system can stay clean and balanced.",
    explanation:
      "Keeping food scraps covered and maintaining the right balance helps create a cleaner compost environment.",
    tip: "Cover fresh food scraps and maintain a healthy carbon balance.",
  },
  {
    number: "05",
    myth: "“Very little waste can actually be composted.”",
    mythDescription:
      "It is easy to underestimate how much everyday organic waste can be composted.",
    answer: "A surprising amount of everyday organic waste can be composted.",
    explanation:
      "Fruit and vegetable scraps, coffee grounds, leaves, and many other organic materials can become valuable compost.",
    tip: "Look at your kitchen bin differently — many scraps have another purpose.",
  },
];

const compostMythNumber = document.getElementById("compostMythNumber");
const compostMythQuestion = document.getElementById("compostMythQuestion");
const compostMythDescription = document.getElementById(
  "compostMythDescription",
);
const compostMythAnswer = document.getElementById("compostMythAnswer");
const compostMythExplanation = document.getElementById(
  "compostMythExplanation",
);
const compostMythTip = document.getElementById("compostMythTip");
const compostMythCurrent = document.getElementById("compostMythCurrent");
const compostMythPrev = document.getElementById("compostMythPrev");
const compostMythNext = document.getElementById("compostMythNext");

let compostMythIndex = 0;

function updateCompostMyth(index) {
  compostMythIndex = (index + compostMyths.length) % compostMyths.length;

  const myth = compostMyths[compostMythIndex];

  compostMythNumber.textContent = myth.number;
  compostMythQuestion.textContent = myth.myth;
  compostMythDescription.textContent = myth.mythDescription;
  compostMythAnswer.textContent = myth.answer;
  compostMythExplanation.textContent = myth.explanation;
  compostMythCurrent.textContent = myth.number;

  compostMythTip.querySelector("p").textContent = myth.tip;

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

compostMythPrev.addEventListener("click", () => {
  updateCompostMyth(compostMythIndex - 1);
});

compostMythNext.addEventListener("click", () => {
  updateCompostMyth(compostMythIndex + 1);
});

document.addEventListener("keydown", (event) => {
  const section = document.getElementById("myths-reality");

  if (!section || !section.matches(":hover")) {
    return;
  }

  if (event.key === "ArrowLeft") {
    updateCompostMyth(compostMythIndex - 1);
  }

  if (event.key === "ArrowRight") {
    updateCompostMyth(compostMythIndex + 1);
  }
});

updateCompostMyth(0);
