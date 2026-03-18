// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    mobileMenu.classList.remove('open');
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Contact form — submits via Formspree, emails mike@shipyardlabs.ai
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TODO: Replace this with your Formspree form ID
// 1. Go to https://formspree.io and sign up (free)
// 2. Create a new form → set email to mike@shipyardlabs.ai
// 3. Copy the form ID and paste it below
const FORMSPREE_ID = 'YOUR_FORM_ID';
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('button[type="submit"]');
const formNote = contactForm.querySelector('.form-note');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Prevent double-submit
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  const formData = new FormData(contactForm);

  try {
    const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      // Success state
      submitBtn.textContent = 'Sent!';
      submitBtn.classList.add('btn-success');
      formNote.textContent = "Thanks! We'll be in touch within 24 hours.";
      formNote.classList.add('form-success');
      contactForm.reset();

      setTimeout(() => {
        submitBtn.textContent = 'Send Inquiry';
        submitBtn.disabled = false;
        submitBtn.classList.remove('btn-success');
        formNote.textContent = 'We typically respond within 24 hours.';
        formNote.classList.remove('form-success');
      }, 5000);
    } else {
      throw new Error('Form submission failed');
    }
  } catch (err) {
    // Error state
    submitBtn.textContent = 'Something went wrong';
    submitBtn.classList.add('btn-error');
    formNote.textContent = 'Please try again or email us directly at mike@shipyardlabs.ai';
    formNote.classList.add('form-error');

    setTimeout(() => {
      submitBtn.textContent = 'Send Inquiry';
      submitBtn.disabled = false;
      submitBtn.classList.remove('btn-error');
      formNote.textContent = 'We typically respond within 24 hours.';
      formNote.classList.remove('form-error');
    }, 4000);
  }
});

// Scroll-triggered animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.product-card, .service-card, .about-block, .timeline-item').forEach(el => {
  observer.observe(el);
});
