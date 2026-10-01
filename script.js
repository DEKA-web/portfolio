/**
 * ============================================================================
 * JAVASCRIPT LOGIC - DEEKA MUHUDIIN HASSAN PORTFOLIO
 * Features: Dark/Light Mode, Mobile Drawer, Sticky Scrollspy, Modals,
 * Skills Filter & Bar Animation, Interactive Contact Form, Copy Email.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Theme Toggle (Dark / Light Mode) with LocalStorage Persistence
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Retrieve saved preference or default to system theme (with dark as fallback)
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'dark'); // Default to dark for sleek developer feel

  htmlElement.setAttribute('data-theme', initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  // --------------------------------------------------------------------------
  // 2. Mobile Navigation Drawer Handling
  // --------------------------------------------------------------------------
  const menuToggleBtn = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerCloseBtn = document.getElementById('drawer-close');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openDrawer = () => {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('active');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    menuToggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('active');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    menuToggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (menuToggleBtn) menuToggleBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // --------------------------------------------------------------------------
  // 3. Sticky Navbar & Active Navigation Scrollspy
  // --------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  const handleScroll = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header elevation on scroll
    if (navbar) {
      if (scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      if (scrollY > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Scrollspy: Highlight current section link
    const scrollPosition = scrollY + 140;

    sections.forEach(currentSection => {
      const sectionHeight = currentSection.offsetHeight;
      const sectionTop = currentSection.offsetTop;
      const sectionId = currentSection.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });

        mobileNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger on initial render

  // --------------------------------------------------------------------------
  // 4. Back to Top Button Smooth Scroll
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. Skill Bar Animations (Trigger on Scroll via IntersectionObserver)
  // --------------------------------------------------------------------------
  const skillCards = document.querySelectorAll('.skill-card');

  if ('IntersectionObserver' in window) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector('.skill-bar-fill');
          if (fill) {
            const targetWidth = fill.style.getPropertyValue('--skill-width');
            fill.style.width = targetWidth;
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    skillCards.forEach(card => skillObserver.observe(card));
  } else {
    // Fallback for older browsers
    document.querySelectorAll('.skill-bar-fill').forEach(fill => {
      fill.style.width = fill.style.getPropertyValue('--skill-width');
    });
  }

  // --------------------------------------------------------------------------
  // 6. Skills Category Filter Tabs
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.skills-filter .filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 7. Project Modal Dialogs (Open, Close, Esc Key, Backdrop)
  // --------------------------------------------------------------------------
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const projectModals = document.querySelectorAll('.project-modal');

  const openProjectModal = (modalId) => {
    const targetModal = document.getElementById(modalId);
    if (!targetModal) return;

    targetModal.classList.add('active');
    targetModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button inside modal
    const closeBtn = targetModal.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.focus();
  };

  const closeAllModals = () => {
    projectModals.forEach(modal => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    });
    document.body.style.overflow = '';
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetModalId = btn.getAttribute('data-target');
      if (targetModalId) openProjectModal(targetModalId);
    });
  });

  projectModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-close') || e.target.classList.contains('modal-backdrop')) {
        closeAllModals();
      }
    });
  });

  // Global ESC key listener to close modals & mobile drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
      closeDrawer();
    }
  });

  // --------------------------------------------------------------------------
  // 8. Contact Form Handling & Validation
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const charCounter = document.getElementById('char-counter');
  const submitBtn = document.getElementById('submit-btn');
  const formFeedback = document.getElementById('form-feedback');

  // Character Counter for Message Area
  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      const length = messageInput.value.length;
      charCounter.textContent = `${length} / 500`;
      if (length >= 480) {
        charCounter.style.color = '#ef4444';
      } else {
        charCounter.style.color = '';
      }
    });
  }

  // Clear errors on input
  const inputs = [nameInput, emailInput, subjectInput, messageInput];
  inputs.forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        const parentGroup = input.closest('.form-group');
        if (parentGroup) {
          parentGroup.classList.remove('has-error');
        }
        if (formFeedback) {
          formFeedback.style.display = 'none';
          formFeedback.className = 'form-feedback';
        }
      });
    }
  });

  // Email format validation helper
  const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).trim().toLowerCase());
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasError = false;

      // Validate Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        nameInput.closest('.form-group').classList.add('has-error');
        hasError = true;
      }

      // Validate Email
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        emailInput.closest('.form-group').classList.add('has-error');
        hasError = true;
      }

      // Validate Subject
      if (!subjectInput.value.trim() || subjectInput.value.trim().length < 2) {
        subjectInput.closest('.form-group').classList.add('has-error');
        hasError = true;
      }

      // Validate Message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        messageInput.closest('.form-group').classList.add('has-error');
        hasError = true;
      }

      if (hasError) {
        if (formFeedback) {
          formFeedback.className = 'form-feedback error';
          formFeedback.textContent = 'Please fill out all required fields correctly.';
          formFeedback.style.display = 'block';
        }
        return;
      }

      // If valid: simulate sending state
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        // Display Success Toast
        if (formFeedback) {
          formFeedback.className = 'form-feedback success';
          formFeedback.innerHTML = `<strong>Thank you, ${escapeHTML(nameInput.value.trim())}!</strong> Your message has been simulated and sent successfully. I will get back to you shortly.`;
          formFeedback.style.display = 'block';
        }

        // Reset fields
        contactForm.reset();
        if (charCounter) charCounter.textContent = '0 / 500';
      }, 1200);
    });
  }

  // HTML sanitizer helper for feedback output
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // --------------------------------------------------------------------------
  // 9. Copy Email Address to Clipboard with Visual Tooltip
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copy-email');
  const copyText = document.getElementById('copy-text');

  if (copyEmailBtn && copyText) {
    copyEmailBtn.addEventListener('click', () => {
      const emailToCopy = 'deekamuhudiin@example.com';

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailToCopy).then(() => {
          showCopiedState();
        }).catch(() => {
          fallbackCopyText(emailToCopy);
        });
      } else {
        fallbackCopyText(emailToCopy);
      }
    });

    function showCopiedState() {
      const originalText = copyText.textContent;
      copyText.textContent = 'Copied! ✓';
      copyEmailBtn.style.background = '#10b981';
      copyEmailBtn.style.color = '#ffffff';

      setTimeout(() => {
        copyText.textContent = originalText;
        copyEmailBtn.style.background = '';
        copyEmailBtn.style.color = '';
      }, 2400);
    }

    function fallbackCopyText(text) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        showCopiedState();
      } catch (err) {
        console.error('Copy failed', err);
      }
      document.body.removeChild(textArea);
    }
  }
});
