import { STORAGE_KEYS, loadLocal, saveLocal } from "./config.js";
import { getCurrentUser, isOwner } from "./auth.js";

const paidBtn = document.getElementById("lb-paid-btn");
const errorEl = document.getElementById("lb-error");

const { email, role } = getCurrentUser();

if (!email || !role) {
  window.location.href = "/index.html";
}

if (isOwner(email)) {
  window.location.href = role === "client"
    ? "/client-dashboard.html"
    : "/washer-dashboard.html";
}

paidBtn.addEventListener("click", () => {
  const expires = Date.now() + 24 * 60 * 60 * 1000;
  saveLocal(STORAGE_KEYS.passExpires, expires);

  if (role === "client") {
    window.location.href = "/client-dashboard.html";
  } else {
    window.location.href = "/washer-dashboard.html";
  }
});
