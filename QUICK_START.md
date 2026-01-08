# Quick Start Guide

## Viewing Your Prototype

**Open [index.html](index.html) in your web browser.**

Double-click the `index.html` file, or right-click and select "Open With" → your preferred browser (Chrome, Firefox, Safari, Edge).

## What You'll See

1. **Interactive Map** - Shows 102 geothermal projects across the U.S.
2. **Color-Coded Markers:**
   - 🟢 Green = Individual GSHP systems
   - 🔵 Blue = 4th Gen District H&C
   - 🟠 Orange = 5th Gen District H&C
3. **Click any marker** to see detailed project information in the side panel

<!--## Using the Filters

### System Type Filter
Use the dropdown menu to show only specific types of systems:
- All Systems
- Individual GSHP
- 4th Gen District H&C
- 5th Gen District H&C

### Search
Type in the search box to find projects by:
- Location (city, state)
- Project name
- Description

## Updating the Data

If you have new geothermal projects data to add:

1. Update your CSV file: `Keegan of IAP 2026_ Geothermal Systems Database - Geothermal Systems Database.csv`
2. Run the conversion script:
   ```bash
   python3 convert_csv_to_js.py
   ```
3. Refresh [index.html](index.html) in your browser

The script automatically:
- Reads the CSV
- Geocodes new locations
- Generates the updated [data.js](data.js) file

## Sharing with Your Team

To share this prototype:

1. **Via Web Browser:**
   - Open [index.html](index.html) in your browser
   - Use it during team meetings for demonstration

2. **Via Email/Zoom:**
   - Share your screen while viewing [index.html](index.html)
   - Or zip the entire folder and send to team members

3. **For Feedback:**
   - Take screenshots of specific features
   - Reference the [WEEK1_PROTOTYPE.md](WEEK1_PROTOTYPE.md) document

## File Structure

```
urop/
├── index.html                    # ← Open this file in browser
├── styles.css                    # Styling
├── app.js                        # Map functionality
├── data.js                       # Your 102 projects (auto-generated)
├── convert_csv_to_js.py         # Data conversion script
├── README.md                     # Full documentation
├── WEEK1_PROTOTYPE.md           # Prototype summary
└── QUICK_START.md               # This file
```

## Troubleshooting

**Map doesn't load?**
- Make sure you're connected to the internet (Leaflet.js loads from CDN)
- Try a different browser
- Check browser console for errors (F12 or Cmd+Option+I)

**Markers not showing?**
- Check that [data.js](data.js) has content (should be ~100+ lines)
- Verify the CSV conversion ran successfully

**Search/filter not working?**
- Try refreshing the page (Ctrl+R or Cmd+R)
- Clear browser cache

## Next Steps

See [WEEK1_PROTOTYPE.md](WEEK1_PROTOTYPE.md) for:
- Full feature list
- Design considerations
- Week 2 enhancement ideas
- Feedback questions for your team

## Questions?

Contact: Farrah Ye (farrah_y@mit.edu)
