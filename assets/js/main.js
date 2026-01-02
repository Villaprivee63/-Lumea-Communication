/* ============================================
   LUMÉA COMMUNICATION - MAIN JS
   Menu mobile, scroll reveal, accordéon, cookies
   ============================================ */

(function() {
  'use strict';

  // Marquer que JavaScript est disponible pour les animations
  document.documentElement.classList.add('js-enabled');

  // === MENU MOBILE ===
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navCenter = document.querySelector('.nav-center');
  
  if (navbarToggle && navCenter) {
    navbarToggle.addEventListener('click', function() {
      navCenter.classList.toggle('active');
      const icon = navbarToggle.querySelector('i') || navbarToggle;
      if (navCenter.classList.contains('active')) {
        icon.textContent = '✕';
      } else {
        icon.textContent = '☰';
      }
    });

    // Fermer le menu en cliquant sur un lien
    const navbarLinks = navCenter.querySelectorAll('.navbar-link');
    navbarLinks.forEach(link => {
      link.addEventListener('click', function() {
        navCenter.classList.remove('active');
        const icon = navbarToggle.querySelector('i') || navbarToggle;
        icon.textContent = '☰';
      });
    });

    // Fermer le menu en cliquant en dehors
    document.addEventListener('click', function(e) {
      if (!navbarToggle.contains(e.target) && !navCenter.contains(e.target)) {
        navCenter.classList.remove('active');
        const icon = navbarToggle.querySelector('i') || navbarToggle;
        icon.textContent = '☰';
      }
    });
  }

  // === SCROLL REVEAL ===
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observer tous les éléments avec la classe fade-in
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // === ACCORDÉON FAQ ===
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const isActive = this.classList.contains('active');
      const answer = this.nextElementSibling;
      
      // Fermer toutes les autres questions
      faqQuestions.forEach(q => {
        if (q !== this) {
          q.classList.remove('active');
          q.nextElementSibling.classList.remove('active');
        }
      });
      
      // Toggle la question actuelle
      if (isActive) {
        this.classList.remove('active');
        answer.classList.remove('active');
      } else {
        this.classList.add('active');
        answer.classList.add('active');
      }
    });
  });

  // === COOKIE BANNER ===
  const cookieBanner = document.querySelector('.cookie-banner');
  const cookieAccept = document.querySelector('.cookie-accept');
  const cookieDecline = document.querySelector('.cookie-decline');
  
  // Vérifier si les cookies ont déjà été acceptés
  function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent && cookieBanner) {
      cookieBanner.classList.add('active');
    }
  }
  
  if (cookieAccept) {
    cookieAccept.addEventListener('click', function() {
      localStorage.setItem('cookieConsent', 'accepted');
      if (cookieBanner) {
        cookieBanner.classList.remove('active');
      }
    });
  }
  
  if (cookieDecline) {
    cookieDecline.addEventListener('click', function() {
      localStorage.setItem('cookieConsent', 'declined');
      if (cookieBanner) {
        cookieBanner.classList.remove('active');
      }
    });
  }
  
  // Vérifier au chargement
  checkCookieConsent();

  // === SMOOTH SCROLL POUR ANCRES ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80; // Compenser la navbar sticky
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // === ACTIVE NAV LINK ===
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar-link');
  
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === currentPath || (currentPath === '/' && linkPath.includes('index.html'))) {
      link.classList.add('active');
    }
  });

  // === FORMULAIRE CONTACT ===
  // Configuration EmailJS - CONFIGURÉ ✅
  const EMAILJS_SERVICE_ID = 'service_h5cz56a';
  const EMAILJS_TEMPLATE_ID = 'template_1lznmjc'; // ID correct depuis les paramètres du template
  const EMAILJS_PUBLIC_KEY = 'CVJWmgYc1uNOsPXCK';
  
  // Vérifier si EmailJS est chargé
  if (typeof emailjs === 'undefined') {
    console.warn('EmailJS n\'est pas chargé. Assurez-vous d\'inclure le script EmailJS dans vos pages HTML.');
  }
  
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formMessage = document.querySelector('.form-message');
      const submitButton = this.querySelector('button[type="submit"]');
      const originalButtonText = submitButton ? submitButton.textContent : '';
      
      // Détecter la langue pour les messages
      const lang = document.documentElement.lang || 'fr';
      const isSpanish = lang.includes('es');
      
      // Désactiver le bouton pendant l'envoi
      if (submitButton) {
        submitButton.disabled = true;
        if (isSpanish) {
          submitButton.textContent = 'Enviando...';
        } else {
          submitButton.textContent = 'Envoi en cours...';
        }
      }
      
      // Masquer les messages précédents
      if (formMessage) {
        formMessage.style.display = 'none';
        formMessage.classList.remove('success', 'error');
      }
      
      // Vérifier que EmailJS est disponible
      if (typeof emailjs === 'undefined') {
        console.error('EmailJS n\'est pas chargé');
        if (formMessage) {
          formMessage.classList.add('error');
          if (isSpanish) {
            formMessage.textContent = 'Error de configuración. Por favor, contacte al administrador.';
          } else {
            formMessage.textContent = 'Erreur de configuration. Veuillez contacter l\'administrateur.';
          }
          formMessage.style.display = 'block';
        }
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
        return;
      }
      
      // Initialiser EmailJS avec la clé publique
      try {
        emailjs.init(EMAILJS_PUBLIC_KEY);
      } catch (initError) {
        console.error('Erreur initialisation EmailJS:', initError);
      }
      
      // Préparer les paramètres du template
      // Récupérer le numéro de téléphone (peut contenir l'indicatif dans le placeholder)
      const phoneNumber = this.querySelector('[name="phone"]') ? this.querySelector('[name="phone"]').value.trim() : '';
      const fullPhone = phoneNumber || '';
      
      // Récupérer la raison de contact
      const reasonSelect = this.querySelector('[name="reason"]');
      const reason = reasonSelect ? reasonSelect.value : '';
      
      // Traduire la raison selon la langue
      const lang = document.documentElement.lang || 'fr';
      const isSpanish = lang.includes('es');
      let reasonLabel = '';
      if (reason) {
        const reasons = {
          'consulting': isSpanish ? 'Consultoría' : 'Consulting',
          'formation': isSpanish ? 'Formación' : 'Formation',
          'cybersecurite': isSpanish ? 'Ciberseguridad' : 'Cybersécurité',
          'creation-site': isSpanish ? 'Creación de sitio' : 'Création de site',
          'branding': 'Branding',
          'developpement': isSpanish ? 'Desarrollo' : 'Développement',
          'autre': isSpanish ? 'Otro' : 'Autre'
        };
        reasonLabel = reasons[reason] || reason;
      }
      
      const templateParams = {
        from_name: this.querySelector('[name="name"]').value,
        from_email: this.querySelector('[name="email"]').value,
        phone: fullPhone,
        reason: reasonLabel,
        message: this.querySelector('[name="message"]').value,
        to_name: 'Luméa Communication',
        reply_to: this.querySelector('[name="email"]').value
      };
      
      console.log('Envoi email avec paramètres:', {
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
        params: templateParams
      });
      
      try {
        // Envoyer l'email via EmailJS
        const response = await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams
        );
        
        console.log('Réponse EmailJS:', response);
        
        // EmailJS v4 peut retourner status 200 ou text 'OK'
        if (response.status === 200 || response.text === 'OK' || (response.status >= 200 && response.status < 300)) {
          // Succès
          if (formMessage) {
            formMessage.classList.add('success');
            if (isSpanish) {
              formMessage.textContent = 'Gracias por su mensaje. Le responderemos lo antes posible.';
            } else {
              formMessage.textContent = 'Merci pour votre message. Nous vous répondrons dans les plus brefs délais.';
            }
            formMessage.style.display = 'block';
          }
          this.reset();
          
          // Masquer le message après 5 secondes
          setTimeout(() => {
            if (formMessage) {
              formMessage.style.display = 'none';
            }
          }, 5000);
        } else {
          throw new Error('Erreur lors de l\'envoi');
        }
      } catch (error) {
        // Erreur réseau ou autre
        console.error('Erreur formulaire complète:', error);
        console.error('Détails erreur:', {
          message: error.text || error.message,
          status: error.status,
          serviceId: EMAILJS_SERVICE_ID,
          templateId: EMAILJS_TEMPLATE_ID
        });
        
        if (formMessage) {
          formMessage.classList.add('error');
          let errorMessage = 'Erreur lors de l\'envoi du message. Veuillez réessayer ou nous contacter directement par email.';
          
          if (isSpanish) {
            errorMessage = 'Error al enviar el mensaje. Por favor, inténtelo de nuevo o contáctenos directamente por email.';
          }
          
          // Message d'erreur plus détaillé en mode développement
          if (error.text) {
            errorMessage += ' (Erreur: ' + error.text + ')';
          } else if (error.message) {
            errorMessage += ' (Erreur: ' + error.message + ')';
          }
          
          formMessage.textContent = errorMessage;
          formMessage.style.display = 'block';
        }
      } finally {
        // Réactiver le bouton
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
      }
    });
  }


  // === INITIALISATION ===
  console.log('Luméa Communication - Site chargé');
})();



