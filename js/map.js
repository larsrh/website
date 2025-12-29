function renderMap(dataId, embedId) {
  const { geo, markers, gpx } = JSON.parse(
    document.getElementById(dataId).textContent
  );

  const { lat, lon, zoom } = geo;

  const map = L.map(embedId).setView([lat, lon], zoom);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  for (const { lat, lon } of markers)
    L.circle([lat, lon], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 300,
    }).addTo(map);

  const markerOptions = {
    startIconUrl: undefined,
    endIconUrl: undefined,
    shadowUrl: undefined,
  };
  for (const file of gpx)
    new L.GPX(file, { async: true, marker_options: markerOptions }).addTo(map);
}
