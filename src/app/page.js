"use client";

import { useState, useEffect, useRef } from "react";

// ==========================================
// PORTFOLIO DATABASE
// ==========================================
const PROJECTS_DB = {
  "aurelia-penthouse": {
    title: "The Aurelia Penthouse",
    desc: "A premium 3,200 sq. ft. penthouse situated high above the Manhattan skyline. The design utilizes a strict minimalist grid, showcasing raw off-white Italian Calacatta marble walls and customized cabinetry finished in dark charcoal oak. Every furniture piece was hand-crafted to align with the structural columns and windows to maintain sightline purity.",
    materials: "Raw Calacatta Marble slabs, Brushed Gold brass trim profiles, Dark Charcoal stained oak wood veneer, Off-White luxury velvet upholstery, Integrated smart LED profile light fixtures.",
    heroImg: "/images/portfolio_res_1.png",
    gallery: ["/images/portfolio_res_1.png", "/images/portfolio_res_2.png"],
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
    heroImg: "/images/after_kitchen.png",
    gallery: ["/images/after_kitchen.png", "/images/before_kitchen.png"],
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
    heroImg: "/images/portfolio_com_1.png",
    gallery: ["/images/portfolio_com_1.png", "/images/portfolio_res_2.png"],
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
    heroImg: "/images/portfolio_fur_1.png",
    gallery: ["/images/portfolio_fur_1.png", "/images/portfolio_res_1.png"],
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
    heroImg: "/images/portfolio_res_2.png",
    gallery: ["/images/portfolio_res_2.png", "/images/portfolio_res_1.png"],
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
// TESTIMONIALS SLIDES
// ==========================================
const TESTIMONIALS = [
  {
    text: "Design X completely transformed our penthouse in the sky. The attention to detail on the custom gold brass trim in the living room and the off-white marble work was spectacular. Our home feels like a boutique luxury hotel.",
    name: "Elizabeth Vance",
    role: "Owner, Aurelia Penthouse"
  },
  {
    text: "Creating a corporate lobby that feels premium yet inviting was a big challenge. Design X nailed it with their custom slatted charcoal panels and gorgeous marble reception desk. Our clients are wowed the second they step in.",
    name: "Marcus Sterling",
    role: "Managing Director, Veritas Group"
  },
  {
    text: "The modular kitchen they designed for us is a work of art. The integrated smart drawer organizers, custom storage spaces, and premium hardware operate beautifully. Clean lines, clutter-free, and incredibly robust.",
    name: "Dr. Rohit Mehta",
    role: "Client, Nero Kitchen Suite"
  }
];

export default function Home() {
  // Navigation & Scroll states
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Portfolio states
  const [portfolioFilter, setPortfolioFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  // Before & After slider states
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef(null);
  const isDragging = useRef(false);

  // Testimonials state
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Booking Form states
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: ""
  });
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Newsletter Form states
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState("");

  // Timeline Scroll states
  const timelineSectionRef = useRef(null);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [activeSteps, setActiveSteps] = useState({});

  // ==========================================
  // LIFECYCLE EFFECTS
  // ==========================================
  
  // 1. Scroll listeners (Navbar style & active highlight)
  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 50);

      const sections = ["hero", "about", "services", "portfolio", "process", "before-after", "booking", "contact"];
      let current = "hero";
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (window.scrollY >= (top - 200)) {
            current = sectionId;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Intersection Observer (Scroll Reveal)
  useEffect(() => {
    const revealItems = document.querySelectorAll(".reveal-item");
    const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    revealItems.forEach(item => revealObserver.observe(item));
    return () => revealObserver.disconnect();
  }, []);

  // 3. Testimonials Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // 4. Design Process Timeline scroll tracker
  useEffect(() => {
    const handleTimelineScroll = () => {
      if (!timelineSectionRef.current) return;
      const rect = timelineSectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.top < viewportHeight && rect.bottom > 0) {
        const scrolled = viewportHeight - rect.top;
        const totalHeight = rect.height + viewportHeight;
        let percent = (scrolled / totalHeight) * 100;
        if (percent < 0) percent = 0;
        if (percent > 100) percent = 100;
        setTimelineProgress(percent);

        const items = timelineSectionRef.current.querySelectorAll(".timeline-item");
        const newActive = {};
        items.forEach((item, idx) => {
          const itemRect = item.getBoundingClientRect();
          if (itemRect.top < (viewportHeight / 2)) {
            newActive[idx] = true;
          }
        });
        setActiveSteps(newActive);
      }
    };

    window.addEventListener("scroll", handleTimelineScroll);
    return () => window.removeEventListener("scroll", handleTimelineScroll);
  }, []);

  // ==========================================
  // EVENT HANDLERS
  // ==========================================

  // 1. Before & After comparison slider drag logic
  const handleSliderMove = (clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let position = ((clientX - rect.left) / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    isDragging.current = true;
  };

  const handleTouchStart = () => {
    isDragging.current = true;
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      handleSliderMove(e.clientX);
    };

    const handleTouchMove = (e) => {
      if (!isDragging.current) return;
      if (e.touches && e.touches[0]) {
        handleSliderMove(e.touches[0].clientX);
      }
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const handleSliderClick = (e) => {
    if (isDragging.current) return;
    handleSliderMove(e.clientX);
  };

  // 2. Consultation form submission
  const handleSubmitBooking = (e) => {
    e.preventDefault();
    setFormIsLoading(true);

    setTimeout(() => {
      setFormIsLoading(false);
      setFormSubmitted(true);
    }, 1200);
  };

  const resetBookingForm = () => {
    setBookingForm({
      name: "",
      email: "",
      phone: "",
      projectType: "",
      budget: "",
      timeline: "",
      message: ""
    });
    setFormSubmitted(false);
  };

  // 3. Newsletter form submission
  const handleSubmitNewsletter = (e) => {
    e.preventDefault();
    setNewsletterSuccess(`Thank you! ${newsletterEmail} has been added to our catalog list.`);
    setNewsletterEmail("");

    setTimeout(() => {
      setNewsletterSuccess("");
    }, 5000);
  };

  return (
    <>
      {/* ==========================================
           HEADER / NAVIGATION
           ========================================== */}
      <header id="main-header" className={headerScrolled ? "scrolled" : ""}>
        <div className="container">
          <a href="#hero" className="logo" id="logo-link">
            DESIGN<span>X</span>
          </a>
          
          <nav id="navbar">
            <ul className={`nav-menu ${mobileMenuOpen ? "active" : ""}`} id="nav-menu">
              <li>
                <a 
                  href="#hero" 
                  className={`nav-link ${activeSection === "hero" ? "active" : ""}`} 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className={`nav-link ${activeSection === "about" ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  className={`nav-link ${activeSection === "services" ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="#portfolio" 
                  className={`nav-link ${activeSection === "portfolio" ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a 
                  href="#process" 
                  className={`nav-link ${activeSection === "process" ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Process
                </a>
              </li>
              <li>
                <a 
                  href="#before-after" 
                  className={`nav-link ${activeSection === "before-after" ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Transform
                </a>
              </li>
              <li>
                <a 
                  href="#booking" 
                  className={`nav-link ${activeSection === "booking" ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Consultation
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className={`nav-link ${activeSection === "contact" ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div className="nav-cta">
            <a href="#booking" className="btn btn-outline" style={{ padding: "10px 20px", fontSize: "0.75rem" }}>Book Consultation</a>
          </div>

          <button 
            className={`hamburger ${mobileMenuOpen ? "active" : ""}`} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* ==========================================
           1. HERO SECTION
           ========================================== */}
      <section id="hero" className="hero">
        <div className="hero-slider" id="hero-slider" style={{ background: "var(--bg-darker)" }}>
          <iframe 
            src="https://www.youtube.com/embed/MRy6owOO4fk?autoplay=1&mute=1&loop=1&playlist=MRy6owOO4fk&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&enablejsapi=1" 
            frameBorder="0" 
            allow="autoplay; encrypted-media" 
            allowFullScreen
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100vw",
              height: "177.77vw",
              minHeight: "100vh",
              minWidth: "56.25vh",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              border: "none"
            }}
            title="Design X Luxury Interior Hero Video"
          />
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title" id="hero-main-title">Crafting Timeless <span className="highlight-gold">Luxury</span> Interiors</h1>
          <div className="hero-btns">
            <a href="#portfolio" className="btn btn-primary">Explore Portfolio</a>
            <a href="#booking" className="btn btn-outline">Book Consultation</a>
          </div>
        </div>

        <div className="scroll-indicator" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
          <span>Scroll Down</span>
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </div>
      </section>

      {/* ==========================================
           2. ABOUT STUDIO
           ========================================== */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-grid">
            
            <div className="about-left reveal-item" id="about-reveal-left">
              <div className="about-image-wrapper">
                <img src="/images/about_studio.png" alt="Design X Interior Studio Office" className="about-img" loading="lazy" />
                <div className="about-badge">
                  <span className="number">12+</span>
                  <span className="text">Years Of Excellence</span>
                </div>
              </div>
            </div>

            <div className="about-right reveal-item" id="about-reveal-right">
              <span className="section-subtitle" style={{ textAlign: "left" }}>The Studio</span>
              <h2 className="about-title">Where Elegant Luxury Meets Functional Minimalism</h2>
              <p className="about-desc">At Design X Interior, we believe that luxury is not about excess, but rather the perfect balance of custom artistry, raw premium materials, and meticulous design details. For over a decade, we have transformed homes, executive offices, and commercial spaces into bespoke architectural marvels.</p>
              <p className="about-desc">Our design philosophy is anchored in minimalism: clean grids, warm hidden illumination, bespoke carpentry, and neutral luxurious palettes offset by subtle brass and gold details. From concept sketches to full turnkey handover, we curate every detail.</p>
              
              <div className="about-stats">
                <div className="stat-item">
                  <div className="stat-num">150+</div>
                  <div className="stat-label">Projects Completed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">15+</div>
                  <div className="stat-label">National Design Awards</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">98%</div>
                  <div className="stat-label">Client Satisfaction</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">100%</div>
                  <div className="stat-label">Bespoke Customization</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
           3. SERVICES GRID
           ========================================== */}
      <section id="services" className="services" style={{ backgroundColor: "var(--bg-darker)" }}>
        <div className="container">
          <span className="section-subtitle">Our Expertise</span>
          <h2 className="section-title">Bespoke Design Services</h2>
          
          <div className="services-grid">
            
            <div className="service-card glass-panel reveal-item" id="service-residential">
              <div className="service-icon"><i className="fa-solid fa-house-chimney"></i></div>
              <h3>Residential Design</h3>
              <p>Luxurious villas, penthouses, and custom apartments crafted to reflect your unique personal style, prioritizing spatial flow and high-end materials.</p>
              <a href="#booking" className="service-link">Inquire <i className="fa-solid fa-arrow-right"></i></a>
            </div>

            <div className="service-card glass-panel reveal-item" style={{ transitionDelay: "0.1s" }} id="service-commercial">
              <div className="service-icon"><i className="fa-solid fa-briefcase"></i></div>
              <h3>Commercial Spaces</h3>
              <p>Prestigious offices, corporate boardrooms, luxury boutique showrooms, and hospitality designs that elevate brand prestige and optimize performance.</p>
              <a href="#booking" className="service-link">Inquire <i className="fa-solid fa-arrow-right"></i></a>
            </div>

            <div className="service-card glass-panel reveal-item" style={{ transitionDelay: "0.2s" }} id="service-kitchen">
              <div className="service-icon"><i className="fa-solid fa-kitchen-set"></i></div>
              <h3>Modular Kitchens</h3>
              <p>State-of-the-art kitchens featuring soft-close luxury hardware, custom built-in appliances, gorgeous quartz island counters, and high-gloss textures.</p>
              <a href="#booking" className="service-link">Inquire <i className="fa-solid fa-arrow-right"></i></a>
            </div>

            <div className="service-card glass-panel reveal-item" id="service-furniture">
              <div className="service-icon"><i className="fa-solid fa-couch"></i></div>
              <h3>Bespoke Furniture</h3>
              <p>Hand-crafted credenzas, custom sofas, dining tables, and accent lighting made to exact spatial dimensions with premium oak, velvet, and brushed brass details.</p>
              <a href="#booking" className="service-link">Inquire <i className="fa-solid fa-arrow-right"></i></a>
            </div>

            <div className="service-card glass-panel reveal-item" style={{ transitionDelay: "0.1s" }} id="service-renovation">
              <div className="service-icon"><i className="fa-solid fa-compass-drafting"></i></div>
              <h3>Luxury Renovation</h3>
              <p>Transforming worn-out spaces into clean, modern structural layouts. We handle floor leveling, wall re-alignments, electrical restructuring, and finishes.</p>
              <a href="#booking" className="service-link">Inquire <i className="fa-solid fa-arrow-right"></i></a>
            </div>

            <div className="service-card glass-panel reveal-item" style={{ transitionDelay: "0.2s" }} id="service-turnkey">
              <div className="service-icon"><i className="fa-solid fa-key"></i></div>
              <h3>Turnkey Solutions</h3>
              <p>Complete execution from initial concept approval to materials procurement, site supervision, installation, and visual styling. Just step in and live.</p>
              <a href="#booking" className="service-link">Inquire <i className="fa-solid fa-arrow-right"></i></a>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
           4. PORTFOLIO GALLERY
           ========================================== */}
      <section id="portfolio" className="portfolio">
        <div className="container">
          <span className="section-subtitle">Featured Work</span>
          <h2 className="section-title">Signature Design Portfolio</h2>

          <div className="portfolio-filters">
            {["all", "residential", "commercial", "kitchen", "furniture"].map((category) => (
              <button 
                key={category}
                className={`filter-btn ${portfolioFilter === category ? "active" : ""}`}
                onClick={() => setPortfolioFilter(category)}
              >
                {category === "all" ? "All Projects" : category === "kitchen" ? "Modular Kitchen" : category}
              </button>
            ))}
          </div>

          <div className="portfolio-grid">
            
            {/* Project 1 (Residential) */}
            <div 
              className={`portfolio-item col-3 reveal-item ${portfolioFilter !== "all" && portfolioFilter !== "residential" ? "hidden-item" : ""}`} 
              style={{ display: portfolioFilter === "all" || portfolioFilter === "residential" ? "block" : "none" }}
              onClick={() => setSelectedProject("aurelia-penthouse")}
            >
              <img src="/images/portfolio_res_1.png" alt="The Aurelia Penthouse Bedroom" className="portfolio-img" loading="lazy" />
              <div className="portfolio-overlay">
                <span className="portfolio-cat">Residential</span>
                <h3>The Aurelia Penthouse</h3>
                <span className="portfolio-view-btn">View Details <i className="fa-solid fa-chevron-right" style={{ fontSize: "0.65rem" }}></i></span>
              </div>
            </div>

            {/* Project 2 (Modular Kitchen) */}
            <div 
              className={`portfolio-item col-1 reveal-item ${portfolioFilter !== "all" && portfolioFilter !== "kitchen" ? "hidden-item" : ""}`}
              style={{ display: portfolioFilter === "all" || portfolioFilter === "kitchen" ? "block" : "none" }}
              onClick={() => setSelectedProject("nero-kitchen")}
            >
              <img src="/images/after_kitchen.png" alt="Nero Minimalist Modular Kitchen" className="portfolio-img" loading="lazy" />
              <div className="portfolio-overlay">
                <span className="portfolio-cat">Modular Kitchen</span>
                <h3>Nero Kitchen Suite</h3>
                <span className="portfolio-view-btn">View Details <i className="fa-solid fa-chevron-right" style={{ fontSize: "0.65rem" }}></i></span>
              </div>
            </div>

            {/* Project 3 (Commercial) */}
            <div 
              className={`portfolio-item col-1 reveal-item ${portfolioFilter !== "all" && portfolioFilter !== "commercial" ? "hidden-item" : ""}`}
              style={{ display: portfolioFilter === "all" || portfolioFilter === "commercial" ? "block" : "none" }}
              onClick={() => setSelectedProject("veritas-lobby")}
            >
              <img src="/images/portfolio_com_1.png" alt="Veritas Corporate Lobby" className="portfolio-img" loading="lazy" />
              <div className="portfolio-overlay">
                <span className="portfolio-cat">Commercial</span>
                <h3>Veritas Corporate Lobby</h3>
                <span className="portfolio-view-btn">View Details <i className="fa-solid fa-chevron-right" style={{ fontSize: "0.65rem" }}></i></span>
              </div>
            </div>

            {/* Project 4 (Furniture) */}
            <div 
              className={`portfolio-item col-1 reveal-item ${portfolioFilter !== "all" && portfolioFilter !== "furniture" ? "hidden-item" : ""}`}
              style={{ display: portfolioFilter === "all" || portfolioFilter === "furniture" ? "block" : "none" }}
              onClick={() => setSelectedProject("velour-armchair")}
            >
              <img src="/images/portfolio_fur_1.png" alt="Velour Armchair" className="portfolio-img" loading="lazy" />
              <div className="portfolio-overlay">
                <span className="portfolio-cat">Bespoke Furniture</span>
                <h3>Velour Armchair</h3>
                <span className="portfolio-view-btn">View Details <i className="fa-solid fa-chevron-right" style={{ fontSize: "0.65rem" }}></i></span>
              </div>
            </div>

            {/* Project 5 (Residential) */}
            <div 
              className={`portfolio-item col-3 reveal-item ${portfolioFilter !== "all" && portfolioFilter !== "residential" ? "hidden-item" : ""}`}
              style={{ display: portfolioFilter === "all" || portfolioFilter === "residential" ? "block" : "none" }}
              onClick={() => setSelectedProject("elysian-dining")}
            >
              <img src="/images/portfolio_res_2.png" alt="Elysian Villa Dining Suite" className="portfolio-img" loading="lazy" />
              <div className="portfolio-overlay">
                <span className="portfolio-cat">Residential</span>
                <h3>Elysian Dining Lounge</h3>
                <span className="portfolio-view-btn">View Details <i className="fa-solid fa-chevron-right" style={{ fontSize: "0.65rem" }}></i></span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
           5. DESIGN PROCESS TIMELINE
           ========================================== */}
      <section id="process" className="process" ref={timelineSectionRef} style={{ backgroundColor: "var(--bg-darker)" }}>
        <div className="container">
          <span className="section-subtitle">How We Work</span>
          <h2 className="section-title">Our Design Journey</h2>

          <div className="timeline-wrapper">
            <div className="timeline-line"></div>
            <div className="timeline-progress" style={{ height: `${timelineProgress}%` }}></div>

            <div className="timeline-items">
              
              {/* Step 1 */}
              <div className={`timeline-item reveal-item ${activeSteps[0] ? "active" : ""}`} id="step-consultation">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-step">01</span>
                  <h3 className="timeline-title">Initial Consultation</h3>
                  <p className="timeline-desc">We meet in person or virtually to analyze your layout, design preferences, storage requirements, custom furniture needs, budget and timelines.</p>
                </div>
                <div className="timeline-meta">
                  <span className="stat-label"><i className="fa-solid fa-comments" style={{ color: "var(--gold)", marginRight: "8px" }}></i> Session 1</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className={`timeline-item reveal-item ${activeSteps[1] ? "active" : ""}`} id="step-concept">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-step">02</span>
                  <h3 className="timeline-title">Concept & Moodboard</h3>
                  <p className="timeline-desc">Our design team curates a personalized moodboard consisting of color tones, material textures (marbles, woods, metals), and custom layout sketches.</p>
                </div>
                <div className="timeline-meta">
                  <span className="stat-label"><i className="fa-solid fa-palette" style={{ color: "var(--gold)", marginRight: "8px" }}></i> Week 1 - 2</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className={`timeline-item reveal-item ${activeSteps[2] ? "active" : ""}`} id="step-3d">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-step">03</span>
                  <h3 className="timeline-title">3D Visualization</h3>
                  <p className="timeline-desc">We generate hyper-realistic 3D rendering visuals of every room, allowing you to walk through the lighting, shadows, and spacing before build.</p>
                </div>
                <div className="timeline-meta">
                  <span className="stat-label"><i className="fa-solid fa-cube" style={{ color: "var(--gold)", marginRight: "8px" }}></i> Week 3 - 4</span>
                </div>
              </div>

              {/* Step 4 */}
              <div className={`timeline-item reveal-item ${activeSteps[3] ? "active" : ""}`} id="step-material">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-step">04</span>
                  <h3 className="timeline-title">Material Selection</h3>
                  <p className="timeline-desc">Together, we visit premium stone yards, textile showrooms, and veneer manufacturers to finalize the exact materials that will construct your space.</p>
                </div>
                <div className="timeline-meta">
                  <span className="stat-label"><i className="fa-solid fa-gem" style={{ color: "var(--gold)", marginRight: "8px" }}></i> Week 5</span>
                </div>
              </div>

              {/* Step 5 */}
              <div className={`timeline-item reveal-item ${activeSteps[4] ? "active" : ""}`} id="step-execution">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-step">05</span>
                  <h3 className="timeline-title">Precision Execution</h3>
                  <p className="timeline-desc">Our master carpenters, electricians, and civil engineers execute site works under daily supervision, adhering to design blueprints precisely.</p>
                </div>
                <div className="timeline-meta">
                  <span className="stat-label"><i className="fa-solid fa-screwdriver-wrench" style={{ color: "var(--gold)", marginRight: "8px" }}></i> Month 2 - 4</span>
                </div>
              </div>

              {/* Step 6 */}
              <div className={`timeline-item reveal-item ${activeSteps[5] ? "active" : ""}`} id="step-handover">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-step">06</span>
                  <h3 className="timeline-title">Luxury Handover</h3>
                  <p className="timeline-desc">Deep cleaning, visual styling, art positioning, and accessory setup are completed. We hand over the keys to your brand-new architectural sanctuary.</p>
                </div>
                <div className="timeline-meta">
                  <span className="stat-label"><i className="fa-solid fa-circle-check" style={{ color: "var(--gold)", marginRight: "8px" }}></i> Day of Delivery</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
           6. BEFORE & AFTER SHOWCASE
           ========================================== */}
      <section id="before-after" className="before-after">
        <div className="container">
          <span className="section-subtitle">The Transformation</span>
          <h2 className="section-title">Before & After Showcase</h2>

          <div className="before-after-container reveal-item">
            <div 
              className="comparison-slider" 
              ref={sliderRef}
              onClick={handleSliderClick}
              id="comparison-slider"
            >
              
              {/* Before Image (Base background) */}
              <img src="/images/before_kitchen.png" alt="Kitchen before renovation" className="comparison-image image-before" />
              <span className="slider-label label-before">Before Renovation</span>

              {/* After Image (Overlay with clip-path) */}
              <div 
                className="comparison-image image-after" 
                style={{
                  backgroundImage: "url('/images/after_kitchen.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
                }}
              />
              <span className="slider-label label-after">Luxury Handover</span>

              {/* Slider bar divider */}
              <div 
                className="slider-handle" 
                style={{ left: `${sliderPosition}%` }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
              >
                <div className="slider-button">
                  <i className="fa-solid fa-left-right"></i>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
           7. TESTIMONIALS CAROUSEL
           ========================================== */}
      <section id="testimonials" className="testimonials" style={{ backgroundColor: "var(--bg-darker)" }}>
        <div className="container">
          <span className="section-subtitle">Client Reviews</span>
          <h2 className="section-title">Words from Our Clients</h2>

          <div className="testimonials-wrapper reveal-item">
            <div className="testimonial-carousel" id="testimonial-carousel">
              
              {TESTIMONIALS.map((testimonial, idx) => (
                <div 
                  key={idx}
                  className={`testimonial-slide ${testimonialIndex === idx ? "active" : ""}`}
                >
                  <div className="quote-icon"><i className="fa-solid fa-quote-right"></i></div>
                  <p className="testimonial-text">&ldquo;{testimonial.text}&rdquo;</p>
                  <div className="testimonial-author">
                    <div className="author-rating">
                      <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                    </div>
                    <span className="author-name">{testimonial.name}</span>
                    <span className="author-role">{testimonial.role}</span>
                  </div>
                </div>
              ))}

            </div>

            <div className="carousel-dots">
              {TESTIMONIALS.map((_, idx) => (
                <span 
                  key={idx}
                  className={`dot ${testimonialIndex === idx ? "active" : ""}`}
                  onClick={() => setTestimonialIndex(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
           8. INSTAGRAM FEED INTEGRATION
           ========================================== */}
      <section id="instagram" className="instagram">
        <div className="container">
          <span className="section-subtitle">Visual Inspiration</span>
          <h2 className="section-title">Follow Us @DesignXInterior</h2>

          <div className="instagram-grid">
            
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="instagram-item reveal-item" id="insta-post-1">
              <img src="/images/hero_luxury_living.png" alt="Instagram luxury living room detail" className="instagram-img" loading="lazy" />
              <div className="instagram-overlay">
                <div className="instagram-icon"><i className="fa-brands fa-instagram"></i></div>
                <div className="instagram-stats">
                  <span><i className="fa-solid fa-heart"></i> 412</span>
                  <span><i className="fa-solid fa-comment"></i> 24</span>
                </div>
              </div>
            </a>

            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="instagram-item reveal-item" style={{ transitionDelay: "0.1s" }} id="insta-post-2">
              <img src="/images/after_kitchen.png" alt="Instagram sleek kitchen countertop detail" className="instagram-img" loading="lazy" />
              <div className="instagram-overlay">
                <div className="instagram-icon"><i className="fa-brands fa-instagram"></i></div>
                <div className="instagram-stats">
                  <span><i className="fa-solid fa-heart"></i> 328</span>
                  <span><i className="fa-solid fa-comment"></i> 18</span>
                </div>
              </div>
            </a>

            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="instagram-item reveal-item" style={{ transitionDelay: "0.2s" }} id="insta-post-3">
              <img src="/images/portfolio_res_2.png" alt="Instagram dining table details" className="instagram-img" loading="lazy" />
              <div className="instagram-overlay">
                <div className="instagram-icon"><i className="fa-brands fa-instagram"></i></div>
                <div className="instagram-stats">
                  <span><i className="fa-solid fa-heart"></i> 580</span>
                  <span><i className="fa-solid fa-comment"></i> 35</span>
                </div>
              </div>
            </a>

            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="instagram-item reveal-item" style={{ transitionDelay: "0.3s" }} id="insta-post-4">
              <img src="/images/portfolio_fur_1.png" alt="Instagram custom velour chair" className="instagram-img" loading="lazy" />
              <div className="instagram-overlay">
                <div className="instagram-icon"><i className="fa-brands fa-instagram"></i></div>
                <div className="instagram-stats">
                  <span><i className="fa-solid fa-heart"></i> 291</span>
                  <span><i className="fa-solid fa-comment"></i> 12</span>
                </div>
              </div>
            </a>

          </div>
        </div>
      </section>

      {/* ==========================================
           9. CONSULTATION BOOKING FORM
           ========================================== */}
      <section id="booking" className="booking" style={{ backgroundColor: "var(--bg-darker)" }}>
        <div className="container">
          <span className="section-subtitle">Start Your Project</span>
          <h2 className="section-title">Book a Private Consultation</h2>

          <div className="consultation-wrapper glass-panel reveal-item" id="consultation-form-panel">
            
            <form className="booking-form" onSubmit={handleSubmitBooking}>
              <div className="form-row">
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="form-name" 
                    placeholder=" " 
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    required 
                  />
                  <label htmlFor="form-name" className="form-label">Full Name *</label>
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    className="form-control" 
                    id="form-email" 
                    placeholder=" " 
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                    required 
                  />
                  <label htmlFor="form-email" className="form-label">Email Address *</label>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input 
                    type="tel" 
                    className="form-control" 
                    id="form-phone" 
                    placeholder=" " 
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    required 
                  />
                  <label htmlFor="form-phone" className="form-label">Phone Number *</label>
                </div>
                <div className="form-group select-wrapper">
                  <select 
                    className="form-control" 
                    id="form-project-type" 
                    value={bookingForm.projectType}
                    onChange={(e) => setBookingForm({ ...bookingForm, projectType: e.target.value })}
                    required
                  >
                    <option value="" disabled hidden></option>
                    <option value="Residential">Residential Villa/Apartment</option>
                    <option value="Commercial">Commercial/Office Lobby</option>
                    <option value="Modular Kitchen">Modular Kitchen</option>
                    <option value="Custom Furniture">Bespoke Custom Furniture</option>
                    <option value="Full Renovation">Renovation & Structural Restructuring</option>
                    <option value="Turnkey">End-to-End Turnkey Execution</option>
                  </select>
                  <label htmlFor="form-project-type" className="form-label">Project Type *</label>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group select-wrapper">
                  <select 
                    className="form-control" 
                    id="form-budget" 
                    value={bookingForm.budget}
                    onChange={(e) => setBookingForm({ ...bookingForm, budget: e.target.value })}
                    required
                  >
                    <option value="" disabled hidden></option>
                    <option value="Luxury Economy">Upto $25,000</option>
                    <option value="Premium Modern">$25,000 - $75,000</option>
                    <option value="Ultra Luxury">$75,000 - $150,000</option>
                    <option value="Elite High-End">$150,000+</option>
                  </select>
                  <label htmlFor="form-budget" className="form-label">Approximate Budget *</label>
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="form-timeline" 
                    placeholder=" " 
                    value={bookingForm.timeline}
                    onChange={(e) => setBookingForm({ ...bookingForm, timeline: e.target.value })}
                    required 
                  />
                  <label htmlFor="form-timeline" className="form-label">Expected Timeline (e.g., 3 months) *</label>
                </div>
              </div>

              <div className="form-group">
                <textarea 
                  className="form-control" 
                  id="form-message" 
                  placeholder=" " 
                  value={bookingForm.message}
                  onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                  required
                />
                <label htmlFor="form-message" className="form-label">Tell us about your design vision...</label>
              </div>

              <div className="form-btn-wrapper">
                <button type="submit" className="btn btn-primary" disabled={formIsLoading}>
                  {formIsLoading ? "Processing..." : "Send Inquiry"}
                </button>
              </div>
            </form>

            {/* Success Message Pane */}
            <div className={`form-success-message ${formSubmitted ? "show" : ""}`}>
              <div className="success-icon"><i className="fa-solid fa-circle-check"></i></div>
              <h3>Inquiry Received Successfully</h3>
              <p>Thank you for reaching out to Design X Interior. A luxury design consultant will review your spatial requirements and contact you within 24 business hours.</p>
              <button type="button" className="btn btn-outline" onClick={resetBookingForm}>Submit Another Inquiry</button>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
           10. CONTACT & MAP SECTION
           ========================================== */}
      <section id="contact" className="contact">
        <div className="container">
          <span className="section-subtitle">Reach Us</span>
          <h2 className="section-title">Contact & Studio Details</h2>

          <div className="contact-grid">
            
            <div className="contact-info reveal-item">
              <h3 className="contact-info-title">Let&apos;s Create Your <span className="highlight-gold">Dream Space</span></h3>
              <p style={{ color: "var(--text-secondary)", fontWeight: 300 }}>We welcome visitors to our architectural studio space. Schedule an appointment or walk in during business hours to view material samples and discuss layout schematics.</p>
              
              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="contact-detail-icon"><i className="fa-solid fa-location-dot"></i></div>
                  <div className="contact-detail-text">
                    <h4>Studio Address</h4>
                    <p>Suite 402, Luxury Design Avenue, Manhattan, NY 10013</p>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <div className="contact-detail-icon"><i className="fa-solid fa-phone"></i></div>
                  <div className="contact-detail-text">
                    <h4>Phone Number</h4>
                    <p>+1 (212) 555-8910</p>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <div className="contact-detail-icon"><i className="fa-solid fa-envelope"></i></div>
                  <div className="contact-detail-text">
                    <h4>Email Address</h4>
                    <p>inquire@designxinterior.com</p>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <div className="contact-detail-icon"><i className="fa-solid fa-clock"></i></div>
                  <div className="contact-detail-text">
                    <h4>Studio Hours</h4>
                    <p>Monday - Saturday: 10:00 AM - 7:00 PM (Sunday Closed)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-map reveal-item" style={{ transitionDelay: "0.15s" }}>
              <div className="map-container">
                <div className="map-placeholder" id="map-canvas">
                  <div className="map-pin"><i className="fa-solid fa-location-pin"></i></div>
                  <div className="map-label">Design X Studio</div>
                  <div style={{ position: "absolute", bottom: "15px", left: "15px", color: "var(--text-muted)", fontSize: "0.7rem" }}>Architectural Grid Map Active</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
           11. FOOTER SECTION
           ========================================== */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            
            <div className="footer-col">
              <div className="footer-logo">DESIGN<span>X</span></div>
              <p className="footer-desc">Crafting high-end, bespoke interior architectures. Specializing in luxury minimalist residences and commercial spaces that make a bold architectural statement.</p>
              <div className="footer-socials">
                <a href="https://instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram"><i className="fa-brands fa-instagram"></i></a>
                <a href="https://facebook.com" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="https://pinterest.com" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Pin our designs on Pinterest"><i className="fa-brands fa-pinterest-p"></i></a>
                <a href="https://linkedin.com" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
              </div>
            </div>

            <div className="footer-col">
              <h3>The Studio</h3>
              <ul className="footer-links">
                <li><a href="#about">About Our Philosophy</a></li>
                <li><a href="#services">Our Design Services</a></li>
                <li><a href="#portfolio">Project Portfolio</a></li>
                <li><a href="#process">Our Design Journey</a></li>
                <li><a href="#contact">Contact & Map Info</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Services</h3>
              <ul className="footer-links">
                <li><a href="#services">Residential Design</a></li>
                <li><a href="#services">Corporate Offices</a></li>
                <li><a href="#services">Modular Kitchens</a></li>
                <li><a href="#services">Bespoke Furniture</a></li>
                <li><a href="#services">Luxury Renovation</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Newsletter</h3>
              <p className="footer-newsletter-text">Subscribe to receive curated interior design inspiration, veneer & stone catalogs, and private project walk-throughs.</p>
              <form className="newsletter-form" onSubmit={handleSubmitNewsletter}>
                <input 
                  type="email" 
                  className="newsletter-input" 
                  placeholder="Your Email Address" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required 
                />
                <button type="submit" className="newsletter-btn" aria-label="Subscribe newsletter"><i className="fa-solid fa-paper-plane"></i></button>
              </form>
              {newsletterSuccess && (
                <div style={{ fontSize: "0.75rem", color: "var(--gold)", marginTop: "5px" }}>
                  {newsletterSuccess}
                </div>
              )}
            </div>

          </div>

          <div className="footer-bottom">
            <p className="copyright">&copy; 2026 Design X Interior Studio. All rights reserved.</p>
            <div className="footer-terms">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ==========================================
           WHATSAPP FLOATING BUTTON
           ========================================== */}
      <a 
        href="https://api.whatsapp.com/send?phone=12125558910&text=Hello%20Design%20X%20Interior%2C%20I%20would%20like%20to%20inquire%20about%20a%20private%20consultation." 
        className="whatsapp-float" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>

      {/* ==========================================
           PROJECT DETAIL OVERLAY (MODAL)
           ========================================== */}
      {selectedProject && (() => {
        const project = PROJECTS_DB[selectedProject];
        if (!project) return null;
        return (
          <div 
            className="modal-overlay show" 
            onClick={(e) => {
              if (e.target.classList.contains("modal-overlay")) {
                setSelectedProject(null);
              }
            }}
          >
            <div className="modal-container">
              
              <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>
                Close Project <i className="fa-solid fa-xmark"></i>
              </button>

              <img src={project.heroImg} alt={project.title} className="modal-hero-img" />

              <div className="modal-content">
                
                <div className="modal-left">
                  <h2>{project.title}</h2>
                  <div className="modal-desc">
                    {project.desc}
                  </div>
                  
                  <span className="modal-section-title">Design Highlights & Materials</span>
                  <div className="modal-desc">
                    {project.materials}
                  </div>

                  <span className="modal-section-title">Gallery View</span>
                  <div className="modal-gallery-grid">
                    {project.gallery.map((imgUrl, i) => (
                      <img key={i} src={imgUrl} alt={`${project.title} Gallery ${i + 1}`} className="modal-gallery-img" />
                    ))}
                  </div>
                </div>

                <div className="modal-right">
                  
                  <div className="modal-meta-box glass-panel">
                    <span className="modal-section-title" style={{ marginBottom: "25px" }}>Specifications</span>
                    <ul className="modal-meta-list">
                      <li className="modal-meta-item">
                        <h4>Client</h4>
                        <p>{project.client}</p>
                      </li>
                      <li className="modal-meta-item">
                        <h4>Location</h4>
                        <p>{project.location}</p>
                      </li>
                      <li className="modal-meta-item">
                        <h4>Area Covered</h4>
                        <p>{project.area}</p>
                      </li>
                      <li className="modal-meta-item">
                        <h4>Services Rendered</h4>
                        <p>{project.services}</p>
                      </li>
                      <li className="modal-meta-item">
                        <h4>Year completed</h4>
                        <p>{project.year}</p>
                      </li>
                    </ul>
                  </div>

                  {project.feedbackText && (
                    <div className="modal-feedback glass-panel">
                      <p>&ldquo;{project.feedbackText}&rdquo;</p>
                      <div className="modal-feedback-author">{project.feedbackAuthor}</div>
                    </div>
                  )}

                </div>

              </div>

            </div>
          </div>
        );
      })()}
    </>
  );
}
