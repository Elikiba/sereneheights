document.addEventListener('DOMContentLoaded', function() {
    initAllFunctions();
});

function initAllFunctions() {
    // Initialize all functions
    const functions = [
        initMobileMenu,
        initSmoothScrolling,
        initHeaderScroll,
        initScrollToTop,
        initPreloader,
        initMainSlideshow,
        initScrollAnimations,
        initNewsletterModal,
        initRoomsCarousel,
        initEnhancedExperienceCards,
        initParallaxSlideshows,
        initVirtualTours,
        initPromoBanner,
        initBookingForm,
        initSnapCarousel
    ];
    
    functions.forEach(fn => {
        try {
            fn();
        } catch (e) {
            console.error(`Error initializing ${fn.name}:`, e);
        }
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const nav = document.getElementById('nav');
    
    if (!mobileMenu || !nav) return;

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

    mobileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });
    
    document.querySelectorAll('#nav a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && 
            !e.target.closest('#nav') && 
            !e.target.closest('#mobile-menu')) {
            closeMenu();
        }
    });
}

// Smooth Scrolling
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

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.getElementById('header');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!header) return;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
            if (mobileMenu) mobileMenu.style.color = 'var(--dark)';
        } else {
            header.classList.remove('scrolled');
            if (mobileMenu) mobileMenu.style.color = 'var(--gold)';
        }
    });
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollToTopBtn = document.createElement('div');
    scrollToTopBtn.id = 'scroll-to-top';
    scrollToTopBtn.innerHTML = `
      <i class="fas fa-chevron-up"></i>
      <div class="progress-bar"></div>
    `;
    document.body.appendChild(scrollToTopBtn);
  
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollPosition = window.scrollY;
        const scrollPercentage = (scrollPosition / (scrollHeight - clientHeight)) * 100;
        
        const show = scrollPosition > 300;
        scrollToTopBtn.classList.toggle('show', show);
        
        const progressBar = scrollToTopBtn.querySelector('.progress-bar');
        progressBar.style.height = `${scrollPercentage}%`;
    });
}

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    
    document.body.style.overflow = 'hidden';
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            document.body.style.overflow = '';
            
            setTimeout(() => preloader.remove(), 1000);
        }, 500);
    });
    
    // Fallback
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        document.body.style.overflow = '';
        setTimeout(() => preloader.remove(), 1000);
    }, 4000);
}

// Main Slideshow
function initMainSlideshow() {
    const slideshowContainers = document.querySelectorAll('.slideshow-container');
    
    slideshowContainers.forEach(container => {
        const slides = container.querySelectorAll('.slide');
        if (slides.length === 0) return;
        
        let currentSlide = 0;
        slides[currentSlide].classList.add('active');
        
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        
        setTimeout(() => setInterval(nextSlide, 5000), 1000);
    });
}

// Scroll Animations
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

// Newsletter Modal
function initNewsletterModal() {
    const modal = document.getElementById('newsletterModal');
    const closeBtn = document.getElementById('closeModal');
    const form = document.getElementById('newsletterForm');
    
    if (!modal) return;
    
    setTimeout(() => modal.classList.add('show'), 30000);
    
    closeBtn.addEventListener('click', () => modal.classList.remove('show'));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with ${email}!`);
        form.reset();
        modal.classList.remove('show');
    });

    // In the initNewsletterModal function, modify the form submit handler:
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    
    // Add special animation on submit
    const emailIcon = modal.querySelector('.email-icon');
    emailIcon.style.animation = 'none';
    void emailIcon.offsetWidth; // Trigger reflow
    emailIcon.style.animation = 'flyAwayFast 1s forwards';
    
    setTimeout(() => {
        alert(`Thank you for subscribing with ${email}!`);
        form.reset();
        modal.classList.remove('show');
        emailIcon.style.animation = 'flyAway 3s ease-in-out infinite';
    }, 1000);
});
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('show');
    });
}

// Rooms Carousel
function initRoomsCarousel() {
    const carousel = document.querySelector('.rooms-carousel');
    const cards = document.querySelectorAll('.room-card');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (!carousel || cards.length === 0) return;
    
    let currentIndex = 0;
    const cardCount = cards.length;
    
    function updateCarousel() {
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % cardCount;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + cardCount) % cardCount;
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
    let interval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        interval = setInterval(nextSlide, 5000);
    });
}

// Experience Cards
function initEnhancedExperienceCards() {
    const experienceCards = document.querySelectorAll('.experience-card');
    
    experienceCards.forEach(card => {
        const images = card.querySelectorAll('.experience-images img');
        let currentImageIndex = 0;
        
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
        
        card.addEventListener('mouseenter', () => {
            card.querySelector('.experience-overlay').style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.experience-overlay').style.opacity = '0';
        });
        
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.experience-nav')) {
                currentImageIndex = 0;
                fullscreenImg.src = images[currentImageIndex].src;
                fullscreenViewer.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
        
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
        
        closeBtn.addEventListener('click', () => {
            fullscreenViewer.classList.remove('active');
            document.body.style.overflow = '';
        });
        
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

// Parallax Slideshows
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

// Virtual Tours
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
            
            updateTour();
            
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateTour();
            });
            
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % images.length;
                updateTour();
            });
            
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
            
            tourOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleKeyDown);
        });
    });
}

// Promo Banner
function initPromoBanner() {
    const promoBanner = document.querySelector('.promo-banner');
    const closeBtn = document.querySelector('.close-promo');
    const header = document.querySelector('header');
  
    if (!promoBanner || !closeBtn || !header) return;
  
    // Only show if not dismissed
    if (!localStorage.getItem('promoDismissed')) {
        promoBanner.style.display = 'flex';
        
        // Set header top position based on screen size
        const headerTop = window.innerWidth <= 768 ? '30px' : '40px';
        header.style.top = headerTop;
        document.documentElement.style.setProperty('--header-top', headerTop);
    }
  
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        promoBanner.style.display = 'none';
        header.style.top = '0';
        localStorage.setItem('promoDismissed', 'true');
    });
  
    // Handle resize
    window.addEventListener('resize', function() {
        if (!localStorage.getItem('promoDismissed') && promoBanner.style.display !== 'none') {
            const headerTop = window.innerWidth <= 768 ? '30px' : '40px';
            header.style.top = headerTop;
            document.documentElement.style.setProperty('--header-top', headerTop);
        }
    });
}

// Booking Form
function initBookingForm() {
    const form = document.getElementById('bookingForm');
    if (!form) return;

    document.getElementById('checkIn').min = new Date().toISOString().split('T')[0];
    document.getElementById('checkIn').addEventListener('change', function() {
        document.getElementById('checkOut').min = this.value;
    });

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

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let formIsValid = true;

        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!validateField(field)) formIsValid = false;
        });

        const checkIn = document.getElementById('checkIn').value;
        const checkOut = document.getElementById('checkOut').value;
        if (!validateDates(checkIn, checkOut)) {
            document.getElementById('checkOut').nextElementSibling.textContent = 'Check-out must be after check-in';
            document.getElementById('checkOut').classList.add('error');
            formIsValid = false;
        }

        if (formIsValid) {
            form.style.display = 'none';
            document.querySelector('.form-success').style.display = 'flex';
            
            setTimeout(() => {
                form.reset();
                form.style.display = 'block';
                document.querySelector('.form-success').style.display = 'none';
            }, 5000);
        }
    });
}

// Snap Carousel
function initSnapCarousel() {
    const carousel = document.querySelector('.snap-carousel');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    const cards = document.querySelectorAll('.room-card');
    
    if (!carousel || !cards.length) return;
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 30; // width + gap
    
    function scrollToCard(index) {
      currentIndex = Math.max(0, Math.min(index, cards.length - 1));
      carousel.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
      });
    }
    
    function handleScroll() {
      currentIndex = Math.round(carousel.scrollLeft / cardWidth);
    }
    
    prevBtn.addEventListener('click', () => scrollToCard(currentIndex - 1));
    nextBtn.addEventListener('click', () => scrollToCard(currentIndex + 1));
    carousel.addEventListener('scroll', handleScroll);
    
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        scrollToCard(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        scrollToCard(currentIndex + 1);
      }
    });
    
    // Initialize
    scrollToCard(0);
}

// Initialize Flatpickr with Serenity Heights theme
const checkInPicker = flatpickr("#checkIn", {
    minDate: "today",
    dateFormat: "Y-m-d",
    theme: "serenity", // Custom theme class
    onChange: function(selectedDates) {
      // Set check-out min date to next day
      const nextDay = new Date(selectedDates[0]);
      nextDay.setDate(nextDay.getDate() + 1);
      checkOutPicker.set("minDate", nextDay);
      
      // Reset check-out if invalid
      if (checkOutPicker.selectedDates[0] && checkOutPicker.selectedDates[0] < nextDay) {
        checkOutPicker.clear();
      }
    }
  });
  
  const checkOutPicker = flatpickr("#checkOut", {
    minDate: new Date().fp_incr(1), // Tomorrow
    dateFormat: "Y-m-d",
    theme: "serenity"
  });
  
  // Make icons clickable
  document.querySelectorAll('.flatpickr-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      const input = icon.previousElementSibling;
      input._flatpickr.open();
    });
  });

  const calendar = flatpickr("#checkIn", {
    onMonthChange: function(selectedDates, dateStr, instance) {
        // This fires every time month changes
        const currentMonth = instance.currentMonth;
        const currentYear = instance.currentYear;
        
        // Example: Change style for December
        if (currentMonth === 11) { // December is 11 (0-indexed)
            document.querySelector('.flatpickr-calendar').style.background = "linear-gradient(135deg, #020335 0%, #0a0a1a 100%)";
        }
    }
});

