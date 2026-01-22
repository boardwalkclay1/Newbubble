import { getCurrentUser } from "./auth.js";

export async function sendLocation() {
  const { email } = getCurrentUser();
  if (!email) return;

  if (!navigator.geolocation) {
    console.warn("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(async pos => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    await fetch("/api/save-location", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, lat, lng })
    });
  });
}

export async function getLocation(email) {
  const res = await fetch("/api/get-location?email=" + encodeURIComponent(email));
  const data = await res.json();
  return data.location;
}
