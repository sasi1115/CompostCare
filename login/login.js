document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("loginPassword");
  const passwordToggle = document.getElementById("loginPasswordToggle");

  if (!passwordInput || !passwordToggle) {
    return;
  }

  passwordToggle.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";

    passwordInput.type = isHidden ? "text" : "password";

    passwordToggle.setAttribute(
      "aria-label",
      isHidden ? "Hide password" : "Show password",
    );

    const icon = passwordToggle.querySelector("svg");

    if (icon) {
      icon.setAttribute("data-lucide", isHidden ? "eye-off" : "eye");

      if (window.lucide) {
        lucide.createIcons();
      }
    }
  });
});
