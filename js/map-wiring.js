import { initMap, addMarker } from "./map.js";
import { getLocation } from "./location.js";

export async function showUserOnMap(email, containerId) {
  const loc = await getLocation(email);
  if (!loc) return;

  const map = initMap(containerId, loc.lat, loc.lng);
  addMarker(map, loc.lat, loc.lng);
}

export async function showTwoPoints(clientEmail, washerEmail, containerId) {
  const clientLoc = await getLocation(clientEmail);
  const washerLoc = await getLocation(washerEmail);

  if (!clientLoc || !washerLoc) return;

  const map = initMap(containerId, clientLoc.lat, clientLoc.lng);

  addMarker(map, clientLoc.lat, clientLoc.lng);
  addMarker(map, washerLoc.lat, washerLoc.lng);
}
