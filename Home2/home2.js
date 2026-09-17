/* =========================================================
   WHY COMPOSTCARE - DYNAMIC NUMBER COUNTER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const whyStats = document.querySelectorAll(
    ".home2-why-number"
  );

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
      const progress = Math.min(
        elapsed / duration,
        1
      );

      /*
       * Ease-out animation
       */
      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      const currentValue =
        Math.floor(easedProgress * target);

      stat.textContent =
        currentValue.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        stat.textContent =
          target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(updateCounter);

  });

});