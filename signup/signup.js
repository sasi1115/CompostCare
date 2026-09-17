/* =========================================================
   PASSWORD SHOW / HIDE
========================================================= */

const signupPassword = document.getElementById("signupPassword");
const signupPasswordToggle = document.getElementById("signupPasswordToggle");

const signupConfirmPassword = document.getElementById("signupConfirmPassword");
const signupConfirmPasswordToggle = document.getElementById(
  "signupConfirmPasswordToggle",
);

/* =========================================================
   TOGGLE PASSWORD
========================================================= */

function toggleSignupPassword(input, button) {
  if (!input || !button) {
    return;
  }

  const isHidden = input.type === "password";

  input.type = isHidden ? "text" : "password";

  button.setAttribute(
    "aria-label",
    isHidden ? "Hide password" : "Show password",
  );

  button.innerHTML = `
    <i data-lucide="${isHidden ? "eye-off" : "eye"}"></i>
  `;

  if (window.lucide) {
    lucide.createIcons();
  }
}

/* =========================================================
   PASSWORD EYE CLICK
========================================================= */

if (signupPasswordToggle) {
  signupPasswordToggle.addEventListener("click", function () {
    toggleSignupPassword(signupPassword, signupPasswordToggle);
  });
}

/* =========================================================
   CONFIRM PASSWORD EYE CLICK
========================================================= */

if (signupConfirmPasswordToggle) {
  signupConfirmPasswordToggle.addEventListener("click", function () {
    toggleSignupPassword(signupConfirmPassword, signupConfirmPasswordToggle);
  });
}
