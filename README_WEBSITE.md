# MD Mahir Jawad - Personal Website

A clean, responsive personal website built with pure HTML, CSS, and vanilla JavaScript. No frameworks, no build process - just fast-loading, accessible web standards.

🌐 **Live Site**: [https://147MahirJawad.github.io](https://147MahirJawad.github.io)

## Features

- ✨ **Modern, Responsive Design**: Works beautifully on desktop, tablet, and mobile
- 🌓 **Light/Dark Theme Toggle**: Persistent theme preference using localStorage
- ♿ **Accessibility First**: ARIA labels, semantic HTML, keyboard navigation, skip links
- 📊 **Data-Driven**: All content loaded from `data/profile.json` for easy updates
- 🎨 **No Dependencies**: Pure HTML/CSS/JavaScript - no frameworks or build tools needed
- 🖨️ **Print-Friendly**: Special print stylesheet for resume-like output
- 🚀 **Fast Loading**: Minimal footprint, optimized for performance
- 🔍 **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, JSON-LD structured data

## Structure

```
.
├── index.html                    # Main website file
├── assets/
│   ├── style.css                 # All styles (with light/dark themes)
│   ├── site.js                   # JavaScript for interactivity
│   ├── favicon.svg               # MJ monogram favicon
│   └── profile.jpg               # Profile photo
├── data/
│   └── profile.json              # CV data (single source of truth)
├── CV_MD MAHIR JAWAD_University_latest.pdf  # CV file for download
└── README.md                     # This file
```

## Updating Your Information

### Method 1: Edit the JSON File (Recommended)

All personal information is stored in `data/profile.json`. To update your website:

1. Open `data/profile.json` in any text editor
2. Update the relevant fields:
   - `name`: Your full name
   - `headline`: Your professional title/role
   - `email`: Your contact email
   - `location`: Your location
   - `summary`: Brief bio/about text
   - `education`: Array of education entries
   - `experience`: Array of work experience entries
   - `projects`: Array of project entries
   - `skills`: Technical and soft skills
   - `publications`: Array of publications with links
   - `awards`: Array of awards and honors
   - `certifications`: Array of certifications
   - `languages`: Array of languages with proficiency levels
   - `links`: Social media and professional links

3. Save the file
4. Refresh your browser - changes appear immediately!

### Method 2: Extract from CV PDF

If you have a CV PDF file:

1. Replace the placeholder `CV_MD MAHIR JAWAD_University_latest.pdf` with your actual CV
2. Parse the PDF content and update `data/profile.json` accordingly
3. The website's "Download CV" button will automatically link to this file

**Note**: The current `data/profile.json` contains placeholder data marked with "TODO: Extract from CV PDF". Replace these with your actual information.

## Updating Your Profile Photo

1. Replace `assets/profile.jpg` with your own photo
2. Recommended dimensions: 400x400 pixels or larger (square aspect ratio)
3. Supported formats: JPG, PNG
4. The image will be automatically cropped to a circle on desktop and displayed full on mobile

## JSON Data Schema

Here's the complete structure for `data/profile.json`:

```json
{
  "name": "Your Full Name",
  "headline": "Your Professional Title",
  "email": "your.email@example.com",
  "location": "City, Country",
  "summary": "Brief professional summary...",
  "education": [
    {
      "institution": "University Name",
      "degree": "Degree Type",
      "field": "Field of Study",
      "start": "YYYY-MM",
      "end": "YYYY-MM",
      "location": "City, Country",
      "gpa": "3.8/4.0",
      "highlights": ["Achievement 1", "Achievement 2"]
    }
  ],
  "experience": [
    {
      "title": "Job Title",
      "org": "Company/Organization",
      "start": "YYYY-MM",
      "end": "YYYY-MM",
      "location": "City, Country",
      "highlights": ["Responsibility 1", "Responsibility 2"]
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "link": "https://project-url.com",
      "description": "Project description...",
      "tech": ["Technology 1", "Technology 2"],
      "start": "YYYY-MM",
      "end": "YYYY-MM"
    }
  ],
  "skills": {
    "technical": ["Skill 1", "Skill 2", "Skill 3"],
    "soft": ["Skill 1", "Skill 2", "Skill 3"]
  },
  "publications": [
    {
      "title": "Publication Title",
      "venue": "Conference/Journal Name",
      "year": "YYYY",
      "link": "https://publication-url.com",
      "authors": ["Author 1", "Author 2"],
      "doi": "10.xxxx/xxxxx"
    }
  ],
  "awards": [
    {
      "name": "Award Name",
      "by": "Awarding Organization",
      "year": "YYYY",
      "description": "Brief description..."
    }
  ],
  "certifications": [
    {
      "name": "Certification Name",
      "by": "Issuing Organization",
      "year": "YYYY",
      "link": "https://cert-url.com",
      "description": "Brief description..."
    }
  ],
  "languages": [
    {
      "name": "Language Name",
      "level": "Proficiency Level (e.g., Native, Fluent, Intermediate)"
    }
  ],
  "links": {
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username",
    "scholar": "https://scholar.google.com/citations?user=...",
    "website": "https://your-website.com"
  }
}
```

## Local Development

No build process required! Just:

1. Clone the repository
2. Open `index.html` in your browser
3. Or use a simple HTTP server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (with npx)
npx serve

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Deployment

This site deploys automatically via GitHub Pages:

1. Push changes to the `main` branch (or your default branch)
2. GitHub Pages will automatically build and deploy
3. Visit `https://[your-username].github.io`

**Important**: Make sure GitHub Pages is enabled in your repository settings and set to deploy from the root directory of your default branch.

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels and roles
- Skip-to-content link for keyboard navigation
- Sufficient color contrast in both themes
- Focus indicators for keyboard users
- Screen reader friendly
- Alt text for all images

## Performance

- **No external dependencies**: All assets are self-hosted
- **Minimal file sizes**: ~33KB total (HTML + CSS + JS, uncompressed)
- **Fast loading**: Optimized for Lighthouse score 90+
- **Efficient caching**: Static assets with long cache lifetimes

## Customization

### Changing Colors

Edit the CSS variables in `assets/style.css`:

```css
:root {
  --accent-primary: #2c3e50;    /* Primary brand color */
  --accent-secondary: #3498db;  /* Links and highlights */
  /* ... more colors ... */
}
```

### Changing Fonts

Edit the font-family in `assets/style.css`:

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ...;
}
```

### Adding Sections

1. Add the section to `index.html`
2. Add corresponding data fields to `data/profile.json`
3. Add render function in `assets/site.js`
4. Style it in `assets/style.css`

## License

### Code

The website code (HTML, CSS, JavaScript) is released under the MIT License. Feel free to use, modify, and distribute.

### Content

All personal content (CV information, profile photo, personal data) is proprietary and © MD Mahir Jawad. Please do not use this personal information without permission.

### Using This Template

Want to create your own website using this template?

1. Fork or download this repository
2. Replace `data/profile.json` with your own information
3. Replace `assets/profile.jpg` with your photo
4. Replace `CV_MD MAHIR JAWAD_University_latest.pdf` with your CV
5. Update meta tags in `index.html` (title, description, URLs)
6. Deploy to GitHub Pages or any static host

## Credits

- Built by MD Mahir Jawad
- Icons: Unicode emoji characters (no icon library needed!)
- Inspiration: Modern portfolio design patterns

## Support

For issues or questions about this website:
- Email: mahirjawad98@gmail.com
- GitHub: [@147MahirJawad](https://github.com/147MahirJawad)

---

Last updated: 2025
