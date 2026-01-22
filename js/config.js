export const OWNER_EMAIL = "boardwalkclay1@gmail.com";

export const STORAGE_KEYS = {
  email: "lb_email",
  role: "lb_role",
  passExpires: "lb_pass_expires"
};

export const ROLES = {
  client: "client",
  washer: "washer"
};

export function saveLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadLocal(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
