import { getLocation } from "./location.js";
import { initMap, addMarker } from "./map.js";

export async function loadJobDetails(job, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = `
    <h3>${job.description}</h3>
    <p>Status: ${job.status}</p>
    <p>Address: ${job.address}</p>
    <p>Client: ${job.clientEmail}</p>
    ${job.washerEmail ? `<p>Washer: ${job.washerEmail}</p>` : ""}
    <div id="job-map" style="height:250px;margin-top:12px;border-radius:12px;overflow:hidden;"></div>
  `;

  const loc = await getLocation(job.clientEmail);
  if (!loc) return;

  const map = initMap("job-map", loc.lat, loc.lng);
  addMarker(map, loc.lat, loc.lng);
}
