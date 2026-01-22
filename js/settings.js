import { requireAccessOrRedirect, getCurrentUser } from "./auth.js";

requireAccessOrRedirect();

const nameEl = document.getElementById("lb-name");
const phoneEl = document.getElementById("lb-phone");
const servicesEl = document.getElementById("lb-services");
const pricesEl = document.getElementById("lb-prices");
const photoEl = document.getElementById("lb-photo");
const saveBtn = document.getElementById("lb-save-profile");
const errorEl = document.getElementById("lb-settings-error");

const { email, role } = getCurrentUser();

async function loadProfile() {
  const res = await fetch("/api/get-profile?email=" + email);
  const data = await res.json();

  if (data.profile) {
    nameEl.value = data.profile.name || "";
    phoneEl.value = data.profile.phone || "";
    servicesEl.value = (data.profile.services || []).join(", ");
    pricesEl.value = JSON.stringify(data.profile.prices || {});
  }
}

async function uploadPhoto() {
  const file = photoEl.files[0];
  if (!file) return null;

  const form = new FormData();
  form.append("file", file);

  const res = await fetch("/api/upload-photo", {
    method: "POST",
    body: form
  });

  const data = await res.json();
  return data.url;
}

async function saveProfile() {
  let photoUrl = null;

  if (photoEl.files.length > 0) {
    photoUrl = await uploadPhoto();
  }

  const services = servicesEl.value
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  let prices = {};
  try {
    prices = JSON.parse(pricesEl.value);
  } catch {
    errorEl.textContent = "Prices must be valid JSON.";
    return;
  }

  const res = await fetch("/api/save-profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      role,
      name: nameEl.value.trim(),
      phone: phoneEl.value.trim(),
      services,
      prices,
      photoUrl
    })
  });

  const data = await res.json();
  if (!data.success) {
    errorEl.textContent = "Error saving profile.";
    return;
  }

  errorEl.textContent = "Saved!";
}

saveBtn.addEventListener("click", saveProfile);
loadProfile();
