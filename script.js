/* ==========================================================================
   EXHUME WEALTH GROUP - INTERACTIVE COMPONENT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. FAQ COMPONENTS ACCORDION INTERACTION
  const faqToggles = document.querySelectorAll('.faq-toggle');

  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentItem = toggle.parentElement;
      const content = currentItem.querySelector('.faq-content');
      
      // Close all other open FAQ items to keep layout compact and readable
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== currentItem && item.classList.contains('active')) {
          item.classList.remove('active');
          item.querySelector('.faq-content').style.maxHeight = null;
        }
      });

      // Toggle current selected view state
      currentItem.classList.toggle('active');

      // Animate expansion smoothly using scrollHeight calculation
      if (currentItem.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = null;
      }
    });
  });


  // 2. SMOOTH MOBILE NAVIGATION SCROLL LINKS
  const navLinks = document.querySelectorAll('.nav-menu a, .btn-primary, .btn-card');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      // Only apply to internal hash target ids to prevent breaking external URLs
      if (targetId && targetId.startsWith('#') && targetId !== '#') {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Calculate off-set padding to clear sticky top navigation bars
          const headerHeight = document.querySelector('header').offsetHeight;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });


   // 3. AUTOMATED EMAIL DELIVERY PIPELINE VIA FORMSPREE API
  const leadForm = document.getElementById('leadForm');

  if (leadForm) {
    leadForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevents page from jumping or reloading

      const form = this;
      const data = new FormData(form);
      const name = document.getElementById('userName').value.trim();
      const serviceElement = document.getElementById('userService');
      const serviceText = serviceElement.options[serviceElement.selectedIndex].text;

      // Add structured field attributes explicitly for clear formatting in your inbox
      data.append("Client Name", name);
      data.append("Phone Number", document.getElementById('userPhone').value.trim());
      data.append("Service Selected", serviceText);
      data.append("Project Details", document.getElementById('userMessage').value.trim());

      // Send the data safely via HTTP Post request pipeline
      fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          alert(`Thank you, ${name}! Exhume Wealth Group has securely emailed your request for the "${serviceText}". We will connect with you shortly.`);
          form.reset();
        } else {
          alert("Oops! There was a problem submitting your form. Please try again or use our direct WhatsApp line.");
        }
      }).catch(error => {
        alert("Connection error. Please check your internet connectivity or text us directly over WhatsApp.");
      });
    });
  }
});
// 4. POPIA COOKIE BANNER VISIBILITY ENGINE
const cookieBanner = document.getElementById('popiaCookieBanner');
const acceptBtn = document.getElementById('acceptCookies');
const declineBtn = document.getElementById('declineCookies');

if (cookieBanner && acceptBtn && declineBtn) {
  // Check browser local storage memory variables
  const hasConsented = localStorage.getItem('popiaConsent');

  if (!hasConsented) {
    // Show banner layout smoothly after a short delay
    setTimeout(() => {
      cookieBanner.style.display = 'block';
    }, 1500);
  }

  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('popiaConsent', 'accepted');
    cookieBanner.style.display = 'none';
  });

  declineBtn.addEventListener('click', () => {
    localStorage.setItem('popiaConsent', 'declined');
    cookieBanner.style.display = 'none';
  });
}