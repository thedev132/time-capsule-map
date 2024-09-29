import L from "leaflet";
import { html, makeComponent } from './makeComponent.js';

const clubLocations = [
  { name: "#counterspell-melbourne", coords: [-37.8136, 144.9631] },
  { name: "#counterspell-perth", coords: [-31.9505, 115.8605] },
  { name: "#counterspell-sydney", coords: [-33.8688, 151.2093] },
  { name: "#counterspell-bengaluru", coords: [12.9716, 77.5946] },
  { name: "#counterspell-chandigarh", coords: [30.7333, 76.7794] },
  { name: "#counterspell-chennai", coords: [13.0827, 80.2707] },
  { name: "#counterspell-delhi", coords: [28.6139, 77.2090] },
  { name: "#counterspell-gurugram", coords: [28.4595, 77.0266] },
  { name: "#counterspell-kanpur", coords: [26.4499, 80.3319] },
  { name: "#counterspell-mumbai", coords: [19.0760, 72.8777] },
  { name: "#counterspell-pune", coords: [18.5204, 73.8567] },
  { name: "#counterspell-lahore", coords: [31.5497, 74.3436] },
  { name: "#counterspell-phuket", coords: [7.8804, 98.3923] },
  { name: "#counterspell-seoul", coords: [37.5665, 126.9780] },
  { name: "#counterspell-singapore", coords: [1.3521, 103.8198] },
  { name: "#counterspell-taiwan", coords: [25.0330, 121.5654] },
  { name: "#counterspell-yyc", coords: [51.0447, -114.0719] },
  { name: "#counterspell-ottawa", coords: [45.4215, -75.6972] },
  { name: "#counterspell-gta", coords: [43.6532, -79.3832] },
  { name: "#counterspell-kigali", coords: [-1.9579, 30.1127] },
  { name: "#counterspell-nairobi", coords: [-1.2921, 36.8219] },
  { name: "#counterspell-abu-dhabi", coords: [24.4539, 54.3773] },
  { name: "#counterspell-dubai", coords: [25.2048, 55.2708] },
  { name: "#counterspell-cambridge", coords: [52.2053, 0.1218] },
  { name: "#counterspell-leicester", coords: [52.6369, -1.1398] },
  { name: "#counterspell-london", coords: [51.5074, -0.1278] },
  { name: "#counterspell-irvine", coords: [33.6846, -117.8265] },
  { name: "#counterspell-san-diego", coords: [32.7157, -117.1611] },
  { name: "#counterspell-sf", coords: [37.7749, -122.4194] },
  { name: "#counterspell-sunnyvale", coords: [37.3688, -122.0363] },
  { name: "#counterspell-to", coords: [34.1706, -118.8376] },
  { name: "#counterspell-dc", coords: [38.9072, -77.0369] },
  { name: "#counterspell-saint-augustine", coords: [29.9012, -81.3124] },
  { name: "#counterspell-tampa", coords: [27.9506, -82.4572] },
  { name: "#counterspell-atl", coords: [33.7490, -84.3880] },
  { name: "#counterspell-boston", coords: [42.3601, -71.0589] },
  { name: "#counterspell-ny", coords: [40.7128, -74.0060] },
  { name: "#counterspell-columbus", coords: [39.9612, -82.9988] },
  { name: "#counterspell-austin", coords: [30.2672, -97.7431] },
  { name: "#counterspell-dallas", coords: [32.7767, -96.7970] },
  { name: "#counterspell-houston", coords: [29.7604, -95.3698] },
  { name: "#counterspell-oshkosh", coords: [44.0247, -88.5426] },
  { name: "#counterspell-nz", coords: [-36.8485, 174.7633] },
  { name: "#counterspell-bydgoszcz", coords: [53.1235, 18.0084] },
  { name: "#counterspell-sp", coords: [-23.5505, -46.6333] }
];

const onConstruct = host => {
  const state = {};

  host.useState(state);
}

const onConnected = host => {
  const el = host.shadowRoot.querySelector("#leaflet-map");

  const map = L.map(el, {drawControl: true, zoomControl: false}).setView([30.683, 9.099], 2);

  L.control.zoom({position: 'topright'}).addTo(map);

  // Add OpenStreetMap base layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

  // Add club locations to the map
  clubLocations.forEach(({ name, coords }) => {
      const style = `
        transform-origin: left top;
        height: 25px;
        border-radius: 50%;
      `;

      const icon = new L.divIcon({
        html: `<img style="${style}" src="https://cloud-5ugyen9o7-hack-club-bot.vercel.app/0untitled_design__13_.png"/>`,
        className: "clear"
      });

      let marker = new L.marker(coords, { icon }).addTo(map);
      marker.bindPopup(`<b>${name}</b>`);
  });
}

const styles = html`
  <link rel="stylesheet" 
    href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin=""/>
  <style>
    #leaflet-map {
      width: 100%;
      height: 100vh;
    }
    .leaflet-container{
      font-family: 'Phantom Sans';
    }
    .leaflet-popup-close-button{
      display: none;
    }
  </style>
`

const template = (host) => html`
  ${styles}
  <div id="leaflet-map"></div>
`

makeComponent({
  name: "club-map",
  template,
  onConstruct,
  onConnected
})
