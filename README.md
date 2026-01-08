# U.S. Geothermal Systems Database

**IAP 2026 Design Sprint Project**
MIT Climate & Energy Policy Clinic

## Project Overview

This is an interactive digital database and map for geothermal systems located in the United States. The tool is designed for audiences interested in learning about different types of geothermal systems and where they've been adopted.

### System Types Covered

- **Individual Ground Source Heat Pump (GSHP)**: Single-building geothermal heating/cooling systems
- **4th Generation District Heating & Cooling (4GDHC)**: District-scale geothermal energy networks
- **5th Generation District Heating & Cooling (5GDHC)**: Advanced ambient temperature bidirectional networks

## Features

- **Interactive Map**: Click on markers to explore geothermal projects across the U.S.
- **Detailed Project Information**: View energy benefits, costs, emissions reductions, technical details, and financial breakdowns
- **Filtering & Search**: Filter by system type or search by location/project name
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Accessible Information**: Clear presentation of complex technical data

## Project Structure

```
/
├── index.html      # Main HTML structure
├── styles.css      # Styling and layout
├── app.js          # Interactive map functionality
├── data.js         # Geothermal systems data
└── README.md       # This file
```

## How to Use

### Viewing the Prototype

1. Open `index.html` in a web browser
2. The map will display all geothermal systems with colored markers
3. Click any marker to view detailed project information in the side panel
4. Use filters and search to find specific projects

### Adding Your Data

Replace the sample data in `data.js` with your actual spreadsheet data. Each project should include:

- **Basic Info**: name, location, coordinates (lat/lng), system type, status
- **Benefits**: energy, cost, and emissions data
- **Technical Details**: capacity, loop type, building count, etc.
- **Financial Details**: total cost, grants, payback period
- **Other**: motivation, ownership model, additional resources

Example data structure:
```javascript
{
    id: 1,
    name: "Project Name",
    location: "City, State",
    lat: 42.3601,
    lng: -71.0942,
    systemType: "gshp", // or "4gdhc" or "5gdhc"
    status: "Operating",
    description: "Project description...",
    energyBenefits: "Description of energy savings",
    costBenefits: "Description of cost savings",
    emissionsBenefits: "Description of emissions reductions",
    // ... more fields
}
```

## Technology Stack

- **Leaflet.js**: Open-source interactive mapping library
- **HTML/CSS/JavaScript**: Standard web technologies (easy to embed in Wix)
- **OpenStreetMap**: Free map tiles

## Resources

- [Leaflet.js Documentation](https://leafletjs.com/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- MIT Climate & Energy Policy Clinic

## Contact

Farrah Ye - farrah_y@mit.edu
