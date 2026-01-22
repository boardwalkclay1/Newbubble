import { OWNER_EMAIL, STORAGE_KEYS, ROLES, saveLocal } from "/js/config.js";

const emailInput = document.getElementById("lb-email-input");
const roleButtons = document.querySelectorAll(".lb-role-btn");
const continueBtn = document.getElementById("lb-continue-btn");
const errorEl = document.getElementById("lb-error");

let selectedRole = null;

roleButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    roleButtons.forEach(b => b.classList.remove("lb-role-selected"));
    btn.classList.add("lb-role-selected");
    selectedRole = btn.dataset.role;
    errorEl.textContent = "";
  });
});

continueBtn.addEventListener("click", () => {
  const email = (emailInput.value || "").trim().toLowerCase();

  if (!email) {
    errorEl.textContent = "Enter your email to continue.";
    return;
  }

  if (!selectedRole) {
    errorEl.textContent = "Choose whether you're a client or washer.";
    return;
  }

  saveLocal(STORAGE_KEYS.email, email);
  saveLocal(STORAGE_KEYS.role, selectedRole);

  if (email === OWNER_EMAIL.toLowerCase()) {
    if (selectedRole === ROLES.client) {
      window.location.href = "/client-dashboard.html";
    } else {
      window.location.href = "/washer-dashboard.html";
    }
    return;
  }

  window.location.href = "/paywall.html";
});
