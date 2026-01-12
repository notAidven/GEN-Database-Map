// Initialize the map
let map;
let markers = [];
let allSystems = geothermalSystems;

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    addMarkersToMap(allSystems);
    setupEventListeners();
});

function initMap() {
    // Initialize the map centered on the continental US
    map = L.map('map').setView([39.8283, -98.5795], 4);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
}

function addMarkersToMap(systems) {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    // Add new markers
    systems.forEach(system => {
        const markerColor = getMarkerColor(system.systemType);

        // Create custom marker icon
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: ${markerColor}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid #333;"></div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });

        const marker = L.marker([system.lat, system.lng], { icon: customIcon })
            .addTo(map);

        // Add tooltip for hover (shows on mouse over)
        const tooltipContent = `
            <strong>${system.name}</strong><br>
            ${system.location}<br>
            <em>${getSystemTypeName(system.systemType)}</em>
        `;
        marker.bindTooltip(tooltipContent, {
            permanent: false,
            direction: 'top',
            offset: [0, -10]
        });

        // Add popup with basic info (shows on click)
        marker.bindPopup(tooltipContent);

        // Add click event to show details in info panel
        marker.on('click', function() {
            showSystemDetails(system);
        });

        markers.push(marker);
    });
}

function showSystemDetails(system) {
    const infoPanel = document.getElementById('info-panel');

    // Helper function to show field if not "Unknown"
    const showField = (value) => value && value !== 'Unknown' && value !== 'N/A';

    // Build sections conditionally
    let sectionsHtml = '';

    // Project Overview
    sectionsHtml += `
        <div class="detail-section">
            <h4>Project Overview</h4>
            <p><strong>Location:</strong> ${system.location}</p>
            <p><strong>Status:</strong> ${system.status}</p>
            ${showField(system.siteType) ? `<p><strong>Site Type:</strong> ${system.siteType}</p>` : ''}
            ${showField(system.capacity) ? `<p><strong>Capacity:</strong> ${system.capacity}</p>` : ''}
        </div>
    `;

    // Scale & Impact
    if (showField(system.buildings) || showField(system.households) || showField(system.population)) {
        sectionsHtml += `
            <div class="detail-section">
                <h4>Scale & Impact</h4>
                ${showField(system.buildings) ? `<p><strong>Buildings:</strong> ${system.buildings}</p>` : ''}
                ${showField(system.households) ? `<p><strong>Households:</strong> ${system.households}</p>` : ''}
                ${showField(system.population) ? `<p><strong>Population Served:</strong> ${system.population}</p>` : ''}
            </div>
        `;
    }

    // Benefits
    if (showField(system.emissionsBenefits) || showField(system.operationalSuccesses)) {
        sectionsHtml += `
            <div class="detail-section">
                <h4>Quantified Benefits</h4>
                ${showField(system.emissionsBenefits) ? `<p><strong>Emissions:</strong> ${system.emissionsBenefits}</p>` : ''}
                ${showField(system.operationalSuccesses) ? `<p><strong>Operational Successes:</strong> ${system.operationalSuccesses}</p>` : ''}
            </div>
        `;
    }

    // Technical Details - with explanatory context
    if (showField(system.heatPump) || showField(system.thermalResources) || showField(system.distribution)) {
        sectionsHtml += `
            <div class="detail-section">
                <h4>Technical Details</h4>
                <p class="section-explainer">How this system captures and distributes geothermal energy:</p>
                ${showField(system.heatPump) ? `
                    <div class="tech-item">
                        <p><strong>Heat Pump Type:</strong> ${system.heatPump}</p>
                        <p class="tech-explainer">${getHeatPumpExplanation(system.heatPump)}</p>
                    </div>
                ` : ''}
                ${showField(system.thermalResources) ? `
                    <div class="tech-item">
                        <p><strong>Underground Infrastructure:</strong> ${system.thermalResources}</p>
                        <p class="tech-explainer">These are the boreholes and underground loops that exchange heat with the earth's stable temperature.</p>
                    </div>
                ` : ''}
                ${showField(system.distribution) ? `
                    <div class="tech-item">
                        <p><strong>Distribution Network:</strong> ${system.distribution}</p>
                        <p class="tech-explainer">The pipe network that carries heated or cooled water to connected buildings.</p>
                    </div>
                ` : ''}
            </div>
        `;
    }

    // Financial Details
    if (showField(system.cost) || showField(system.funding) || showField(system.subscription)) {
        sectionsHtml += `
            <div class="detail-section">
                <h4>Financial Details</h4>
                ${showField(system.cost) ? `<p><strong>Total Cost:</strong> ${system.cost}</p>` : ''}
                ${showField(system.funding) ? `<p><strong>Funding:</strong> ${system.funding}</p>` : ''}
                ${showField(system.subscription) ? `<p><strong>Subscription Info:</strong> ${system.subscription}</p>` : ''}
            </div>
        `;
    }

    // Ownership
    if (showField(system.ownership)) {
        sectionsHtml += `
            <div class="detail-section">
                <h4>Ownership Model</h4>
                <p>${system.ownership}</p>
            </div>
        `;
    }

    // Additional Information
    if (showField(system.additionalInfo)) {
        sectionsHtml += `
            <div class="detail-section">
                <h4>Additional Information</h4>
                <p>${system.additionalInfo}</p>
            </div>
        `;
    }

    // Contact & Resources
    if (showField(system.contact) || showField(system.sources)) {
        sectionsHtml += `
            <div class="resources">
                <h4>Contact & Resources</h4>
                ${showField(system.contact) ? `<p><strong>Contact:</strong> ${system.contact}</p>` : ''}
                ${showField(system.sources) ? `<p><strong>Sources:</strong> ${system.sources}</p>` : ''}
            </div>
        `;
    }

    // Get system type explanation
    const systemExplanation = getSystemTypeExplanation(system.systemType);

    infoPanel.innerHTML = `
        <div class="project-details">
            <h3>${system.name}</h3>
            <div class="system-type-info">
                <span class="system-badge ${system.systemType}">${getSystemTypeName(system.systemType)}</span>
                <p class="system-type-explainer">${systemExplanation.simple}</p>
            </div>
            ${sectionsHtml}
        </div>
    `;
}

function setupEventListeners() {
    // Filter by system type
    const systemTypeFilter = document.getElementById('system-type');
    systemTypeFilter.addEventListener('change', filterSystems);

    // Search functionality
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', filterSystems);
}

function filterSystems() {
    const systemType = document.getElementById('system-type').value;
    const searchTerm = document.getElementById('search').value.toLowerCase();

    let filteredSystems = allSystems;

    // Filter by system type
    if (systemType !== 'all') {
        filteredSystems = filteredSystems.filter(system => system.systemType === systemType);
    }

    // Filter by search term
    if (searchTerm) {
        filteredSystems = filteredSystems.filter(system =>
            system.name.toLowerCase().includes(searchTerm) ||
            system.location.toLowerCase().includes(searchTerm) ||
            system.description.toLowerCase().includes(searchTerm)
        );
    }

    // Update markers on map
    addMarkersToMap(filteredSystems);

    // If only one result, show its details
    if (filteredSystems.length === 1) {
        showSystemDetails(filteredSystems[0]);
        map.setView([filteredSystems[0].lat, filteredSystems[0].lng], 10);
    }
}

function formatKey(key) {
    // Convert camelCase to Title Case
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
}

// Get plain-language explanation for heat pump types
function getHeatPumpExplanation(heatPumpType) {
    const type = heatPumpType.toLowerCase();

    if (type.includes('gshp') || type.includes('ground source')) {
        return 'Ground Source Heat Pumps use pipes buried underground to transfer heat. In winter, they extract warmth from the earth; in summer, they deposit heat back into the ground. They use 25-50% less electricity than conventional heating/cooling.';
    }
    if (type.includes('water source') || type.includes('wshp')) {
        return 'Water Source Heat Pumps connect to a shared water loop. They extract or reject heat to this common water system, allowing buildings to share thermal energy efficiently.';
    }
    if (type.includes('air source') || type.includes('ashp')) {
        return 'Air Source Heat Pumps extract heat from outdoor air. While less efficient than ground source in extreme temperatures, they are simpler to install.';
    }
    return 'Heat pumps move thermal energy between the building and an external source, providing both heating and cooling with high efficiency.';
}

// Get detailed explanation for system types
function getSystemTypeExplanation(systemType) {
    const explanations = {
        'gshp': {
            name: 'Individual Ground Source Heat Pump',
            simple: 'A single building uses underground pipes to heat and cool itself.',
            detail: 'This system serves one building with its own dedicated underground loop. Pipes are buried in the ground where temperatures stay constant year-round (around 50-55°F). The heat pump extracts warmth in winter and deposits excess heat in summer.'
        },
        '4gdhc': {
            name: '4th Generation District Heating & Cooling',
            simple: 'A central plant provides heating and cooling to multiple buildings through shared pipes.',
            detail: 'This district system uses a central energy station with large heat pumps that heat or cool water to moderate temperatures (around 120-160°F for heating). This water is distributed through underground pipes to serve multiple buildings, which is more efficient than each building having its own system.'
        },
        '5gdhc': {
            name: '5th Generation District Heating & Cooling',
            simple: 'Buildings share a common underground water loop and can exchange heat with each other.',
            detail: 'The most advanced district system: buildings connect to a shared ambient temperature water loop (60-80°F). Each building has its own heat pump to extract what it needs. The key innovation is that buildings can share thermal energy - a building needing cooling can send its excess heat to one that needs heating, dramatically improving overall efficiency.'
        }
    };
    return explanations[systemType] || { name: systemType, simple: '', detail: '' };
}
