export async function loadWasherProfile(email, containerId) {
  const container = document.getElementById(containerId);

  const res = await fetch("/api/get-profile?email=" + encodeURIComponent(email));
  const data = await res.json();
  const p = data.profile;

  if (!p) {
    container.innerHTML = "<p>No profile found.</p>";
    return;
  }

  container.innerHTML = `
    <div class="lb-card">
      <h2>${p.name || "Washer"}</h2>
      ${p.photoUrl ? `<img src="${p.photoUrl}" class="lb-profile-photo">` : ""}
      <p><strong>Phone:</strong> ${p.phone || "N/A"}</p>
      <p><strong>Services:</strong> ${(p.services || []).join(", ")}</p>
      <p><strong>Prices:</strong> ${JSON.stringify(p.prices || {})}</p>
    </div>
  `;
}
