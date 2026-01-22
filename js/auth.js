import { OWNER_EMAIL, STORAGE_KEYS, loadLocal } from "./config.js";

export function getCurrentUser() {
  const email = loadLocal(STORAGE_KEYS.email);
  const role = loadLocal(STORAGE_KEYS.role);
  return { email, role };
}

export function isOwner(email) {
  if (!email) return false;
  return email.toLowerCase() === OWNER_EMAIL.toLowerCase();
}

export function hasActivePass() {
  const expires = loadLocal(STORAGE_KEYS.passExpires);
  if (!expires) return false;
  return Date.now() < expires;
}

export function requireAccessOrRedirect(targetRole) {
  const { email, role } = getCurrentUser();

  if (!email || !role || (targetRole && role !== targetRole)) {
    window.location.href = "/index.html";
    return;
  }

  if (isOwner(email)) return;

  if (!hasActivePass()) {
    window.location.href = "/paywall.html";
  }
}
