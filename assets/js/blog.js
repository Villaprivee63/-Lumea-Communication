/* ============================================
   LUMÉA COMMUNICATION - BLOG JS
   Filtres articles côté client
   ============================================ */

(function() {
  'use strict';

  const filterButtons = document.querySelectorAll('.filter-btn');
  const blogCards = document.querySelectorAll('.blog-card');
  
  if (filterButtons.length === 0 || blogCards.length === 0) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.dataset.filter || 'all';
      
      // Toggle active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filtrer les articles
      blogCards.forEach(card => {
        const cardCategory = card.dataset.category || '';
        
        if (filter === 'all' || cardCategory === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.classList.add('visible');
          }, 10);
        } else {
          card.classList.remove('visible');
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Initialiser avec "all"
  const allButton = document.querySelector('.filter-btn[data-filter="all"]');
  if (allButton) {
    allButton.click();
  }
})();




