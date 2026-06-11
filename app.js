// ==========================================
// 1. GLOBAL STATE & CONSTANTS
// ==========================================

// Portfolio Projects Database
const PROJECTS_DB = {
  "aurelia-penthouse": {
    title: "The Aurelia Penthouse",
    desc: "A premium 3,200 sq. ft. penthouse situated high above the Manhattan skyline. The design utilizes a strict minimalist grid, showcasing raw off-white Italian Calacatta marble walls and customized cabinetry finished in dark charcoal oak. Every furniture piece was hand-crafted to align with the structural columns and windows to maintain sightline purity.",
    materials: "Raw Calacatta Marble slabs, Brushed Gold brass trim profiles, Dark Charcoal stained oak wood veneer, Off-White luxury velvet upholstery, Integrated smart LED profile light fixtures.",
    heroImg: "images/portfolio_res_1.png",
    gallery: ["images/portfolio_res_1.png", "images/portfolio_res_2.png"],
    client: "Elizabeth Vance",
    location: "Manhattan, NY",
    area: "3,200 Sq. Ft.",
    services: "Concept, Custom Millwork, Furnishing & Turnkey Handover",
    year: "2026",
    feedbackText: "Design X completely transformed our penthouse in the sky. The attention to detail on the custom gold brass trim in the living room and the off-white marble work was spectacular. Our home feels like a boutique luxury hotel.",
    feedbackAuthor: "Elizabeth Vance"
  },
  "nero-kitchen": {
    title: "Nero Kitchen Suite",
    desc: "A masterclass in modern dark luxury kitchen architecture. The Nero Kitchen features textured charcoal cabinetry surfaces offset by warm, indirect amber gold under-cabinet illumination. An imposing off-white marble countertop wraps around a custom-built central island, which integrates silent motorized spice cabinets and drawers.",
    materials: "Charcoal textured matte panels, Brushed gold hardware handles, Off-white engineered quartz countertop, Blum soft-close luxury runners, Integrated ambient lighting.",
    heroImg: "images/after_kitchen.png",
    gallery: ["images/after_kitchen.png", "images/before_kitchen.png"],
    client: "Dr. Rohit Mehta",
    location: "Hamptons, NY",
    area: "650 Sq. Ft.",
    services: "Kitchen Spatial Planning, Custom Carpentry, Appliance Integration",
    year: "2025",
    feedbackText: "The modular kitchen they designed for us is a work of art. The integrated smart drawer organizers, custom storage spaces, and premium hardware operate beautifully. Clean lines, clutter-free, and incredibly robust.",
    feedbackAuthor: "Dr. Rohit Mehta"
  },
  "veritas-lobby": {
    title: "Veritas Corporate Lobby",
    desc: "Designed to project stability, confidence, and modern sophistication, the Veritas Corporate Lobby utilizes tall vertical wood slat structures in charcoal black to draw the eyes upwards. A massive marble reception counter featuring asymmetric gold channels sits on a matching stone floor. Indirect ceiling lights create a calm, professional gallery atmosphere.",
    materials: "Charcoal black stained oak slats, Off-white block marble, Brushed gold steel channels, Concealed ambient panel lighting, Sound-absorbing acoustic rear paneling.",
    heroImg: "images/portfolio_com_1.png",
    gallery: ["images/portfolio_com_1.png", "images/portfolio_res_2.png"],
    client: "Veritas Group LLC",
    location: "Financial District, NYC",
    area: "2,100 Sq. Ft.",
    services: "Commercial Spatial Design, Brand Identity Architecture",
    year: "2025",
    feedbackText: "Creating a corporate lobby that feels premium yet inviting was a big challenge. Design X nailed it with their custom slatted charcoal panels and gorgeous marble reception desk. Our clients are wowed the second they step in.",
    feedbackAuthor: "Marcus Sterling, MD"
  },
  "velour-armchair": {
    title: "Bespoke Velour Armchair",
    desc: "An editorial custom furniture piece designed for premium comfort. The armchair features an organic, curved structural frame wrapped in heavy-weave charcoal black fabric. Slim, tapered brushed-gold legs lift the seat, giving it a floating appearance in minimalist spaces.",
    materials: "Custom charcoal wool-velour blend fabric, Brushed gold steel support legs, High-density memory foam core, Curved beechwood structural backing.",
    heroImg: "images/portfolio_fur_1.png",
    gallery: ["images/portfolio_fur_1.png", "images/portfolio_res_1.png"],
    client: "Elite Bespoke Furniture Line",
    location: "Studio Collection",
    area: "Product Unit",
    services: "Custom Industrial Design, Prototyping, Carpentry & Fabric Upholstery",
    year: "2026",
    feedbackText: "This armchair is the highlight of our living room. It's incredibly comfortable and has that distinct, expensive architectural design feel.",
    feedbackAuthor: "The Studio Team"
  },
  "elysian-dining": {
    title: "Elysian Dining Lounge",
    desc: "Part of a luxury villa project, the Elysian Dining Lounge focuses on creating an intimate, high-end family space. A custom off-white marble table sits at the center, framed by comfortable custom-upholstered chairs. Above, a minimalist gold linear light bar hangs, casting a warm glow onto the textures.",
    materials: "Bianco Carrara dining tabletop, Polished brass light bar, Off-white linen dining chairs, Charcoal oak wall paneling, Indirect warm spot lighting.",
    heroImg: "images/portfolio_res_2.png",
    gallery: ["images/portfolio_res_2.png", "images/portfolio_res_1.png"],
    client: "The Sterling Family",
    location: "Greenwich, CT",
    area: "800 Sq. Ft.",
    services: "Dining Space Planning, Bespoke Dining Furniture, Art Selection",
    year: "2025",
    feedbackText: "Our dinner gatherings have been completely elevated. The design is clean and elegant, and the dining table is a gorgeous conversation starter.",
    feedbackAuthor: "Sarah Sterling"
  }
};

// ==========================================
// 2. DOCUMENT READY & INIT
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initNavbarScroll();
  initMobileMenu();
  initHeroSlider();
  initScrollReveal();
  initPortfolioFilters();
  initProjectModal();
  initBeforeAfterSlider();
  initTestimonialsCarousel();
  initBookingForm();
  initNewsletterForm();
  initTimelineScroll();
});

// ==========================================
// 3. HEADER & MOBILE NAVIGATION
// ==========================================
function initNavbarScroll() {
  const header = document.getElementById("main-header");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  // Add scroll class
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Active link highlight on scroll
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });
}

function initMobileMenu() {
  const hamburger = document.getElementById("mobile-menu-btn");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    
    // Toggle body scroll locking when mobile menu is open
    if (navMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  // Close menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
}

// ==========================================
// 4. HERO SECTION IMAGE ROTATION
// ==========================================
function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  let currentSlide = 0;
  const slideInterval = 5000; // 5 seconds per slide

  if (slides.length <= 1) return;

  setInterval(() => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }, slideInterval);
}

// ==========================================
// 5. SCROLL REVEAL ANIMATIONS (Intersection Observer)
// ==========================================
function initScrollReveal() {
  const revealItems = document.querySelectorAll(".reveal-item");

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null, // Viewport
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: "0px 0px -50px 0px" // Offset from bottom
  });

  revealItems.forEach(item => {
    revealObserver.observe(item);
  });
}

// ==========================================
// 6. PORTFOLIO FILTER & LAYOUT
// ==========================================
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Toggle button active state
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute("data-category");

        if (filterValue === "all" || itemCategory === filterValue) {
          item.style.display = "block";
          // Quick frame delay to trigger smooth fade-in transitions
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 50);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.95)";
          // Match the 400ms transition time before hiding element layout
          setTimeout(() => {
            item.style.display = "none";
          }, 350);
        }
      });
    });
  });
}

// ==========================================
// 7. PROJECT DETAILS MODAL
// ==========================================
function initProjectModal() {
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const modal = document.getElementById("project-detail-modal");
  const closeBtn = document.getElementById("modal-close-btn");

  // DOM fields to populate
  const modalHero = document.getElementById("modal-project-hero");
  const modalTitle = document.getElementById("modal-project-title");
  const modalDesc = document.getElementById("modal-project-desc");
  const modalMaterials = document.getElementById("modal-project-materials");
  const modalImg1 = document.getElementById("modal-gallery-img-1");
  const modalImg2 = document.getElementById("modal-gallery-img-2");
  
  const specClient = document.getElementById("modal-spec-client");
  const specLocation = document.getElementById("modal-spec-location");
  const specArea = document.getElementById("modal-spec-area");
  const specServices = document.getElementById("modal-spec-services");
  const specYear = document.getElementById("modal-spec-year");
  
  const clientQuoteBox = document.getElementById("modal-client-quote-box");
  const clientQuoteText = document.getElementById("modal-client-feedback-text");
  const clientQuoteAuthor = document.getElementById("modal-client-feedback-author");

  portfolioItems.forEach(item => {
    item.addEventListener("click", () => {
      const projectId = item.getAttribute("data-project-id");
      const projectData = PROJECTS_DB[projectId];

      if (!projectData) return;

      // Populate Modal Fields
      modalHero.src = projectData.heroImg;
      modalHero.alt = projectData.title;
      modalTitle.textContent = projectData.title;
      modalDesc.textContent = projectData.desc;
      modalMaterials.textContent = projectData.materials;

      // Setup images
      if (projectData.gallery && projectData.gallery[0]) {
        modalImg1.src = projectData.gallery[0];
        modalImg1.alt = `${projectData.title} View 1`;
        modalImg1.style.display = "block";
      } else {
        modalImg1.style.display = "none";
      }

      if (projectData.gallery && projectData.gallery[1]) {
        modalImg2.src = projectData.gallery[1];
        modalImg2.alt = `${projectData.title} View 2`;
        modalImg2.style.display = "block";
      } else {
        modalImg2.style.display = "none";
      }

      // Specs
      specClient.textContent = projectData.client || "Private Client";
      specLocation.textContent = projectData.location || "N/A";
      specArea.textContent = projectData.area || "N/A";
      specServices.textContent = projectData.services || "Interior Design";
      specYear.textContent = projectData.year || "2026";

      // Feedback
      if (projectData.feedbackText) {
        clientQuoteBox.style.display = "block";
        clientQuoteText.textContent = `"${projectData.feedbackText}"`;
        clientQuoteAuthor.textContent = projectData.feedbackAuthor || "";
      } else {
        clientQuoteBox.style.display = "none";
      }

      // Show Modal
      modal.classList.add("show");
      document.body.style.overflow = "hidden"; // Disable background scrolling
    });
  });

  // Close Modal handler
  const closeModal = () => {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  };

  closeBtn.addEventListener("click", closeModal);

  // Close on clicking overlay background
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });
}

// ==========================================
// 8. INTERACTIVE BEFORE & AFTER SLIDER
// ==========================================
function initBeforeAfterSlider() {
  const slider = document.getElementById("comparison-slider");
  const handle = document.getElementById("slider-handle");
  const afterOverlay = document.getElementById("image-after-overlay");

  if (!slider || !handle || !afterOverlay) return;

  let isDragging = false;

  const setSliderPosition = (xPos) => {
    const rect = slider.getBoundingClientRect();
    let position = ((xPos - rect.left) / rect.width) * 100;

    // Constrain position between 0% and 100%
    if (position < 0) position = 0;
    if (position > 100) position = 100;

    // Update clipping mask polygon
    afterOverlay.style.clipPath = `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`;
    // Update divider handle line position
    handle.style.left = `${position}%`;
  };

  // Event helper functions for handling desktop and touch
  const onDragStart = () => {
    isDragging = true;
  };

  const onDragEnd = () => {
    isDragging = false;
  };

  const onDragMove = (e) => {
    if (!isDragging) return;
    
    // Get horizontal position depending on mouse or touch
    const pageX = e.touches ? e.touches[0].pageX : e.pageX;
    setSliderPosition(pageX);
  };

  // Desktop Mouse Events
  handle.addEventListener("mousedown", onDragStart);
  window.addEventListener("mouseup", onDragEnd);
  window.addEventListener("mousemove", onDragMove);

  // Mobile Touch Events
  handle.addEventListener("touchstart", onDragStart);
  window.addEventListener("touchend", onDragEnd);
  window.addEventListener("touchmove", onDragMove, { passive: true });

  // Optional: Allow clicking anywhere on slider to reposition division
  slider.addEventListener("click", (e) => {
    if (e.target !== handle && !handle.contains(e.target)) {
      setSliderPosition(e.pageX);
    }
  });
}

// ==========================================
// 9. TESTIMONIALS CAROUSEL
// ==========================================
function initTestimonialsCarousel() {
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".dot");
  let activeIndex = 0;
  let autoplayTimer;

  if (slides.length === 0) return;

  const showSlide = (index) => {
    slides.forEach((slide, idx) => {
      slide.classList.remove("active");
      dots[idx].classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");
    activeIndex = index;
  };

  const nextSlide = () => {
    const nextIdx = (activeIndex + 1) % slides.length;
    showSlide(nextIdx);
  };

  const startAutoplay = () => {
    autoplayTimer = setInterval(nextSlide, 6000); // Transitions every 6s
  };

  const stopAutoplay = () => {
    clearInterval(autoplayTimer);
  };

  // Init autoplay
  startAutoplay();

  // Dots click control
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopAutoplay();
      showSlide(index);
      startAutoplay();
    });
  });

  // Pause on hover
  const carouselContainer = document.getElementById("testimonial-carousel");
  if (carouselContainer) {
    carouselContainer.addEventListener("mouseenter", stopAutoplay);
    carouselContainer.addEventListener("mouseleave", startAutoplay);
  }
}

// ==========================================
// 10. CONSULTATION BOOKING FORM SUBMISSION
// ==========================================
function initBookingForm() {
  const form = document.getElementById("consultation-booking-form");
  const successPanel = document.getElementById("form-success-panel");
  const submitBtn = document.getElementById("form-submit-btn");

  if (!form || !successPanel) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Visual button loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Processing...";

    // Simulate database write / network delays
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Inquiry";

      // Show success modal overlay
      successPanel.classList.add("show");
    }, 1200);
  });
}

// Globally accessible function for resetting success screen
window.resetBookingForm = function() {
  const form = document.getElementById("consultation-booking-form");
  const successPanel = document.getElementById("form-success-panel");

  if (form && successPanel) {
    form.reset();
    successPanel.classList.remove("show");
  }
};

// ==========================================
// 11. NEWSLETTER FORM
// ==========================================
function initNewsletterForm() {
  const form = document.getElementById("newsletter-subscription-form");
  const successNote = document.getElementById("newsletter-success-note");

  if (!form || !successNote) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("newsletter-email-input");
    
    // Quick fade feedback
    successNote.textContent = `Thank you! ${input.value} has been added to our catalog list.`;
    successNote.style.color = "var(--gold)";
    form.reset();

    setTimeout(() => {
      successNote.textContent = "";
    }, 5000);
  });
}

// ==========================================
// 12. DESIGN PROCESS TIMELINE PROGRESS BAR
// ==========================================
function initTimelineScroll() {
  const timeline = document.getElementById("process");
  const progressBar = document.getElementById("timeline-scroll-progress");
  const timelineItems = document.querySelectorAll(".timeline-item");

  if (!timeline || !progressBar || timelineItems.length === 0) return;

  // Track progress on page scroll
  window.addEventListener("scroll", () => {
    const rect = timeline.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Check if timeline is in view
    if (rect.top < viewportHeight && rect.bottom > 0) {
      // Calculate how far down the user has scrolled past the timeline section
      const scrolled = viewportHeight - rect.top;
      const totalHeight = rect.height + viewportHeight;
      let scrollPercent = (scrolled / totalHeight) * 100;

      // Clean padding boundaries
      if (scrollPercent < 0) scrollPercent = 0;
      if (scrollPercent > 100) scrollPercent = 100;

      progressBar.style.height = `${scrollPercent}%`;

      // Highlight nodes as they cross mid-viewport
      timelineItems.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        if (itemRect.top < (viewportHeight / 2)) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    }
  });
}
