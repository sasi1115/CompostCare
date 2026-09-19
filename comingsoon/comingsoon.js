const comingTargetDate = new Date("2026-10-01T00:00:00").getTime();

function updateComingCountdown() {
  const now = new Date().getTime();
  const distance = comingTargetDate - now;

  const daysElement = document.getElementById("comingDays");

  const hoursElement = document.getElementById("comingHours");

  const minutesElement = document.getElementById("comingMinutes");

  const secondsElement = document.getElementById("comingSeconds");

  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
    return;
  }

  if (distance <= 0) {
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );

  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysElement.textContent = String(days).padStart(2, "0");

  hoursElement.textContent = String(hours).padStart(2, "0");

  minutesElement.textContent = String(minutes).padStart(2, "0");

  secondsElement.textContent = String(seconds).padStart(2, "0");
}

updateComingCountdown();

setInterval(updateComingCountdown, 1000);
