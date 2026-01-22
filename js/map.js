export function initMap(containerId, lat, lng) {
  const map = L.map(containerId).setView([lat, lng], 14);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19
  }).addTo(map);

  return map;
}

export function addMarker(map, lat, lng) {
  return L.marker([lat, lng]).addTo(map);
}
