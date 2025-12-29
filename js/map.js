const markerOptions = {
  startIconUrl: undefined,
  endIconUrl: undefined,
  shadowUrl: undefined,
};

function loadGpx(map, file) {
  let _resolve;
  const promise = new Promise((resolve) => {
    _resolve = resolve;
  });
  new L.GPX(file, { async: true, marker_options: markerOptions })
    .on("loaded", (e) => _resolve(e.target.getBounds()))
    .addTo(map);
  return promise;
}

async function renderMap(dataId, embedId) {
  const { markers, gpx } = JSON.parse(
    document.getElementById(dataId).textContent
  );

  const map = L.map(embedId);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  let bounds = [];

  for (const { lat, lon } of markers) {
    bounds.push([lat, lon]);
    L.circle([lat, lon], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 300,
    }).addTo(map);
  }

  for (const file of gpx) bounds.push(await loadGpx(map, file));

  console.log(bounds);

  map.fitBounds(bounds);
}
