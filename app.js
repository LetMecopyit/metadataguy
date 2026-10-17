/**
 * Wildlife Privacy Project - Specimen Study & Interactive Location Inspector
 * Manages specimen switching and location state visualization without emojis or em dashes.
 */

document.addEventListener('DOMContentLoaded', () => {

  // Dataset of open-source wildlife photography with verified authors and direct references
  const wildlifeSpecimens = [
    {
      id: "guinea-pigs",
      commonName: "Guinea Pigs",
      species: "Cavia porcellus",
      authorName: "Bonnie Kittle",
      authorUrl: "https://unsplash.com/@bonniekdesign",
      photoSrcUrl: "https://unsplash.com/photos/two-guinea-pigs-eating-carrot-MUcxe_wDurE",
      imageUrl: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1400&q=85",
      thumbUrl: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=300&q=75",
      riskCategory: "Private Breeding Enclosure and Facility",
      headline: "Private Facility and Enclosure Coordinates Recorded",
      narrative: "This uncleaned capture records exact latitude, longitude, and elevation. In animal husbandry and field research, sharing unscrubbed coordinates exposes private facility gates, outdoor pens, and personal property locations.",
      pinCoords: "51.2194° N, 4.4025° E",
      pinPrecision: "GPS Fix: Precision to 2.1m",
      rawTags: [
        { field: "GPSLatitude", val: "51° 13' 09.8\" N (51.2194)", risk: "Facility Pin", status: "danger" },
        { field: "GPSLongitude", val: "4° 24' 09.0\" E (4.4025)", risk: "Facility Pin", status: "danger" },
        { field: "GPSAltitude", val: "12.4m above sea level", risk: "Ground Level Elevation", status: "caution" },
        { field: "DateTimeOriginal", val: "2026:05:12 14:28:10", risk: "Feeding Timeline", status: "caution" },
        { field: "Camera Device", val: "Sony Alpha, Macro Lens", risk: "Lens Telemetry", status: "safe" }
      ],
      cleanTags: [
        { field: "GPSLatitude", val: "Removed", risk: "Protected", status: "safe" },
        { field: "GPSLongitude", val: "Removed", risk: "Protected", status: "safe" },
        { field: "GPSAltitude", val: "Removed", risk: "Protected", status: "safe" },
        { field: "DateTimeOriginal", val: "Sanitized", risk: "Routine Masked", status: "safe" },
        { field: "Camera Device", val: "Sanitized", risk: "Serial Cleared", status: "safe" }
      ]
    },
    {
      id: "red-fox",
      commonName: "Red Fox",
      species: "Vulpes vulpes",
      authorName: "Sunguk Kim",
      authorUrl: "https://unsplash.com/@sunyu",
      photoSrcUrl: "https://unsplash.com/photos/selective-focus-photography-of-orange-fox-tIfrzHxhPYQ",
      imageUrl: "https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=1400&q=85",
      thumbUrl: "https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=300&q=75",
      riskCategory: "Maternal Denning Site",
      headline: "Active Maternal Den Location Exposed",
      narrative: "Kit foxes stay close to their natal burrow during their first eight weeks. Geotagging a young kit allows visitors to surround the burrow, frequently forcing the mother to relocate vulnerable young.",
      pinCoords: "37.5665° N, 126.9780° E",
      pinPrecision: "GPS Fix: Precision to 1.8m",
      rawTags: [
        { field: "GPSLatitude", val: "37° 33' 59.4\" N (37.5665)", risk: "Burrow Location", status: "danger" },
        { field: "GPSLongitude", val: "126° 58' 40.8\" E (126.9780)", risk: "Burrow Location", status: "danger" },
        { field: "GPSAltitude", val: "42.1 meters", risk: "Slope Elevation", status: "caution" },
        { field: "DateTimeOriginal", val: "2026:04:19 16:32:05", risk: "Den Emergence Hour", status: "caution" },
        { field: "Camera Device", val: "Nikon Z9, NIKKOR 500mm f/4", risk: "Optical Setting", status: "safe" }
      ],
      cleanTags: [
        { field: "GPSLatitude", val: "Removed", risk: "Protected", status: "safe" },
        { field: "GPSLongitude", val: "Removed", risk: "Protected", status: "safe" },
        { field: "GPSAltitude", val: "Removed", risk: "Protected", status: "safe" },
        { field: "DateTimeOriginal", val: "Sanitized", risk: "Burrow Shielded", status: "safe" },
        { field: "Camera Device", val: "Sanitized", risk: "Serial Cleared", status: "safe" }
      ]
    },
    {
      id: "bald-eagle",
      commonName: "Bald Eagle",
      species: "Haliaeetus leucocephalus",
      authorName: "Philipp Pilz",
      authorUrl: "https://unsplash.com/@buchstabenhausen",
      photoSrcUrl: "https://unsplash.com/photos/black-and-white-eagle-flying-ID48ekBTlDo",
      imageUrl: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?auto=format&fit=crop&w=1400&q=85",
      thumbUrl: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?auto=format&fit=crop&w=300&q=75",
      riskCategory: "Protected Eyrie Nest Tree",
      headline: "Raptor Nest Buffer Zone Compromised",
      narrative: "Wildlife guidelines advise maintaining a 200 to 300 meter buffer around active eagle nests. Raw GPS headers pinpoint the nest tree, inviting drone flights and direct human approach.",
      pinCoords: "47.6062° N, 13.0059° E",
      pinPrecision: "GPS Fix: Precision to 2.2m",
      rawTags: [
        { field: "GPSLatitude", val: "47° 36' 22.3\" N (47.6062)", risk: "Nest Tree Pin", status: "danger" },
        { field: "GPSLongitude", val: "13° 00' 21.2\" E (13.0059)", risk: "Nest Tree Pin", status: "danger" },
        { field: "GPSAltitude", val: "846 meters", risk: "Canopy Elevation", status: "caution" },
        { field: "DateTimeOriginal", val: "2026:03:28 11:15:40", risk: "Incubation Period", status: "caution" },
        { field: "Camera Device", val: "Canon EOS R5, RF 600mm F4", risk: "Optical Setting", status: "safe" }
      ],
      cleanTags: [
        { field: "GPSLatitude", val: "Removed", risk: "Protected", status: "safe" },
        { field: "GPSLongitude", val: "Removed", risk: "Protected", status: "safe" },
        { field: "GPSAltitude", val: "Removed", risk: "Protected", status: "safe" },
        { field: "DateTimeOriginal", val: "Sanitized", risk: "Eyrie Shielded", status: "safe" },
        { field: "Camera Device", val: "Sanitized", risk: "Serial Cleared", status: "safe" }
      ]
    },
    {
      id: "underwater-turtle",
      commonName: "Green Sea Turtle",
      species: "Chelonia mydas",
      authorName: "Daan Verhoeven",
      authorUrl: "https://www.instagram.com/daanverhoevenfreediver/",
      photoSrcUrl: "https://www.instagram.com/daanverhoevenfreediver/",
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=85",
      thumbUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=300&q=75",
      riskCategory: "Coastal Feeding Reef and Nesting Shallows",
      headline: "Shallow Reef Feeding Corridor Tagged",
      narrative: "Green sea turtles return consistently to the same coastal shallows to feed and nest. Geotagging underwater shots signals recreational boats and poachers to specific shallow reef corridors.",
      pinCoords: "20.7984° N, -156.3319° W",
      pinPrecision: "GPS Fix: Precision to 3.4m",
      rawTags: [
        { field: "GPSLatitude", val: "20° 47' 54.2\" N (20.7984)", risk: "Shallow Reef Pin", status: "danger" },
        { field: "GPSLongitude", val: "156° 19' 54.8\" W (-156.3319)", risk: "Shallow Reef Pin", status: "danger" },
        { field: "GPSAltitude", val: "-4.2 meters (Sub-surface)", risk: "Water Depth Fix", status: "caution" },
        { field: "DateTimeOriginal", val: "2026:07:04 09:21:18", risk: "Nesting Season", status: "caution" },
        { field: "Camera Device", val: "Sony Alpha, Underwater Housing", risk: "Underwater Rig", status: "safe" }
      ],
      cleanTags: [
        { field: "GPSLatitude", val: "Removed", risk: "Protected", status: "safe" },
        { field: "GPSLongitude", val: "Removed", risk: "Protected", status: "safe" },
        { field: "GPSAltitude", val: "Removed", risk: "Protected", status: "safe" },
        { field: "DateTimeOriginal", val: "Sanitized", risk: "Reef Shielded", status: "safe" },
        { field: "Camera Device", val: "Sanitized", risk: "Serial Cleared", status: "safe" }
      ]
    },
    {
      id: "leopard",
      commonName: "African Leopard",
      species: "Panthera pardus",
      authorName: "Gwen Weustink",
      authorUrl: "https://unsplash.com/@aboeka",
      photoSrcUrl: "https://unsplash.com/photos/leopard-on-tree-branch-I3C1sSXj1i8",
      imageUrl: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=1400&q=85",
      thumbUrl: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=300&q=75",
      riskCategory: "Core Hunting and Resting Territory",
      headline: "Solitary Predator Range Exposed",
      narrative: "Solitary big cats hold well-defined home territories. Real-time or recent coordinate leaks provide commercial poachers with the exact rocky outcrop or dry riverbed where the animal rests.",
      pinCoords: "-24.0128° S, 31.4883° E",
      pinPrecision: "GPS Fix: Precision to 2.9m",
      rawTags: [
        { field: "GPSLatitude", val: "24° 00' 46.1\" S (-24.0128)", risk: "Territory Pin", status: "danger" },
        { field: "GPSLongitude", val: "31° 29' 17.9\" E (31.4883)", risk: "Territory Pin", status: "danger" },
        { field: "GPSAltitude", val: "412 meters", risk: "Ridge Elevation", status: "caution" },
        { field: "DateTimeOriginal", val: "2026:08:14 17:02:11", risk: "Evening Stalk Window", status: "caution" },
        { field: "Camera Device", val: "Nikon D850, 400mm f/2.8", risk: "Optical Setup", status: "safe" }
      ],
      cleanTags: [
        { field: "GPSLatitude", val: "Removed", risk: "Protected", status: "safe" },
        { field: "GPSLongitude", val: "Removed", risk: "Protected", status: "safe" },
        { field: "GPSAltitude", val: "Removed", risk: "Protected", status: "safe" },
        { field: "DateTimeOriginal", val: "Sanitized", risk: "Territory Shielded", status: "safe" },
        { field: "Camera Device", val: "Sanitized", risk: "Serial Cleared", status: "safe" }
      ]
    }
  ];

  let currentSpecimenIndex = 0;
  let isClean = false;

  // DOM Elements
  const specimenGrid = document.getElementById('specimen-grid');
  const inspectorImage = document.getElementById('inspector-image');
  const inspectorPin = document.getElementById('inspector-pin');
  const pinCoordinates = document.getElementById('pin-coordinates');
  const pinNote = document.getElementById('pin-note');
  const inspectorShield = document.getElementById('inspector-shield');

  const authorCreditLink = document.getElementById('author-credit-link');
  const photoSourceLink = document.getElementById('photo-source-link');
  const btnShowRaw = document.getElementById('btn-show-raw');
  const btnShowClean = document.getElementById('btn-show-clean');

  const assessmentGrade = document.getElementById('assessment-grade');
  const assessmentCategory = document.getElementById('assessment-category');
  const assessmentHeadline = document.getElementById('assessment-headline');
  const assessmentBody = document.getElementById('assessment-body');
  const dataTableBody = document.getElementById('data-table-body');

  // Build specimen thumbnail cards
  function buildSpecimenGrid() {
    specimenGrid.innerHTML = '';
    wildlifeSpecimens.forEach((specimen, index) => {
      const card = document.createElement('div');
      card.className = `specimen-card ${index === currentSpecimenIndex ? 'active' : ''}`;
      card.innerHTML = `
        <div class="specimen-card-img">
          <img src="${specimen.thumbUrl}" alt="${specimen.commonName}">
        </div>
        <div class="specimen-card-meta">
          <span class="specimen-card-name">${specimen.commonName}</span>
          <span class="specimen-card-author">Photo by ${specimen.authorName}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        currentSpecimenIndex = index;
        document.querySelectorAll('.specimen-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        renderInspector();
      });

      specimenGrid.appendChild(card);
    });
  }

  // Render the inspector details
  function renderInspector() {
    const s = wildlifeSpecimens[currentSpecimenIndex];

    inspectorImage.src = s.imageUrl;
    inspectorImage.alt = `${s.commonName} (${s.species})`;
    authorCreditLink.textContent = s.authorName;
    authorCreditLink.href = s.authorUrl;

    if (photoSourceLink) {
      photoSourceLink.href = s.photoSrcUrl;
    }

    pinCoordinates.textContent = s.pinCoords;
    pinNote.textContent = s.pinPrecision;

    if (isClean) {
      inspectorPin.classList.add('hidden');
      inspectorShield.classList.remove('hidden');

      assessmentGrade.textContent = "Protected";
      assessmentGrade.className = "assessment-grade safe";
      assessmentCategory.textContent = "Habitat Location Shielded";
      assessmentHeadline.textContent = "Coordinates and Telemetry Removed";
      assessmentBody.textContent = "All GPS latitude, longitude, and elevation records have been cleared losslessly. The visible photo resolution and pixel values remain completely identical.";

      renderTable(s.cleanTags);
    } else {
      inspectorPin.classList.remove('hidden');
      inspectorShield.classList.add('hidden');

      assessmentGrade.textContent = "High Risk";
      assessmentGrade.className = "assessment-grade";
      assessmentCategory.textContent = s.riskCategory;
      assessmentHeadline.textContent = s.headline;
      assessmentBody.textContent = s.narrative;

      renderTable(s.rawTags);
    }
  }

  function renderTable(tags) {
    dataTableBody.innerHTML = '';
    tags.forEach(t => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${escapeHtml(t.field)}</td>
        <td>${escapeHtml(t.val)}</td>
        <td><span class="status-tag ${t.status}">${escapeHtml(t.risk)}</span></td>
      `;
      dataTableBody.appendChild(tr);
    });
  }

  // State switcher listeners
  btnShowRaw.addEventListener('click', () => {
    isClean = false;
    btnShowRaw.classList.add('active');
    btnShowClean.classList.remove('active');
    renderInspector();
  });

  btnShowClean.addEventListener('click', () => {
    isClean = true;
    btnShowClean.classList.add('active');
    btnShowRaw.classList.remove('active');
    renderInspector();
  });

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Initialize
  buildSpecimenGrid();
  renderInspector();
});
