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

        // Add popup with basic info
        const popupContent = `
            <strong>${system.name}</strong><br>
            ${system.location}<br>
            <em>${getSystemTypeName(system.systemType)}</em>
        `;
        marker.bindPopup(popupContent);

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

    // Technical Details
    if (showField(system.heatPump) || showField(system.thermalResources) || showField(system.distribution)) {
        sectionsHtml += `
            <div class="detail-section">
                <h4>Technical Details</h4>
                ${showField(system.heatPump) ? `<p><strong>Heat Pump:</strong> ${system.heatPump}</p>` : ''}
                ${showField(system.thermalResources) ? `<p><strong>Thermal Resources:</strong> ${system.thermalResources}</p>` : ''}
                ${showField(system.distribution) ? `<p><strong>Distribution:</strong> ${system.distribution}</p>` : ''}
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

    infoPanel.innerHTML = `
        <div class="project-details">
            <h3>${system.name}</h3>
            <span class="system-badge ${system.systemType}">${getSystemTypeName(system.systemType)}</span>
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
