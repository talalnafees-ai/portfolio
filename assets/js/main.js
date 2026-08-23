/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
  navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== SKILL RINGS — ANIMATE ON SCROLL ====================*/
const ringItems = document.querySelectorAll('.ring__item');
const RING_CIRCUMFERENCE = 2 * Math.PI * 52; // r=52

const ringObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const item = entry.target;
      const percent = parseFloat(item.getAttribute('data-percent'));
      const fill = item.querySelector('.ring__fill');
      if (fill) {
        const offset = RING_CIRCUMFERENCE - (percent / 100) * RING_CIRCUMFERENCE;
        fill.style.strokeDasharray = RING_CIRCUMFERENCE;
        fill.style.strokeDashoffset = offset;
      }
      ringObserver.unobserve(item);
    }
  });
}, { threshold: 0.4 });

ringItems.forEach(item => ringObserver.observe(item));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('main section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute('id');
    const link = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
    if (!link) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link.classList.add('active-link');
    } else {
      link.classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', scrollActive);

/*==================== HEADER BACKGROUND ON SCROLL ====================*/
function scrollHeader() {
  const header = document.getElementById('header');
  if (window.scrollY >= 60) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
}
window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUpBtn = document.getElementById('scroll-up');
  if (window.scrollY >= 350) scrollUpBtn.classList.add('show-scroll');
  else scrollUpBtn.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*==================== CONTACT FORM (Formspree) ====================*/
// 1. Sign up at https://formspree.io and create a new form.
// 2. Copy the endpoint it gives you (looks like https://formspree.io/f/xxxxabcd).
// 3. Paste it into the form's "action" attribute in index.html, replacing YOUR_FORM_ID.
// Once that's done, submissions here land directly in your configured email inbox.
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');
const contactSubmit = document.getElementById('contact-submit');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (contactForm.action.includes('YOUR_FORM_ID')) {
      contactStatus.textContent = 'Form not connected yet — add your Formspree endpoint in index.html.';
      contactStatus.className = 'contact__form-status is-error';
      return;
    }

    const originalLabel = contactSubmit.textContent;
    contactSubmit.disabled = true;
    contactSubmit.textContent = 'Sending…';
    contactStatus.textContent = '';
    contactStatus.className = 'contact__form-status';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        contactStatus.textContent = "Message sent — I'll get back to you soon.";
        contactStatus.className = 'contact__form-status is-success';
        contactForm.reset();
      } else {
        contactStatus.textContent = "Something went wrong — please try again or email me directly.";
        contactStatus.className = 'contact__form-status is-error';
      }
    } catch (err) {
      contactStatus.textContent = "Couldn't reach the server — check your connection and try again.";
      contactStatus.className = 'contact__form-status is-error';
    } finally {
      contactSubmit.disabled = false;
      contactSubmit.textContent = originalLabel;
    }
  });
}

/*==================== FOOTER YEAR ====================*/
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
