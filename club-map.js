import L from "leaflet";
import { html, makeComponent } from './makeComponent.js';


const clubLocations = [
  { name: "HackTX 2023", description: "The University of Texas at Austin's annual hackathon", link: "https://hacktx.com/23/", dates: "October 21-22, 2023", coords: [30.28527, -97.73474] },
  { name: "Cal Hacks 10.0", description: "Berkeley's flagship hackathon, 1,500 hackers in downtown SF", link: "https://cal-hacks-10.devpost.com/", dates: "October 27-29, 2023", coords: [37.7843, -122.40338] },
  { name: "MHacks 15", description: "The University of Michigan's 36-hour student-led hackathon!", link: "https://mhacks-15.devpost.com/", dates: "February 17-19, 2023", coords: [42.27714, -83.73839] },
  { name: "Hack the Sound", description: "A Tacoma, WA based hackathon 12-18 year olds!", link: "https://www.hackthesound.net/", dates: "December 2-3, 2023", coords: [47.15558, -122.38703] },
  { name: "Hack the Nest", description: "The DMV area's largest high-school hackathon! 24 hours, 200 hackers, 16 workshops and mini-events, and $10k+ in prizes.", link: "https://www.hackthenest.org/", dates: "December 9-10, 2023", coords: [38.91192, -77.22246] },
  { name: "Hoya Hacks", description: "Georgetown's annual hackathon for 36 hours and 300 students.", link: "https://hoyahacks.georgetown.domains/", dates: "January 26-28, 2024", coords: [38.90636, -77.07455] },
  { name: "Morgan Hacks", description: "A weekend-long hackathon at Morgan State University, the largest HBCU in Maryland", link: "https://www.morganhacks.com/", dates: "April 6-7, 2024", coords: [39.34121, -76.58806] },
  { name: "TampaHacks", description: "Tampa's first high-school hackathon for 12 hours, centered around making games!", link: "https://tampahacks.com/2024/", dates: "August 17, 2024", coords: [28.05702, -82.43526] },
  { name: "Counterspell Silicon Valley", description: "Silicon Valley's chapter of Hackclub's Global Counterspell event!", link: "https://counterspell.hackclub.com/silicon-valley", dates: "November 23-24, 2024", coords: [37.38395982164136, -122.01301184481486] },
  { name: "CrabHacks", description: "Located in the heart of the DMV, CrabHacks is a one-day high school hackathon serving underserved communities in the DMV area.", link: "https://crabhacks.org/", dates: "December 1, 2024", coords: [38.95102786877887, -77.1196540613761] },
];

const onConstruct = host => {
  const state = {};

  host.useState(state);
}

// function updateJourneyList(locations) {
//   const journeyListElement = document.getElementById('journey-list');
//   journeyListElement.innerHTML = ''; // Clear previous list
  
//   locations.forEach(location => {
//     const listItem = document.createElement('li');
//     listItem.innerHTML = `<p><a style="text-decoration: none; color: white;" href="${location.link}" target="_blank">${location.name}</a> (${location.dates})</p>`;
//     journeyListElement.appendChild(listItem);
//   });
// }

// document.getElementById('toggle-button').addEventListener('click', () => {
//   const journeyListElement = document.getElementById('journey-list');
//   const button = document.getElementById('toggle-button');
//   journeyListElement.classList.toggle('collapsed'); 

//   if (journeyListElement.classList.contains('collapsed')) {
//     button.textContent = '▲';
//   } else {
//     button.textContent = '▼';
//   }
// });


const onConnected = host => {
  const el = host.shadowRoot.querySelector("#leaflet-map");

  const map = L.map(el, { drawControl: true, zoomControl: false }).setView([39.8283, -98.5795], 5);

  L.control.zoom({ position: 'topright' }).addTo(map);

  // Add OpenStreetMap base layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Add club locations to the map
  const markers = [];
  clubLocations.forEach(({ name, description, link, dates, coords }, index) => {
    const style = `
      transform-origin: left top;
      height: 25px;
      border-radius: 50%;
    `;

    const icon = new L.divIcon({
      html: `<img style="${style}" src="https://cloud-mx4u2jd6l-hack-club-bot.vercel.app/0image.png"/>`,
      className: "clear"
    });

    console.log(name);
    if (name == "HackTX 2023") {
      const startingIcon = new L.divIcon({
        html: `<img style="${style}" src="https://cloud-i2q4oaz3t-hack-club-bot.vercel.app/0image__3_-removebg-preview.png"/>`,
        className: "clear"
      });

      const marker = new L.marker(coords, { icon: startingIcon, zIndexOffset: 1000 }).addTo(map);
      marker.bindPopup(`
        <div style="text-align: center;">
          <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 10px;">
            <b><a href='${link}' style="margin-right: 5px;">${name}</a></b>
            <span>(${dates})</span>
          </div>
          <div>${description}</div>
        </div> 
      `);
      markers.push(marker);
    }
    // Check if last element in array dynamically
    else if (index == clubLocations.length - 1) {
      const biggerStyle = `
        transform-origin: center;
        height: 30px; /* Bigger size */
        width: 30px; /* Bigger size */
        border-radius: 50%;
      `;
      const endingIcon = new L.divIcon({
        html: `<img style="${biggerStyle}" src="https://cloud-oaomb68a3-hack-club-bot.vercel.app/0image-removebg-preview__3_.png"/>`,
        className: "clear"
      });

      const marker = new L.marker(coords, { icon: endingIcon, zIndexOffset: 1000}).addTo(map);
      marker.bindPopup(`
        <div style="text-align: center;">
          <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 10px;">
            <b><a href='${link}' style="margin-right: 5px;">${name}</a></b>
            <span>(${dates})</span>
          </div>
          <div>${description}</div>
        </div> 
      `);

      markers.push(marker);
    }
    else {
      const marker = new L.marker(coords, { icon }).addTo(map);
      marker.bindPopup(`
        <div style="text-align: center;">
          <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 10px;">
            <b><a href='${link}' style="margin-right: 5px;">${name}</a></b>
            <span>(${dates})</span>
          </div>
          <div>${description}</div>
        </div> 
      `);
      markers.push(marker)
    }
  });

  // Draw polylines connecting all markers in sequence
  if (markers.length >= 2) {
    const latLngs = markers.map(marker => marker.getLatLng());
    L.polyline(latLngs, { color: 'blue', weight: 2 }).addTo(map);
  }
};


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
// updateJourneyList(clubLocations);