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

// Update the initMainSlideshow function in script.js
function initMainSlideshow() {
    const slideshowContainers = document.querySelectorAll('.slideshow-container');
    
    slideshowContainers.forEach(container => {
        const slides = container.querySelectorAll('.slide');
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
    });
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

  function initRoomCarousel() {
    const carousel = document.querySelector('.room-carousel');
    const previews = document.querySelectorAll('.room-preview');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    let currentIndex = 0;
    
    function updateCarousel() {
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
      
      previews.forEach((preview, index) => {
        preview.classList.toggle('active', index === currentIndex);
      });
    }
    
    function nextSlide() {
      currentIndex = (currentIndex + 1) % previews.length;
      updateCarousel();
    }
    
    function prevSlide() {
      currentIndex = (currentIndex - 1 + previews.length) % previews.length;
      updateCarousel();
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
    });
    
    // Auto-advance every 5 seconds
    setInterval(nextSlide, 5000);
  }
  
  // Add to DOMContentLoaded event listener
  document.addEventListener('DOMContentLoaded', function() {
    // ... existing init functions ...
    initRoomCarousel();
  });

  // Add to script.js to log image loading errors
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('img').forEach(img => {
      img.onerror = function() {
        console.error('Failed to load image:', this.src);
      };
    });
  });

  // Lazy loading
function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('img.lazy');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => observer.observe(img));
  }

  function initExperienceCards() {
    const experienceCards = document.querySelectorAll('.experience-card');
    const fullscreenViewer = document.querySelector('.experience-fullscreen');
    
    experienceCards.forEach(card => {
      const images = card.querySelectorAll('.experience-images img');
      const prevBtn = card.querySelector('.exp-prev');
      const nextBtn = card.querySelector('.exp-next');
      const dotsContainer = card.querySelector('.exp-dots');
      let currentIndex = 0;
      let autoPlayInterval;
  
      // Initialize dots
      dotsContainer.innerHTML = '';
      images.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('exp-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          goToImage(index);
        });
        dotsContainer.appendChild(dot);
      });
      const dots = card.querySelectorAll('.exp-dot');
  
      // Card functions
      function updateImage() {
        images.forEach((img, idx) => {
          img.classList.toggle('active', idx === currentIndex);
        });
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentIndex);
        });
      }
  
      function goToImage(index) {
        currentIndex = index;
        updateImage();
        resetAutoPlay();
      }
  
      function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
        resetAutoPlay();
      }
  
      function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
        resetAutoPlay();
      }
  
      function startAutoPlay() {
        autoPlayInterval = setInterval(nextImage, 3000);
      }
  
      function stopAutoPlay() {
        clearInterval(autoPlayInterval);
      }
  
      function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
      }
  
      // Fullscreen functions
      function openFullscreen() {
        const fsImage = fullscreenViewer.querySelector('.fullscreen-image');
        const fsDots = fullscreenViewer.querySelector('.fs-dots');
        const fsPrev = fullscreenViewer.querySelector('.fs-prev');
        const fsNext = fullscreenViewer.querySelector('.fs-next');
        
        // Initialize fullscreen viewer
        fsDots.innerHTML = '';
        images.forEach((img, index) => {
          const dot = document.createElement('span');
          dot.classList.add('fs-dot');
          if (index === currentIndex) dot.classList.add('active');
          dot.addEventListener('click', () => {
            currentIndex = index;
            updateFullscreen();
          });
          fsDots.appendChild(dot);
        });
  
        function updateFullscreen() {
          fsImage.src = images[currentIndex].src;
          fsDots.querySelectorAll('.fs-dot').forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
          });
        }
  
        fsPrev.addEventListener('click', () => {
          currentIndex = (currentIndex - 1 + images.length) % images.length;
          updateFullscreen();
        });
  
        fsNext.addEventListener('click', () => {
          currentIndex = (currentIndex + 1) % images.length;
          updateFullscreen();
        });
  
        // Open viewer
        fsImage.src = images[currentIndex].src;
        fullscreenViewer.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
  
      // Event listeners
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.experience-nav')) {
          openFullscreen();
        }
      });
  
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        prevImage();
      });
  
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        nextImage();
      });
  
      card.addEventListener('mouseenter', startAutoPlay);
      card.addEventListener('mouseleave', stopAutoPlay);
  
      // Initialize
      updateImage();
    });
  
    // Close fullscreen
    document.querySelector('.close-fs').addEventListener('click', () => {
      fullscreenViewer.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

function initExperienceCards() {
    const experienceCards = document.querySelectorAll('.experience-card');
    
    experienceCards.forEach(card => {
      const images = card.querySelectorAll('.experience-images img');
      const prevBtn = card.querySelector('.exp-prev');
      const nextBtn = card.querySelector('.exp-next');
      const dotsContainer = card.querySelector('.exp-dots');
      let currentImage = 0;
      
      // Create dots
      images.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('exp-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToImage(index));
        dotsContainer.appendChild(dot);
      });
      
      const dots = card.querySelectorAll('.exp-dot');
      
      function updateImage() {
        images.forEach((img, index) => {
          img.classList.toggle('active', index === currentImage);
        });
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentImage);
        });
      }
      
      function nextImage() {
        currentImage = (currentImage + 1) % images.length;
        updateImage();
      }
      
      function prevImage() {
        currentImage = (currentImage - 1 + images.length) % images.length;
        updateImage();
      }
      
      function goToImage(index) {
        currentImage = index;
        updateImage();
      }
      
      // Button event listeners
      if (nextBtn) nextBtn.addEventListener('click', nextImage);
      if (prevBtn) prevBtn.addEventListener('click', prevImage);
      
      // Auto-advance
      let intervalId;
      
      card.addEventListener('mouseenter', () => {
        intervalId = setInterval(nextImage, 3000);
      });
      
      card.addEventListener('mouseleave', () => {
        clearInterval(intervalId);
      });
      
      // Initialize
      updateImage();
    });
  }

// Add to script.js
function initEnhancedExperienceCards() {
    const experienceCards = document.querySelectorAll('.experience-card');
    
    experienceCards.forEach(card => {
      const images = card.querySelectorAll('.experience-images img');
      let currentImageIndex = 0;
      
      // Create fullscreen viewer elements
      const fullscreenViewer = document.createElement('div');
      fullscreenViewer.className = 'experience-fullscreen';
      
      const fullscreenImg = document.createElement('img');
      fullscreenImg.alt = 'Fullscreen experience view';
      
      const closeBtn = document.createElement('span');
      closeBtn.className = 'close-fullscreen';
      closeBtn.innerHTML = '&times;';
      
      const navDiv = document.createElement('div');
      navDiv.className = 'fullscreen-nav';
      
      const prevBtn = document.createElement('button');
      prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
      
      const nextBtn = document.createElement('button');
      nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
      
      navDiv.appendChild(prevBtn);
      navDiv.appendChild(nextBtn);
      fullscreenViewer.appendChild(fullscreenImg);
      fullscreenViewer.appendChild(navDiv);
      fullscreenViewer.appendChild(closeBtn);
      document.body.appendChild(fullscreenViewer);
      
      // Card hover effect
      card.addEventListener('mouseenter', () => {
        card.querySelector('.experience-overlay').style.opacity = '1';
      });
      
      card.addEventListener('mouseleave', () => {
        card.querySelector('.experience-overlay').style.opacity = '0';
      });
      
      // Click to open fullscreen
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.experience-nav')) {
          currentImageIndex = 0;
          fullscreenImg.src = images[currentImageIndex].src;
          fullscreenViewer.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
      
      // Navigation in fullscreen
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        fullscreenImg.src = images[currentImageIndex].src;
      });
      
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        fullscreenImg.src = images[currentImageIndex].src;
      });
      
      // Close fullscreen
      closeBtn.addEventListener('click', () => {
        fullscreenViewer.classList.remove('active');
        document.body.style.overflow = '';
      });
      
      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (fullscreenViewer.classList.contains('active')) {
          if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            fullscreenImg.src = images[currentImageIndex].src;
          } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            fullscreenImg.src = images[currentImageIndex].src;
          } else if (e.key === 'Escape') {
            fullscreenViewer.classList.remove('active');
            document.body.style.overflow = '';
          }
        }
      });
    });
  }
  
  // Add to DOMContentLoaded event listener
  document.addEventListener('DOMContentLoaded', function() {
    initEnhancedExperienceCards();
  });

  // Add to script.js
function initParallaxSlideshows() {
    const slideshowSections = document.querySelectorAll('.slideshow-section');
    
    slideshowSections.forEach(section => {
      window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const sectionPosition = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition > sectionPosition - window.innerHeight && 
            scrollPosition < sectionPosition + sectionHeight) {
          const depth = scrollPosition - sectionPosition;
          const slides = section.querySelectorAll('.slide');
          
          slides.forEach((slide, index) => {
            const speed = 0.2 + (index * 0.1);
            const move = depth * speed;
            slide.style.transform = `translateY(${move}px) translateZ(-1px) scale(2)`;
          });
        }
      });
    });
  }
  
  // Add to DOMContentLoaded event listener
  document.addEventListener('DOMContentLoaded', function() {
    initParallaxSlideshows();
  });

  // Add to script.js
function initVirtualTours() {
    const tours = document.querySelectorAll('.virtual-tour');
    
    tours.forEach(tour => {
      const images = tour.dataset.images.split(',');
      let currentIndex = 0;
      const container = tour.closest('.virtual-tour-container');
      const prevBtn = container.querySelector('.tour-prev');
      const nextBtn = container.querySelector('.tour-next');
      const progress = container.querySelector('.tour-progress');
      
      // Initialize
      tour.style.backgroundImage = `url(${images[currentIndex]})`;
      progress.textContent = `1/${images.length}`;
      
      // Navigation
      function updateTour() {
        tour.style.backgroundImage = `url(${images[currentIndex]})`;
        progress.textContent = `${currentIndex + 1}/${images.length}`;
      }
      
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateTour();
      });
      
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateTour();
      });
      
      // Mouse movement control
      let isDragging = false;
      let startX = 0;
      
      tour.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
      });
      
      window.addEventListener('mouseup', () => {
        isDragging = false;
      });
      
      window.addEventListener('mousemove', (e) => {
        if (isDragging) {
          const moveX = e.clientX - startX;
          if (Math.abs(moveX) > 50) {
            if (moveX > 0) {
              currentIndex = (currentIndex - 1 + images.length) % images.length;
            } else {
              currentIndex = (currentIndex + 1) % images.length;
            }
            updateTour();
            startX = e.clientX;
          }
        }
      });
      
      // Touch support
      tour.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
      });
      
      window.addEventListener('touchend', () => {
        isDragging = false;
      });
      
      window.addEventListener('touchmove', (e) => {
        if (isDragging) {
          const moveX = e.touches[0].clientX - startX;
          if (Math.abs(moveX) > 30) {
            if (moveX > 0) {
              currentIndex = (currentIndex - 1 + images.length) % images.length;
            } else {
              currentIndex = (currentIndex + 1) % images.length;
            }
            updateTour();
            startX = e.touches[0].clientX;
          }
        }
      });
    });
  }
  
  // Add to DOMContentLoaded event listener
  document.addEventListener('DOMContentLoaded', function() {
    initVirtualTours();
  });

  function initPromoBanner() {
    const promoBanner = document.querySelector('.promo-banner');
    const closeBtn = document.querySelector('.close-promo');
    const header = document.querySelector('header');
  
    if (!promoBanner) return;
  
    // Show banner by default unless dismissed
    if (!localStorage.getItem('promoDismissed')) {
      promoBanner.style.display = 'block';
      header.style.top = '40px'; // Match banner height
    }
  
    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent event bubbling
      promoBanner.style.display = 'none';
      header.style.top = '0';
      localStorage.setItem('promoDismissed', 'true');
    });
  
    // Handle header scroll effects
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // Initialize when DOM loads
  document.addEventListener('DOMContentLoaded', function() {
    initPromoBanner();
    // Your other init functions...
  });

  function initVirtualTours() {
    const viewTourBtns = document.querySelectorAll('.view-tour-btn');
    const tourOverlay = document.querySelector('.virtual-tour-overlay');
    
    if (!viewTourBtns.length || !tourOverlay) return;
    
    viewTourBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tourContainer = tourOverlay.querySelector('.virtual-tour-container');
        const tourImage = tourContainer.querySelector('.tour-image');
        const prevBtn = tourContainer.querySelector('.tour-prev');
        const nextBtn = tourContainer.querySelector('.tour-next');
        const progress = tourContainer.querySelector('.tour-progress');
        const closeBtn = tourContainer.querySelector('.close-tour');
        
        // Sample images - replace with your actual 360 images
        const images = [
          'assets/rooms/room-1.webp',
          'assets/rooms/room-2.webp',
          'assets/rooms/room-3.webp',
          'assets/rooms/room-4.webp',
          'assets/rooms/room-5.webp',
          'assets/rooms/fam-room.webp'
        ];
        
        let currentIndex = 0;
        
        function updateTour() {
          tourImage.src = images[currentIndex];
          progress.textContent = `${currentIndex + 1}/${images.length}`;
        }
        
        // Initialize
        updateTour();
        
        // Navigation
        prevBtn.addEventListener('click', () => {
          currentIndex = (currentIndex - 1 + images.length) % images.length;
          updateTour();
        });
        
        nextBtn.addEventListener('click', () => {
          currentIndex = (currentIndex + 1) % images.length;
          updateTour();
        });
        
        // Keyboard navigation
        function handleKeyDown(e) {
          if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateTour();
          } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % images.length;
            updateTour();
          } else if (e.key === 'Escape') {
            closeTour();
          }
        }
        
        function closeTour() {
          tourOverlay.classList.remove('active');
          document.body.style.overflow = '';
          document.removeEventListener('keydown', handleKeyDown);
        }
        
        closeBtn.addEventListener('click', closeTour);
        
        // Show the tour
        tourOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown);
      });
    });
  }

  // Booking form
function initBookingForm() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  // Set minimum date for check-in (today)
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('checkIn').min = today;

  // Update check-out min date when check-in changes
  document.getElementById('checkIn').addEventListener('change', function() {
    document.getElementById('checkOut').min = this.value;
  });

  // Validation functions
  function validateName(name) {
    return name.length >= 3;
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePhone(phone) {
    const re = /^[\d\s\-\(\)]{8,}$/;
    return re.test(phone);
  }

  function validateDates(checkIn, checkOut) {
    if (!checkIn || !checkOut) return false;
    return new Date(checkOut) > new Date(checkIn);
  }

  // Real-time validation
  form.addEventListener('input', function(e) {
    const input = e.target;
    const errorElement = input.nextElementSibling;
    
    if (input.tagName === 'INPUT' && errorElement && errorElement.classList.contains('error-message')) {
      validateField(input);
    }
  });

  function validateField(input) {
    let isValid = true;
    const value = input.value.trim();
    const errorElement = input.nextElementSibling;

    if (input.required && !value) {
      isValid = false;
      errorElement.textContent = 'This field is required';
    } else if (input.type === 'email' && !validateEmail(value)) {
      isValid = false;
      errorElement.textContent = 'Please enter a valid email';
    } else if (input.id === 'phone' && !validatePhone(value)) {
      isValid = false;
      errorElement.textContent = 'Please enter a valid phone number';
    } else if (input.id === 'fullName' && !validateName(value)) {
      isValid = false;
      errorElement.textContent = 'Name must be at least 3 characters';
    } else {
      errorElement.textContent = '';
    }

    if (isValid) {
      input.classList.remove('error');
    } else {
      input.classList.add('error');
    }

    return isValid;
  }

  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let formIsValid = true;

    // Validate all required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      if (!validateField(field)) {
        formIsValid = false;
      }
    });

    // Validate date range
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    if (!validateDates(checkIn, checkOut)) {
      document.getElementById('checkOut').nextElementSibling.textContent = 'Check-out must be after check-in';
      document.getElementById('checkOut').classList.add('error');
      formIsValid = false;
    }

    if (formIsValid) {
      // Here you would normally send data to server
      // For demo, we'll just show success message
      form.style.display = 'none';
      document.querySelector('.form-success').style.display = 'flex';
      
      // Reset form after 5 seconds
      setTimeout(() => {
        form.reset();
        form.style.display = 'block';
        document.querySelector('.form-success').style.display = 'none';
      }, 5000);
    }
  });
}

// Add to your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
  initBookingForm();
  // Your other init functions...
});