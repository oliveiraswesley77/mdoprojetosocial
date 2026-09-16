/**
 * AURORA FUTEBOL CLUBE - JAVASCRIPT PRINCIPAL (MAIN.JS)
 * Funcionalidades interativas, contadores, abas dinâmicas e modais
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initStaffFilters();
  initAcademyTabs();
  initModals();
  initForms();
  initScrollAnimations();
});

/* ==========================================================================
   1. NAVBAR & MENU MOBILE
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-link');

  // Efeito de sombra e blur no scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Toggle do menu mobile
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Fechar menu ao clicar em qualquer link
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // Destacar link ativo de acordo com a seção visível
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href*="${sectionId}"]`);
      if (link) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  });
}

/* ==========================================================================
  2. FILTROS DE COMISSÃO TÉCNICA / PROFESSORES
   ========================================================================== */
function initStaffFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const coachCards = document.querySelectorAll('.coach-card');

  if (!filterButtons.length || !coachCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      coachCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   4. ABAS DAS CATEGORIAS DE BASE (SUB-11 a SUB-20)
   ========================================================================== */
function initAcademyTabs() {
  const tabButtons = document.querySelectorAll('.academy-tab-btn');
  const categoryPanels = document.querySelectorAll('.category-panel');

  if (!tabButtons.length || !categoryPanels.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCategory = btn.getAttribute('data-target');

      tabButtons.forEach(b => b.classList.remove('active'));
      categoryPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetCategory);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   5. MODAIS (PENEIRAS, TOUR DO ESTÁDIO E SÓCIO)
   ========================================================================== */
function initModals() {
  const openModalBtns = document.querySelectorAll('[data-modal-target]');
  const closeModalBtns = document.querySelectorAll('.modal-close-btn');
  const overlays = document.querySelectorAll('.modal-overlay');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-modal-target');
      const modal = document.getElementById(targetId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      overlays.forEach(overlay => {
        if (overlay.classList.contains('active')) {
          overlay.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  });
}

/* ==========================================================================
   6. SUBMISSÃO DE FORMULÁRIOS & TOAST
   ========================================================================== */
function initForms() {
  // Form de Peneiras
  const peneiraForm = document.getElementById('peneiraForm');
  if (peneiraForm) {
    peneiraForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(peneiraForm);
      const category = peneiraForm.elements.atletaCategoria;
      const position = peneiraForm.elements.atletaPosicao;
      const dominantFoot = peneiraForm.elements.atletaPe;
      const message = [
        'Olá! Quero fazer a pré-inscrição para a peneira do Meninos De Ouro.',
        '',
        `Nome do atleta: ${formData.get('atletaNome')}`,
        `Data de nascimento: ${formData.get('atletaNasc')}`,
        `Categoria: ${category.options[category.selectedIndex].text}`,
        `Posição principal: ${position.options[position.selectedIndex].text}`,
        `Pé dominante: ${dominantFoot.options[dominantFoot.selectedIndex].text}`,
        `Contato do responsável: ${formData.get('responsavelContato')}`
      ].join('\n');

      const whatsappUrl = `https://wa.me/5571991540137?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      const modal = peneiraForm.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
      peneiraForm.reset();
      showToast('Dados preparados no WhatsApp. Envie a mensagem para concluir a inscrição.');
    });
  }

  // Form de Tour do Estádio
  const tourForm = document.getElementById('tourForm');
  if (tourForm) {
    tourForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const modal = tourForm.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
      tourForm.reset();
      showToast('Agendamento de Tour confirmado! Enviamos o voucher para o seu e-mail.');
    });
  }

  // Form Newsletter
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterForm.reset();
      showToast('Você agora faz parte do boletim oficial do Aurora F.C.!');
    });
  }
}

// Sistema de Notificações Toast
function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast-notification';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span id="toastMsg"></span>`;
    document.body.appendChild(toast);
  }

  const msgSpan = toast.querySelector('#toastMsg');
  if (msgSpan) {
    msgSpan.textContent = message;
  }

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* ==========================================================================
   7. ANIMAÇÃO DE REVELAÇÃO NO SCROLL
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.timeline-card, .trophy-card, .feature-box, .coach-card, .schedule-card, .membership-card'
  );

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}
