// ========================================
// Theme Management
// ========================================

const THEME_KEY = 'preferred-theme';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

/**
 * Initialize theme from localStorage or system preference
 */
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const theme = savedTheme || (systemPrefersDark ? THEME_DARK : THEME_LIGHT);
  setTheme(theme);
}

/**
 * Set theme and update UI
 */
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  updateThemeToggleButton(theme);
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
  setTheme(newTheme);
}

/**
 * Update theme toggle button text
 */
function updateThemeToggleButton(theme) {
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = theme === THEME_DARK ? '☀️ Light' : '🌙 Dark';
    toggleBtn.setAttribute('aria-label', `Switch to ${theme === THEME_DARK ? 'light' : 'dark'} theme`);
  }
}

// ========================================
// Copy to Clipboard
// ========================================

/**
 * Copy email to clipboard
 */
function copyEmail() {
  const email = document.getElementById('email-address')?.textContent;
  
  if (!email) {
    console.error('Email element not found');
    return;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email)
      .then(() => showCopyFeedback(true))
      .catch(err => {
        console.error('Failed to copy:', err);
        showCopyFeedback(false);
      });
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = email;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      showCopyFeedback(true);
    } catch (err) {
      console.error('Failed to copy:', err);
      showCopyFeedback(false);
    }
    
    document.body.removeChild(textArea);
  }
}

/**
 * Show copy feedback message
 */
function showCopyFeedback(success) {
  const feedback = document.getElementById('copy-feedback');
  if (!feedback) return;

  feedback.textContent = success ? 'Copied!' : 'Failed to copy';
  feedback.classList.add('show');
  
  setTimeout(() => {
    feedback.classList.remove('show');
  }, 2000);
}

// ========================================
// Back to Top Button
// ========================================

/**
 * Show/hide back to top button based on scroll position
 */
function handleBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  if (window.scrollY > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}

/**
 * Scroll to top of page
 */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// ========================================
// Data Loading and Rendering
// ========================================

/**
 * Load profile data from JSON
 */
async function loadProfileData() {
  try {
    const response = await fetch('data/profile.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    renderProfile(data);
  } catch (error) {
    console.error('Error loading profile data:', error);
    // Show error message to user
    document.body.innerHTML = `
      <div style="padding: 2rem; text-align: center;">
        <h1>Error Loading Profile</h1>
        <p>Failed to load profile data. Please check the console for details.</p>
      </div>
    `;
  }
}

/**
 * Render profile data to the page
 */
function renderProfile(data) {
  // Update hero section
  document.getElementById('profile-name').textContent = data.name || 'Name Not Available';
  document.getElementById('profile-headline').textContent = data.headline || '';
  document.getElementById('profile-location').textContent = data.location || '';
  
  // Update email
  const emailElement = document.getElementById('email-address');
  if (emailElement && data.email) {
    emailElement.textContent = data.email;
    emailElement.href = `mailto:${data.email}`;
  }

  // Update about section
  const aboutText = document.getElementById('about-text');
  if (aboutText && data.summary) {
    aboutText.textContent = data.summary;
  }

  // Render sections
  renderEducation(data.education || []);
  renderExperience(data.experience || []);
  renderProjects(data.projects || []);
  renderSkills(data.skills || {});
  renderPublications(data.publications || []);
  renderAwards(data.awards || []);
  renderCertifications(data.certifications || []);
  renderLanguages(data.languages || []);
  renderSocialLinks(data.links || {});

  // Update meta tags
  updateMetaTags(data);
  
  // Update JSON-LD
  updateJsonLd(data);
}

/**
 * Render education section
 */
function renderEducation(education) {
  const container = document.getElementById('education-list');
  if (!container) return;

  if (education.length === 0 || (education.length === 1 && education[0].institution.includes('TODO'))) {
    container.innerHTML = '<p class="text-center">Education information will be added soon.</p>';
    return;
  }

  container.innerHTML = education.map(edu => `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">${escapeHtml(edu.degree || '')} ${escapeHtml(edu.field || '')}</h3>
        <div class="card-subtitle">${escapeHtml(edu.institution || '')}</div>
        <div class="card-meta">
          ${formatDateRange(edu.start, edu.end)} ${edu.location ? `• ${escapeHtml(edu.location)}` : ''}
          ${edu.gpa ? `• GPA: ${escapeHtml(edu.gpa)}` : ''}
        </div>
      </div>
      ${edu.highlights && edu.highlights.length > 0 ? `
        <div class="card-content">
          <ul>
            ${edu.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  `).join('');
}

/**
 * Render experience section
 */
function renderExperience(experience) {
  const container = document.getElementById('experience-list');
  if (!container) return;

  if (experience.length === 0 || (experience.length === 1 && experience[0].title.includes('TODO'))) {
    container.innerHTML = '<p class="text-center">Experience information will be added soon.</p>';
    return;
  }

  container.innerHTML = experience.map(exp => `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">${escapeHtml(exp.title || '')}</h3>
        <div class="card-subtitle">${escapeHtml(exp.org || '')}</div>
        <div class="card-meta">
          ${formatDateRange(exp.start, exp.end)} ${exp.location ? `• ${escapeHtml(exp.location)}` : ''}
        </div>
      </div>
      ${exp.highlights && exp.highlights.length > 0 ? `
        <div class="card-content">
          <ul>
            ${exp.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  `).join('');
}

/**
 * Render projects section
 */
function renderProjects(projects) {
  const container = document.getElementById('projects-list');
  if (!container) return;

  if (projects.length === 0 || (projects.length === 1 && projects[0].name.includes('TODO'))) {
    container.innerHTML = '<p class="text-center">Projects information will be added soon.</p>';
    return;
  }

  container.innerHTML = projects.map(proj => `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">
          ${proj.link ? `<a href="${escapeHtml(proj.link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(proj.name || '')}</a>` : escapeHtml(proj.name || '')}
        </h3>
        ${proj.start || proj.end ? `<div class="card-meta">${formatDateRange(proj.start, proj.end)}</div>` : ''}
      </div>
      <div class="card-content">
        <p>${escapeHtml(proj.description || '')}</p>
        ${proj.tech && proj.tech.length > 0 ? `
          <div class="skill-tags mt-2">
            ${proj.tech.map(t => `<span class="skill-tag">${escapeHtml(t)}</span>`).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');
}

/**
 * Render skills section
 */
function renderSkills(skills) {
  const container = document.getElementById('skills-container');
  if (!container) return;

  const technical = skills.technical || [];
  const soft = skills.soft || [];

  if ((technical.length === 0 || (technical.length === 1 && technical[0].includes('TODO'))) && 
      (soft.length === 0 || (soft.length === 1 && soft[0].includes('TODO')))) {
    container.innerHTML = '<p class="text-center">Skills information will be added soon.</p>';
    return;
  }

  container.innerHTML = `
    ${technical.length > 0 && !technical[0].includes('TODO') ? `
      <div class="skills-category">
        <h3>Technical Skills</h3>
        <div class="skill-tags">
          ${technical.map(skill => `<span class="skill-tag">${escapeHtml(skill)}</span>`).join('')}
        </div>
      </div>
    ` : ''}
    ${soft.length > 0 && !soft[0].includes('TODO') ? `
      <div class="skills-category">
        <h3>Soft Skills</h3>
        <div class="skill-tags">
          ${soft.map(skill => `<span class="skill-tag">${escapeHtml(skill)}</span>`).join('')}
        </div>
      </div>
    ` : ''}
  `;
}

/**
 * Render publications section
 */
function renderPublications(publications) {
  const container = document.getElementById('publications-list');
  if (!container) return;

  if (publications.length === 0 || (publications.length === 1 && publications[0].title.includes('TODO'))) {
    container.innerHTML = '<p class="text-center">Publications information will be added soon.</p>';
    return;
  }

  container.innerHTML = publications.map(pub => `
    <div class="publication">
      <h3 class="publication-title">${escapeHtml(pub.title || '')}</h3>
      <div class="publication-meta">
        ${pub.authors && pub.authors.length > 0 ? `${pub.authors.map(a => escapeHtml(a)).join(', ')} • ` : ''}
        ${escapeHtml(pub.venue || '')} ${pub.year ? `(${escapeHtml(pub.year)})` : ''}
      </div>
      ${pub.link || pub.doi ? `
        <div class="publication-links">
          ${pub.link ? `<a href="${escapeHtml(pub.link)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">View Paper</a>` : ''}
          ${pub.doi ? `<a href="https://doi.org/${escapeHtml(pub.doi)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">DOI</a>` : ''}
        </div>
      ` : ''}
    </div>
  `).join('');
}

/**
 * Render awards section
 */
function renderAwards(awards) {
  const container = document.getElementById('awards-list');
  if (!container) return;

  if (awards.length === 0 || (awards.length === 1 && awards[0].name.includes('TODO'))) {
    container.innerHTML = '<p class="text-center">Awards information will be added soon.</p>';
    return;
  }

  container.innerHTML = awards.map(award => `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">${escapeHtml(award.name || '')}</h3>
        <div class="card-subtitle">${escapeHtml(award.by || '')}</div>
        ${award.year ? `<div class="card-meta">${escapeHtml(award.year)}</div>` : ''}
      </div>
      ${award.description ? `<div class="card-content"><p>${escapeHtml(award.description)}</p></div>` : ''}
    </div>
  `).join('');
}

/**
 * Render certifications section
 */
function renderCertifications(certifications) {
  const container = document.getElementById('certifications-list');
  if (!container) return;

  if (certifications.length === 0 || (certifications.length === 1 && certifications[0].name.includes('TODO'))) {
    container.innerHTML = '<p class="text-center">Certifications information will be added soon.</p>';
    return;
  }

  container.innerHTML = certifications.map(cert => `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">
          ${cert.link ? `<a href="${escapeHtml(cert.link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(cert.name || '')}</a>` : escapeHtml(cert.name || '')}
        </h3>
        <div class="card-subtitle">${escapeHtml(cert.by || '')}</div>
        ${cert.year ? `<div class="card-meta">${escapeHtml(cert.year)}</div>` : ''}
      </div>
      ${cert.description ? `<div class="card-content"><p>${escapeHtml(cert.description)}</p></div>` : ''}
    </div>
  `).join('');
}

/**
 * Render languages section
 */
function renderLanguages(languages) {
  const container = document.getElementById('languages-list');
  if (!container) return;

  if (languages.length === 0 || (languages.length === 1 && languages[0].name.includes('TODO'))) {
    container.innerHTML = '<p class="text-center">Languages information will be added soon.</p>';
    return;
  }

  container.innerHTML = languages.map(lang => `
    <div class="language-item">
      <div class="language-name">${escapeHtml(lang.name || '')}</div>
      <div class="language-level">${escapeHtml(lang.level || '')}</div>
    </div>
  `).join('');
}

/**
 * Render social links
 */
function renderSocialLinks(links) {
  const container = document.getElementById('social-links');
  if (!container) return;

  const socialLinks = [];
  
  if (links.github) {
    socialLinks.push({ name: 'GitHub', icon: '🔗', url: links.github });
  }
  if (links.linkedin) {
    socialLinks.push({ name: 'LinkedIn', icon: '💼', url: links.linkedin });
  }
  if (links.scholar) {
    socialLinks.push({ name: 'Google Scholar', icon: '🎓', url: links.scholar });
  }
  if (links.website && !links.website.includes('github.io')) {
    socialLinks.push({ name: 'Website', icon: '🌐', url: links.website });
  }

  if (socialLinks.length === 0) return;

  container.innerHTML = socialLinks.map(link => `
    <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" class="social-link">
      <span>${link.icon}</span> ${escapeHtml(link.name)}
    </a>
  `).join('');
}

/**
 * Update meta tags for SEO
 */
function updateMetaTags(data) {
  // Update title
  document.title = `${data.name} - ${data.headline || 'Personal Website'}`;
  
  // Update description
  const description = data.summary || `${data.name}'s personal website and portfolio`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  
  // Update OG tags
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', data.name);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
  
  // Update Twitter tags
  document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', data.name);
  document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
}

/**
 * Update JSON-LD structured data
 */
function updateJsonLd(data) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": data.name,
    "email": data.email,
    "jobTitle": data.headline,
    "url": data.links?.website || window.location.href,
    "sameAs": []
  };

  if (data.links?.github) jsonLd.sameAs.push(data.links.github);
  if (data.links?.linkedin) jsonLd.sameAs.push(data.links.linkedin);
  if (data.links?.scholar) jsonLd.sameAs.push(data.links.scholar);

  const script = document.getElementById('json-ld');
  if (script) {
    script.textContent = JSON.stringify(jsonLd);
  }
}

// ========================================
// Utility Functions
// ========================================

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

/**
 * Format date range
 */
function formatDateRange(start, end) {
  if (!start && !end) return '';
  
  const formatDate = (date) => {
    if (!date) return 'Present';
    // Handle ISO dates (YYYY-MM)
    if (date.includes('-')) {
      const [year, month] = date.split('-');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return month ? `${monthNames[parseInt(month) - 1]} ${year}` : year;
    }
    return date;
  };

  const startStr = formatDate(start);
  const endStr = formatDate(end);
  
  if (!start) return endStr;
  if (!end) return `${startStr} - Present`;
  if (start === end) return startStr;
  return `${startStr} - ${endStr}`;
}

// ========================================
// Event Listeners and Initialization
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme
  initTheme();

  // Theme toggle button
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Copy email button
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', copyEmail);
  }

  // Back to top button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', scrollToTop);
  }

  // Scroll event for back to top button
  window.addEventListener('scroll', handleBackToTop);

  // Load and render profile data
  loadProfileData();

  // Add fade-in animation to sections
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
});
