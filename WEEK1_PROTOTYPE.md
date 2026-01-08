# Week 1 Prototype Summary

**IAP 2026 Geothermal Systems Database**
**Date:** January 7, 2026
**Prototype Version:** 1.0

## Overview

This document describes the Week 1 prototype for the interactive geothermal systems database. This prototype demonstrates different ways of displaying geothermal project information through an interactive web-based map interface.

## Prototype Features

### 1. Interactive Map
- **Technology:** Leaflet.js (free, open-source mapping library)
- **Map Provider:** OpenStreetMap (free, no API key required)
- **Coverage:** 102 geothermal projects across the United States
- **Interactivity:** Click markers to view detailed project information

### 2. Color-Coded System Types
Projects are visually distinguished by system type:
- **Green Markers:** Individual Ground Source Heat Pump (GSHP) systems
- **Blue Markers:** 4th Generation District Heating & Cooling (4GDHC)
- **Orange Markers:** 5th Generation District Heating & Cooling (5GDHC)

### 3. Filtering & Search
- **System Type Filter:** Dropdown to filter by GSHP, 4GDHC, or 5GDHC
- **Search Bar:** Search by location, project name, or description
- **Real-time Updates:** Map markers update immediately as filters change

### 4. Detailed Project Information
Each project displays comprehensive information when clicked:
- **Project Overview:** Location, status, site type, capacity
- **Scale & Impact:** Number of buildings, households, population served
- **Quantified Benefits:** Emissions reductions, operational successes
- **Technical Details:** Heat pump systems, thermal resources, distribution
- **Financial Details:** Total cost, funding sources, subscription information
- **Ownership Model:** Public, private, university, utility, cooperative, etc.
- **Contact & Resources:** Project contacts and referenced sources

### 5. Responsive Design
- Works on desktop, tablet, and mobile devices
- Clean, accessible information presentation
- Professional color scheme aligned with sustainability themes

## Data Processing

### Automated Data Conversion
Created a Python script ([convert_csv_to_js.py](convert_csv_to_js.py)) that:
1. Reads the geothermal systems CSV spreadsheet
2. Geocodes locations using OpenStreetMap's Nominatim API
3. Converts data to JavaScript format for web display
4. Categorizes projects by system type
5. Cleans and formats text for web presentation

### Data Coverage
- **Total Projects:** 102 successfully geocoded projects
- **Geographic Coverage:** 28+ states across the U.S.
- **System Type Breakdown:**
  - Individual GSHP systems
  - 4th Generation District H&C systems
  - 5th Generation District H&C systems

## Files Created

1. **[index.html](index.html)** - Main webpage structure
2. **[styles.css](styles.css)** - Styling and layout
3. **[app.js](app.js)** - Interactive map functionality
4. **[data.js](data.js)** - Geothermal systems data (auto-generated from CSV)
5. **[convert_csv_to_js.py](convert_csv_to_js.py)** - Data conversion script

## How to View the Prototype

1. Open [index.html](index.html) in any modern web browser
2. The map will load showing all 102 geothermal projects
3. Click on any marker to see detailed project information
4. Use the filters to explore specific system types
5. Use the search bar to find projects by location or name

## Design Considerations

### Audience Accessibility
The prototype displays information in a clear, hierarchical format that works for multiple audiences:
- **General Public:** Easy-to-understand overview with visual map
- **Community Members:** Cost savings, emissions benefits, subscription info
- **Technical Experts:** Detailed technical specifications and system details
- **Government Officials:** Funding sources, ownership models, scale metrics

### Information Architecture
Information is organized into logical sections that can be expanded or customized:
- Only relevant fields are shown (empty/unknown fields are hidden)
- Most important information (overview, benefits) appears first
- Technical details are available but not overwhelming
- Contact information is easily accessible

### Future Extensibility
The code is structured to be easily maintained and updated:
- Data stored in separate file ([data.js](data.js))
- Can regenerate data from updated CSV using Python script
- Clean separation between data, logic, and presentation
- Well-commented code for future teams

## Technical Advantages

### Why This Approach Works Well for Wix
1. **Standard Web Technologies:** Uses HTML/CSS/JavaScript - easily embedded in Wix
2. **No Backend Required:** All data is client-side, no server needed
3. **Free Tools:** No API keys or paid services required
4. **Self-Contained:** All files can be uploaded to Wix custom code section
5. **Lightweight:** Fast loading, minimal dependencies

### Performance
- Fast initial load time
- Smooth map interactions
- Efficient filtering and search
- Works well with 100+ markers

## Next Steps for Week 2

### Potential Enhancements
1. **Educational Content:** Add background information about geothermal system types
2. **Advanced Filtering:** Filter by status (operating, under construction, design phase)
3. **Visual Improvements:** Explore different design styles and color schemes
4. **Data Visualization:** Add charts showing system type distribution, cost ranges, etc.
5. **Export Features:** Allow users to download filtered data as CSV
6. **Comparison Tool:** Compare multiple projects side-by-side

### Design Exploration
- Research design inspirations from similar environmental databases
- Explore different mapping styles and visual presentations
- Consider audience-specific views (beginner vs. expert mode)
- Develop style guide for colors, fonts, and imagery

### Integration Planning
- Test embedding in Wix environment
- Explore Wix's custom HTML/code capabilities
- Plan for future data updates and maintenance

## Feedback Questions for Team

1. Is the current information hierarchy effective?
2. Are there any missing data fields that should be prominently displayed?
3. Should we add educational background information about geothermal systems?
4. Do we need audience-specific views (e.g., technical vs. non-technical)?
5. What design style best represents the clinic's brand?

## Contact

For questions about this prototype:
- Developer: Claude Code
- Project Lead: Farrah Ye (farrah_y@mit.edu)

---

**Last Updated:** January 7, 2026
