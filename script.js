document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScrolling();
    initHeaderScroll();
    initScrollToTop();
    initPreloader();
    initMainSlideshow();
    initCateringSlider();
    initScrollAnimations();
    initNewsletterModal();
});

function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const nav = document.getElementById('nav');
    
    if (mobileMenu && nav) {
        // Toggle menu on button click
        mobileMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
        
        // Close menu when clicking on nav links
        document.querySelectorAll('#nav a').forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('active') && 
                !e.target.closest('#nav') && 
                !e.target.closest('#mobile-menu')) {
                closeMenu();
            }
        });
        
        function toggleMenu() {
            mobileMenu.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        }
        
        function closeMenu() {
            mobileMenu.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initHeaderScroll() {
    const header = document.getElementById('header');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.classList.add('scrolled');
                if (mobileMenu) {
                    mobileMenu.style.color = 'var(--dark)';
                }
            } else {
                header.classList.remove('scrolled');
                if (mobileMenu) {
                    mobileMenu.style.color = 'var(--gold)';
                }
            }
        });
    }
}

function initScrollToTop() {
    const scrollToTopBtn = document.createElement('div');
    scrollToTopBtn.id = 'scroll-to-top';
    scrollToTopBtn.innerHTML = `
      <i class="fas fa-chevron-up"></i>
      <div class="progress-bar"></div>
    `;
    document.body.appendChild(scrollToTopBtn);
  
    // Click handler
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    // Update progress on scroll
    window.addEventListener('scroll', () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPosition = window.scrollY;
      const scrollPercentage = (scrollPosition / (scrollHeight - clientHeight)) * 100;
      
      // Update button visibility
      const show = scrollPosition > 300;
      scrollToTopBtn.classList.toggle('show', show);
      
      // Update progress bar
      const progressBar = scrollToTopBtn.querySelector('.progress-bar');
      progressBar.style.height = `${scrollPercentage}%`;
    });
  }

function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    
    document.body.style.overflow = 'hidden';
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            document.body.style.overflow = '';
            
            setTimeout(() => {
                preloader.remove();
            }, 1000);
        }, 500);
    });
    
    // Fallback in case page doesn't load
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        document.body.style.overflow = '';
        setTimeout(() => preloader.remove(), 1000);
    }, 4000);
}

function initMainSlideshow() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        
        // Show first slide immediately
        slides[currentSlide].classList.add('active');
        
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        
        // Start slideshow after first slide is shown
        setTimeout(() => {
            setInterval(nextSlide, 5000);
        }, 1000);
    }
}

function initCateringSlider() {
    const cateringSlides = document.querySelectorAll('.catering-slide');
    if (cateringSlides.length > 0) {
        const dots = document.querySelectorAll('.slider-dot');
        let currentCateringSlide = 0;
        
        function showCateringSlide(n) {
            cateringSlides[currentCateringSlide].classList.remove('active');
            dots[currentCateringSlide].classList.remove('active');
            currentCateringSlide = (n + cateringSlides.length) % cateringSlides.length;
            cateringSlides[currentCateringSlide].classList.add('active');
            dots[currentCateringSlide].classList.add('active');
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showCateringSlide(index);
            });
        });
        
        function nextCateringSlide() {
            showCateringSlide(currentCateringSlide + 1);
        }
        
        setInterval(nextCateringSlide, 6000);
    }
}

function initScrollAnimations() {
    const hiddenElements = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    hiddenElements.forEach(el => observer.observe(el));
}

function initNewsletterModal() {
    const modal = document.getElementById('newsletterModal');
    const closeBtn = document.getElementById('closeModal');
    const form = document.getElementById('newsletterForm');
    
    if (!modal) return;
    
    // Show modal after 30 seconds
    setTimeout(() => {
        modal.classList.add('show');
    }, 30000);
    
    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        // Here you would typically send the email to your server
        alert(`Thank you for subscribing with ${email}!`);
        form.reset();
        modal.classList.remove('show');
    });
    
    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}

async function fixProgressBarVisibility() {
    const progressBar = $0;
    const parent = progressBar.parentElement;
  
    await setElementStyles(progressBar, {
      visibility: 'visible',
      height: '5px',
      zIndex: '101',
    });
  
    await setElementStyles(parent, {
      visibility: 'visible',
      opacity: '1',
      overflow: 'visible',
    });
  }
  
  fixProgressBarVisibility();