/* ============================================
   LUMÉA COMMUNICATION - MAIN JS
   Menu mobile, scroll reveal, accordéon, cookies
   ============================================ */

(function() {
  'use strict';

  // Attendre que le DOM soit complètement chargé
  function init() {
    // Marquer que JavaScript est disponible pour les animations
    document.documentElement.classList.add('js-enabled');

    // === DEBUG MOBILE OVERFLOW (à activer via ?overflowDebug=1) ===
    function runOverflowDebug() {
      try {
        var params = new URLSearchParams(window.location.search || '');
        if (!(params.has('overflowDebug') || params.has('overflow-debug'))) return;

        var styleId = 'overflow-debug-style';
        if (!document.getElementById(styleId)) {
          var style = document.createElement('style');
          style.id = styleId;
          style.textContent = [
            '.overflow-debug-outline { outline: 2px solid #ff2d55 !important; outline-offset: 2px !important; }',
            '.overflow-debug-outline::before { content: attr(data-overflow-debug); position: absolute; top: -1.4em; left: 0; font-size: 10px; padding: 2px 6px; background: rgba(255,45,85,0.92); color: #fff; border-radius: 6px; z-index: 999999; }'
          ].join('\n');
          document.head.appendChild(style);
        }

        // Nettoyer les outlines précédents
        document.querySelectorAll('.overflow-debug-outline').forEach(function(el) {
          el.classList.remove('overflow-debug-outline');
          el.removeAttribute('data-overflow-debug');
        });

        var viewportW = window.innerWidth;
        var offenders = [];
        document.querySelectorAll('*').forEach(function(el) {
          // Ignorer scripts/styles et éléments invisibles
          if (!el || el === document.documentElement || el === document.body) return;
          var tag = (el.tagName || '').toLowerCase();
          if (tag === 'script' || tag === 'style' || tag === 'link' || tag === 'meta' || tag === 'head') return;
          var rect = el.getBoundingClientRect();
          if (!rect || rect.width === 0 || rect.height === 0) return;

          // Débordement à droite (ou très léger dû au subpixel)
          var overflowRight = rect.right - viewportW;
          var overflowLeft = 0 - rect.left;
          if (overflowRight > 1 || overflowLeft > 1) {
            var cls = (el.className && typeof el.className === 'string') ? el.className : '';
            var id = el.id ? ('#' + el.id) : '';
            offenders.push({
              el: el,
              tag: tag,
              cls: cls,
              id: id,
              rect: { left: rect.left, right: rect.right, width: rect.width },
              overflowRight: overflowRight,
              overflowLeft: overflowLeft
            });
          }
        });

        offenders
          .sort(function(a, b) {
            return Math.max(b.overflowRight, b.overflowLeft) - Math.max(a.overflowRight, a.overflowLeft);
          })
          .slice(0, 25)
          .forEach(function(o) {
            try {
              o.el.classList.add('overflow-debug-outline');
              var label = (o.tag + (o.id || '') + (o.cls ? ('.' + String(o.cls).trim().split(/\s+/).join('.')) : ''));
              o.el.setAttribute('data-overflow-debug', label);
            } catch (e) {}
          });

        console.groupCollapsed('[OverflowDebug] viewport', viewportW, 'scrollWidth', document.documentElement.scrollWidth);
        offenders.slice(0, 25).forEach(function(o, i) {
          console.log(
            i + 1,
            o.tag + o.id,
            o.cls,
            'rect:', o.rect,
            'overflowRight:', Math.round(o.overflowRight),
            'overflowLeft:', Math.round(o.overflowLeft),
            o.el
          );
        });
        if (!offenders.length) console.log('Aucun élément ne dépasse la viewport (seuil > 1px).');
        console.groupEnd();
      } catch (e) {
        // Ne jamais casser la page si debug foire
      }
    }

    runOverflowDebug();
    window.addEventListener('resize', function() {
      // rafraîchir le debug si activé
      runOverflowDebug();
    });

    // === NAV ACTIVE STATES + DROPDOWN A11Y ===
    function normalizePath(p) {
      return String(p || '')
        .split('?')[0]
        .split('#')[0]
        .replace(/\/+$/, '');
    }

    function setActiveNav() {
      var path = normalizePath(window.location.pathname);

      // Local dev: /fr/index.html ; prod pretty urls: /fr/ ou /fr/contact
      var isHome = /\/fr$/.test(path) || /\/fr\/?$/.test(window.location.pathname) || /\/fr\/index\.html$/.test(path);
      var isRealisations = /\/fr\/realisations(\.html)?$/.test(path) || /\/fr\/realisation-/.test(path);
      var isAudit = /\/fr\/indice-performance-digitale-locale(\.html)?$/.test(path);
      var isBlog = /\/fr\/blog(\.html)?$/.test(path) || /\/fr\/article(\.html)?$/.test(path);
      var isContact = /\/fr\/contact(\.html)?$/.test(path);
      var isServices = /\/fr\/services(\.html)?$/.test(path) || /\/fr\/(sites-branding|developpement|cybersecurite|consulting|formation)(\.html)?$/.test(path);

      document.querySelectorAll('.navbar-link.active').forEach(function(el) {
        el.classList.remove('active');
      });

      function activate(selector) {
        var el = document.querySelector(selector);
        if (el) el.classList.add('active');
      }

      if (isHome) activate('.navbar-menu a[href$="index.html"]');
      else if (isServices) activate('.navbar-menu a[href$="services.html"]');
      else if (isRealisations) activate('.navbar-menu a[href$="realisations.html"]');
      else if (isAudit) activate('.navbar-menu a[href$="indice-performance-digitale-locale.html"]');
      else if (isBlog) activate('.navbar-menu a[href$="blog.html"]');

      if (isContact) {
        var cta = document.querySelector('.navbar-cta');
        if (cta) cta.classList.add('is-active');
      } else {
        var cta2 = document.querySelector('.navbar-cta');
        if (cta2) cta2.classList.remove('is-active');
      }
    }

    function initNavDropdownA11y() {
      var dropdowns = document.querySelectorAll('.nav-dropdown');
      dropdowns.forEach(function(dd) {
        var toggle = dd.querySelector('.nav-dropdown-toggle');
        var menu = dd.querySelector('.nav-dropdown-menu');
        if (!toggle || !menu) return;

        function setExpanded(open) {
          toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        }

        dd.addEventListener('mouseenter', function() { setExpanded(true); });
        dd.addEventListener('mouseleave', function() { setExpanded(false); });
        dd.addEventListener('focusin', function() { setExpanded(true); });
        dd.addEventListener('focusout', function(e) {
          if (!dd.contains(e.relatedTarget)) setExpanded(false);
        });
      });

      document.addEventListener('keydown', function(e) {
        if (e.key !== 'Escape') return;
        document.querySelectorAll('.nav-dropdown-toggle[aria-expanded="true"]').forEach(function(t) {
          t.setAttribute('aria-expanded', 'false');
          try { t.blur(); } catch (err) {}
        });
      });
    }

    setActiveNav();
    initNavDropdownA11y();

    // === MENU MOBILE ===
    const navCenter = document.querySelector('.nav-center');
    const navbarToggles = document.querySelectorAll('.navbar-toggle');

    // A11Y: relier le bouton au menu contrôlé
    if (navCenter && !navCenter.id) {
      navCenter.id = 'primary-nav';
    }
    if (navCenter && navbarToggles.length) {
      navbarToggles.forEach(function(btn) {
        btn.setAttribute('aria-controls', navCenter.id);
      });
    }

    function setMenuIcon(open) {
      const iconChar = open ? '✕' : '☰';
      navbarToggles.forEach(function(btn) {
        const icon = btn.querySelector('i') || btn;
        icon.textContent = iconChar;
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    if (navCenter && navbarToggles.length) {
      // Synchronise l'état initial (au cas où une page injecte .active)
      setMenuIcon(navCenter.classList.contains('active'));

      function toggleMobileMenu(e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        navCenter.classList.toggle('active');
        const isOpen = navCenter.classList.contains('active');
        setMenuIcon(isOpen);
        document.body.classList.toggle('nav-open', isOpen);
      }

      // Ouvrir/fermer au clic sur n'importe quel bouton hamburger (évite les pages avec doublon)
      navbarToggles.forEach(function(toggleBtn) {
        toggleBtn.addEventListener('click', toggleMobileMenu);
        // iOS Safari: le click peut être capricieux -> touchstart non-passif
        toggleBtn.addEventListener('touchstart', toggleMobileMenu, { passive: false });
      });

      // Fermer le menu en cliquant sur un lien (pas sur les sous-menus desktop)
      const navbarLinks = navCenter.querySelectorAll('a.navbar-link');
      navbarLinks.forEach(link => {
        link.addEventListener('click', function() {
          navCenter.classList.remove('active');
          setMenuIcon(false);
          document.body.classList.remove('nav-open');
        });
      });

      // Fermer le menu en cliquant en dehors
      document.addEventListener('click', function(e) {
        const clickedToggle = Array.prototype.some.call(navbarToggles, function(btn) { return btn.contains(e.target); });
        if (!clickedToggle && !navCenter.contains(e.target)) {
          navCenter.classList.remove('active');
          setMenuIcon(false);
          document.body.classList.remove('nav-open');
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
    // Attendre un peu pour s'assurer que tous les éléments sont dans le DOM
    setTimeout(function() {
      const faqQuestions = document.querySelectorAll('.faq-question');
      
      console.log('FAQ questions trouvées:', faqQuestions.length);
      
      if (faqQuestions.length > 0) {
        faqQuestions.forEach((question, index) => {
          // Vérifier que l'élément suivant est bien la réponse
          const answer = question.nextElementSibling;
          
          if (!answer || !answer.classList.contains('faq-answer')) {
            console.warn('FAQ question', index, 'n\'a pas de réponse trouvée. Élément suivant:', answer);
            return;
          }
          
          console.log('FAQ', index, 'configurée:', question.textContent.trim().substring(0, 30));
          
          // Ajouter l'événement click
          question.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = this.classList.contains('active');
            const currentAnswer = this.nextElementSibling;
            
            console.log('FAQ cliquée:', this.textContent.trim(), 'Active:', isActive, 'Answer trouvée:', !!currentAnswer);
            
            // Fermer toutes les autres questions
            faqQuestions.forEach(q => {
              if (q !== this) {
                q.classList.remove('active');
                const otherAnswer = q.nextElementSibling;
                if (otherAnswer && otherAnswer.classList.contains('faq-answer')) {
                  otherAnswer.classList.remove('active');
                }
              }
            });
            
            // Toggle la question actuelle
            if (isActive) {
              this.classList.remove('active');
              this.setAttribute('aria-expanded', 'false');
              if (currentAnswer) {
                currentAnswer.classList.remove('active');
                console.log('FAQ fermée');
              }
            } else {
              this.classList.add('active');
              this.setAttribute('aria-expanded', 'true');
              if (currentAnswer) {
                currentAnswer.classList.add('active');
                console.log('FAQ ouverte, classes:', currentAnswer.className);
              }
            }
          });
        });
      } else {
        console.warn('Aucune question FAQ trouvée. Vérification du DOM...');
        // Vérifier si les éléments existent mais avec un autre sélecteur
        const faqContainer = document.querySelector('.faq');
        if (faqContainer) {
          console.log('Container FAQ trouvé:', faqContainer);
          const allButtons = faqContainer.querySelectorAll('button');
          console.log('Boutons trouvés dans FAQ:', allButtons.length);
        }
      }
    }, 100); // Petit délai pour s'assurer que tout est chargé

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

    // === FILTRE PRODUCTIONS (page Réalisations) ===
    const productionFilterBtns = document.querySelectorAll('.production-filter-btn');
    const productionCards = document.querySelectorAll('.production-card');
    if (productionFilterBtns.length && productionCards.length) {
      productionFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          const filter = this.getAttribute('data-filter') || 'all';
          productionFilterBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', b === this ? 'true' : 'false');
          });
          this.classList.add('active');
          this.setAttribute('aria-pressed', 'true');
          productionCards.forEach(card => {
            const category = card.getAttribute('data-category') || '';
            const show = filter === 'all' || category === filter;
            card.style.display = show ? '' : 'none';
          });
        });
      });
    }

    // === CARROUSEL D'IMAGES DANS CHAQUE CARTE (page Réalisations) ===
    document.querySelectorAll('.card-image-carousel').forEach(function(carousel) {
      const track = carousel.querySelector('.card-carousel-track');
      const counterEl = carousel.querySelector('.card-carousel-counter');
      const prevBtn = carousel.querySelector('.card-carousel-prev');
      const nextBtn = carousel.querySelector('.card-carousel-next');
      const images = carousel.querySelectorAll('.card-carousel-track img');
      const total = images.length;
      let index = 0;

      function update() {
        if (track) track.style.transform = 'translateX(-' + index * 100 + '%)';
        if (counterEl) counterEl.textContent = (index + 1) + ' / ' + total;
      }

      if (prevBtn) prevBtn.addEventListener('click', function() {
        index = (index - 1 + total) % total;
        update();
      });
      if (nextBtn) nextBtn.addEventListener('click', function() {
        index = (index + 1) % total;
        update();
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
      // Pré-sélection de la raison depuis l'URL (ex: contact.html?subject=audit)
      const urlParams = new URLSearchParams(window.location.search);
      const subject = urlParams.get('subject');
      const reasonSelect = contactForm.querySelector('[name="reason"]');
      if (subject && reasonSelect && reasonSelect.querySelector('option[value="' + subject + '"]')) {
        reasonSelect.value = subject;
      }

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
      
      // Traduire la raison selon la langue (lang et isSpanish déjà déclarés plus haut)
      let reasonLabel = '';
      if (reason) {
        const reasons = {
          'audit': isSpanish ? 'Auditoría gratuita' : 'Audit gratuit',
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
        to_email: 'lumeasolution@outlook.fr',
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
  }

  // Initialiser quand le DOM est prêt
  // Avec defer, le script s'exécute après le parsing, mais on s'assure que tout est prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else if (document.readyState === 'interactive' || document.readyState === 'complete') {
    // DOM déjà chargé ou en cours de chargement
    // Attendre un peu pour s'assurer que tous les éléments sont disponibles
    if (document.body) {
      // Utiliser requestAnimationFrame pour s'assurer que le DOM est complètement prêt
      requestAnimationFrame(function() {
        setTimeout(init, 0);
      });
    } else {
      // Si body n'est pas encore là, attendre DOMContentLoaded
      document.addEventListener('DOMContentLoaded', init);
    }
  } else {
    // Fallback
    init();
  }
})();



