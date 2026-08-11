document.addEventListener('DOMContentLoaded', () => {

  // Mobile Navigation Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isExpanded = navLinks.classList.contains('active');
      hamburger.setAttribute('aria-expanded', isExpanded);
      hamburger.innerHTML = isExpanded ? '&times;' : '&#9776;';
    });

    // Close menu when clicking a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = '&#9776;';
      });
    });
  }

  // Header Scroll Effect
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      } else {
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
      }
    });
  }

  // Gallery Lightbox
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxNext = document.querySelector('.lightbox-next');
  const lightboxPrev = document.querySelector('.lightbox-prev');

  let currentImageIndex = 0;

  if (galleryItems.length > 0 && lightbox) {
    
    const openLightbox = (index) => {
      currentImageIndex = index;
      const imgSrc = galleryItems[index].querySelector('img').getAttribute('src');
      const imgAlt = galleryItems[index].querySelector('img').getAttribute('alt');
      lightboxImg.setAttribute('src', imgSrc);
      lightboxImg.setAttribute('alt', imgAlt);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => {
        lightboxImg.setAttribute('src', '');
      }, 300);
    };

    const showNextImage = () => {
      currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
      openLightbox(currentImageIndex);
    };

    const showPrevImage = () => {
      currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
      openLightbox(currentImageIndex);
    };

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => openLightbox(index));
      // Keyboard accessibility for gallery items
      item.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') openLightbox(index);
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', showNextImage);
    lightboxPrev.addEventListener('click', showPrevImage);

    // Close on outside click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNextImage();
      if (e.key === 'ArrowLeft') showPrevImage();
    });
  }

  // Contact Form Validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const inputs = contactForm.querySelectorAll('[required]');
      const formMessage = document.getElementById('form-message');
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      
      // Reset validation state
      inputs.forEach(input => {
        input.classList.remove('invalid');
      });
      formMessage.className = 'form-message';
      formMessage.style.display = 'none';

      // Validate inputs
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('invalid');
        }
        
        if (input.type === 'email' && input.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value.trim())) {
            isValid = false;
            input.classList.add('invalid');
          }
        }
        
        if (input.type === 'tel' && input.value.trim()) {
          const phoneRegex = /^[0-9+\-\s()]{7,20}$/; // Basic phone validation
          if (!phoneRegex.test(input.value.trim())) {
            isValid = false;
            input.classList.add('invalid');
          }
        }
      });

      if (isValid) {
        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call since it's a static site
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          
          contactForm.reset();
          
          formMessage.textContent = 'Thank you! Your enquiry has been sent successfully.';
          formMessage.className = 'form-message success';
          formMessage.style.display = 'block';
          
          setTimeout(() => {
            formMessage.style.display = 'none';
          }, 5000);
        }, 1500);
        
      } else {
        formMessage.textContent = 'Please fill out all required fields correctly.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
      }
    });
    
    // Clear validation error on input
    const inputs = contactForm.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('invalid');
      });
    });
  }

});
