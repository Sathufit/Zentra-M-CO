import React, { useState, useEffect } from 'react';
import { Mail, Phone, Hammer, Paintbrush, Leaf, LayoutGrid, Brush, Sparkles, ChevronDown, CheckCircle, Code, Briefcase, Award, Quote, CalendarDays, CheckCircle2, Home, Building, MessageSquare, Star, ArrowRight, Play, Shield, Clock, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    telephone: '',
    email: '',
    propertyType: '',
    propertyAddress: '',
    servicesRequired: [],
    message: '',
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const services = [
    'Premium Cleaning',
    'Pressure Washing',
    'Interior & Exterior Painting',
    'Comprehensive Maintenance',
    'Flooring and Decking',
    'Web Design & Digital Solutions',
  ];

  const serviceImages = {
    'Premium Cleaning': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952',
    'Pressure Washing': 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd',
    'Interior & Exterior Painting': 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f',
    'Comprehensive Maintenance': 'https://images.unsplash.com/photo-1581922819941-6ab31ab79afc',
    'Flooring and Decking': 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6',
    'Web Design & Digital Solutions': 'https://images.unsplash.com/photo-1547658719-da2b51169166'
  };

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Homeowner",
      text: "Absolutely transformative! They turned our dated home into a modern masterpiece. The attention to detail was incredible.",
      rating: 5
    },
    {
      name: "David Chen",
      role: "Business Owner",
      text: "Professional, reliable, and exceptional quality. Our office renovation exceeded all expectations and was completed on time.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Property Manager",
      text: "We've worked with many contractors, but none match their level of craftsmanship and customer service. Highly recommended!",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'What types of property maintenance services do you offer?',
      answer: 'We provide comprehensive property maintenance including premium painting, luxury flooring, landscape design, pressure washing, interior renovations, and complete property transformations for both residential and commercial spaces.',
    },
    {
      question: 'Do you offer services for both residential and commercial properties?',
      answer: 'Absolutely! We specialize in both residential homes and commercial properties, tailoring our premium services to meet the unique requirements of each project type.',
    },
    {
      question: 'How do I request a quote for my property?',
      answer: 'Simply fill out our contact form, call us directly, or use our live chat. We provide detailed quotes within 24 hours and offer free consultations for larger projects.',
    },
    {
      question: 'Are your services fully insured and guaranteed?',
      answer: 'Yes, we are fully licensed and insured with comprehensive coverage. All our work comes with quality guarantees and warranty protection for your peace of mind.',
    },
    {
      question: 'How long will my property project take to complete?',
      answer: 'Project timelines vary based on scope and complexity. After our consultation, we provide detailed schedules with milestones and keep you updated throughout the entire process.',
    },
    {
      question: 'Do you use eco-friendly and sustainable materials?',
      answer: 'We prioritize environmental responsibility by using eco-friendly, sustainable materials and practices whenever possible, ensuring beautiful results with minimal environmental impact.',
    },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        servicesRequired: checked
          ? [...prevData.servicesRequired, value]
          : prevData.servicesRequired.filter((service) => service !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqaqvwev";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setShowSuccessMessage(true);
        setFormData({
          name: '',
          telephone: '',
          email: '',
          propertyType: '',
          propertyAddress: '',
          servicesRequired: [],
          message: '',
        });
        setTimeout(() => setShowSuccessMessage(false), 5000);
      } else {
        alert("There was an error submitting the form.");
      }
    } catch (error) {
      alert("There was an error submitting the form.");
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      // Smooth scroll with custom duration and easing
      const start = window.pageYOffset;
      const distance = offsetPosition - start;
      const duration = 2000; // Increased duration to 2 seconds
      let startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function for smoother animation
        const ease = t => t < 0.5 
          ? 4 * t * t * t 
          : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

        window.scrollTo(0, start + (distance * ease(progress)));

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }

      requestAnimationFrame(animation);
      setIsMobileMenuOpen(false);
    } else {
      console.warn(`Section with id "${id}" not found`);
    }
  };

  const images = [
    {
      url: "/images/1.jpeg", // Update path to match your public folder structure
      alt: "Premium Property Service",
      title: "Premium Cleaning Solutions",
      description: "Professional cleaning services for residential and commercial spaces"
    },
    {
      url: "/images/2.jpeg", 
      alt: "Property Maintenance",
      title: "Property Maintenance",
      description: "Comprehensive maintenance services to keep your property in perfect condition"
    },
    {
      url: "/images/3.1.jpeg",
      alt: "Renovation Project",
      title: "Expert Renovations",
      description: "Complete property renovations and transformations"
    },
    {
      url: "/images/4.jpeg",
      alt: "Exterior & Interior Cleaning",
      title: "Exterior & Int Cleaning",
      description: "Beautiful solutions for modern living"
    },
    {
      url: "/images/5.jpeg",
      alt: "Outdoor Maintenance",
      title: "Outdoor Services",
      description: "Professional outdoor cleaning and maintenance"
    },
    {
      url: "/images/6.jpeg",
      alt: "Premium Service",
      title: "Quality Service",
      description: "Premium property services with attention to detail"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Add these animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const slideIn = {
    initial: { x: -60, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-white font-sans overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-navy-900/95 backdrop-blur-lg shadow-2xl border-b border-orange-400/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">              <div className="flex-shrink-0">
                <div className="flex items-center gap-2 bg-navy-900/80 border border-orange-400/20 rounded-xl px-3 py-2">
                  <img
                    src="/images/logonew.jpeg"
                    alt="Zentra M & CO Logo"
                    className="h-9 w-auto object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-8">
              {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase() === 'home' ? 'hero' : 
                                               item.toLowerCase() === 'projects' ? 'gallery' : 
                                               item.toLowerCase())}
                  className="relative text-gray-300 hover:text-orange-400 px-3 py-2 text-sm font-semibold transition-all duration-300 group"
                >
                  {item}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')} // Changed from 'inquiry'
                className="bg-gradient-to-r from-orange-400 to-orange-500 text-black px-6 py-3 rounded-full text-sm font-bold hover:shadow-2xl hover:shadow-orange-400/25 hover:scale-105 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Get Quote</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-orange-400 focus:outline-none"
                aria-expanded="false"
              >
                <div className="w-6 h-6 relative">
                  <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''
      }`} />
      <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'opacity-0' : 'translate-y-2'
      }`} />
      <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-4'
      }`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-black/95 backdrop-blur-lg border-t border-orange-400/20`}>
          <div className="px-4 pt-2 pb-4 space-y-2">
            {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase())}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-orange-400 transition-colors duration-300"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')} // Changed from 'inquiry'
              className="block w-full text-left bg-gradient-to-r from-orange-400 to-orange-500 text-black px-3 py-2 rounded-lg text-base font-bold mt-4"
            >
              Get Quote
            </button>
          </div>
        </div>

      <main className="pt-20">
        {/* Hero Section */}
        <section id="hero" className="relative overflow-hidden min-h-[100svh] flex flex-col justify-center">
          {/* === FULL-BLEED BACKGROUND PHOTO === */}
          <div className="absolute inset-0">
            <img
              src="/images/3.1.jpeg"
              alt="Zentra M & CO - Property Renovation"
              className="w-full h-full object-cover object-center"
            />
            {/* Mobile: slightly transparent dark overlay */}
            <div className="absolute inset-0 lg:hidden" style={{ background: 'rgba(2,11,24,0.85)' }} />
            {/* Desktop: side fade so right side reveals photo */}
            <div className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(to right, rgba(2,11,24,0.97) 0%, rgba(6,15,30,0.88) 45%, rgba(13,31,60,0.30) 100%)' }} />
            <div className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(to top, rgba(2,11,24,1) 0%, transparent 30%)' }} />
          </div>

          {/* Orange left-edge accent line */}
          <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-gradient-to-b from-transparent via-orange-400 to-transparent opacity-70" />

          {/* === MAIN CONTENT === */}
          {/* Added pb-32 on mobile to prevent overlapping with the absolute bottom service bar */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-20 -mt-10 lg:-mt-0 pb-32 sm:pb-36 lg:pb-0">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6 lg:mb-8">
              <div className="h-px w-8 sm:w-12 bg-orange-400" />
              <span className="text-orange-400 text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase">Sale, Victoria — Est. 2019</span>
            </div>

            {/* HEADLINE */}
            <h1 className="font-black tracking-tight leading-none mb-4 sm:mb-6 lg:mb-8 max-w-4xl">
              <span className="block text-white" style={{ fontSize: 'clamp(2.4rem, 10vw, 6.5rem)', lineHeight: 1.05 }}>
                Transform Your
              </span>
              <span className="block text-orange-400" style={{ fontSize: 'clamp(2.4rem, 10vw, 6.5rem)', lineHeight: 1.05 }}>
                Property.
              </span>
              <span className="block text-gray-300 mt-3 sm:mt-4" style={{ fontSize: 'clamp(0.95rem, 3.8vw, 1.8rem)', fontWeight: 500, letterSpacing: '0.01em', lineHeight: 1.4 }}>
                Renovation &amp; Maintenance Specialists across Sale &amp; Regional&nbsp;Victoria.
              </span>
            </h1>

            <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-xl">
              From deep cleaning and pressure washing to full-scale renovations — residential, commercial and industrial — we get it done right, on time, every time.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 items-center mb-8">
              <button
                onClick={() => scrollToSection('contact')}
                className="group relative overflow-hidden bg-orange-400 text-black px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold shadow-xl shadow-orange-400/20 hover:shadow-orange-400/40 hover:scale-[1.02] transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get a Free Quote
                  <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={16} />
                </span>
                <div className="absolute inset-0 bg-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-2 border border-white/20 hover:border-orange-400/60 text-white px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-semibold hover:bg-white/5 transition-all duration-300"
              >
                <Play size={15} className="text-orange-400" />
                View Our Work
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2.5">
              {[
                { icon: Shield, label: 'Fully Insured' },
                { icon: Star, label: '5-Star Rated' },
                { icon: Award, label: 'Licensed & Certified' },
                { icon: Phone, label: '24/7 Support' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 text-xs sm:text-sm text-gray-300">
                  <Icon size={12} className="text-orange-400 shrink-0" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* === SERVICE BAR === pinned absolutely to the bottom on all screen sizes */}
          <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 pb-4 sm:pb-0"
            style={{ background: 'rgba(4,12,26,0.85)', backdropFilter: 'blur(12px)' }}>
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-3 md:grid-cols-6 divide-x divide-white/10 divide-y md:divide-y-0 divide-white/10">
                {[
                  { icon: Sparkles, label: 'Premium Cleaning' },
                  { icon: Brush, label: 'Pressure Washing' },
                  { icon: Paintbrush, label: 'Painting' },
                  { icon: Hammer, label: 'Maintenance' },
                  { icon: Leaf, label: 'Flooring & Decking' },
                  { icon: Code, label: 'Web Design' },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    onClick={() => scrollToSection('services')}
                    className="group flex flex-col items-center justify-center gap-1.5 py-3 sm:py-4 hover:bg-orange-400/10 transition-colors duration-300"
                  >
                    <Icon size={16} className="text-orange-400 group-hover:scale-110 transition-transform duration-300 shrink-0" />
                    <span className="text-gray-300 group-hover:text-white text-[10px] sm:text-xs font-medium text-center transition-colors duration-300">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll indicator — desktop only */}
          <div className="absolute bottom-24 right-8 hidden lg:flex flex-col items-center gap-1 z-20">
            <span className="text-gray-500 text-xs tracking-widest uppercase" style={{writingMode:'vertical-rl'}}>Scroll</span>
            <ChevronDown className="text-orange-400/50 animate-bounce" size={18} />
          </div>
        </section>
        {/* Services Section */}
        <section id="services" className="py-20 bg-navy-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 bg-orange-400/10 border border-orange-400/25 rounded-full px-5 py-2 mb-5">
                <span className="text-orange-400 text-xs font-bold tracking-[0.18em] uppercase">What We Do</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6">
                <span className="text-white">Our </span>
                <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">Services</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive property solutions delivered with exceptional craftsmanship and attention to detail.
              </p>
            </div>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8"
            >
              {services.map((service, index) => {
                const icons = [Brush, Sparkles, Paintbrush, Hammer, Leaf, LayoutGrid, Code];
                const Icon = icons[index] || Briefcase;
                
                return (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="group relative"
                  >
                    <div className="relative bg-navy-900 p-5 sm:p-8 rounded-3xl shadow-2xl border border-orange-400/20 hover:border-orange-400/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-orange-400/10 overflow-hidden h-full">
                      {/* Background Image Layer - Increased opacity */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity duration-300"
                        style={{
                          backgroundImage: `url('${serviceImages[service]}')`,
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                        }}
                      />
                      
                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/30 to-navy-900/70" />
                      
                      {/* Content */}
                      <div className="relative z-20">
                        <div className="bg-gradient-to-br from-orange-400 to-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-orange-400/25">
                          <Icon className="text-black" size={24} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-orange-400 transition-colors duration-300">
                          {service}
                        </h3>
                        <p className="text-gray-100 leading-relaxed mb-6 text-shadow">
                          {service.includes('Cleaning') && 'Comprehensive cleaning solutions that leave your space spotless and refreshed with eco-friendly products.'}
                          {service.includes('Pressure') && 'Professional pressure washing to restore surfaces and remove years of built-up grime and stains.'}
                          {service.includes('Painting') && 'Expert painting services using premium materials for stunning, long-lasting interior and exterior finishes.'}
                          {service.includes('Maintenance') && 'Complete property maintenance solutions to keep your investment in perfect condition year-round.'}
                          {service.includes('Flooring') && 'Premium flooring installation and restoration using the finest materials and expert craftsmanship.'}
                          {service.includes('Web') && 'Professional web design and digital solutions to establish your strong online presence and grow your business.'}
                        </p>
                      </div>

                      {/* Top Border Gradient */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-orange-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-20" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Our Gallery Section */}
        <section id="gallery" className="py-20 bg-navy-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900/50 to-navy-950"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                  Our Gallery
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Explore our portfolio of stunning transformations and premium projects.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border border-orange-400/20"
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    currentSlide === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error(`Failed to load image: ${image.url}`);
                      e.target.src = '/fallback-image.jpg'; // Add a fallback image
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-2xl font-bold text-white mb-2">{image.title}</h3>
                    <p className="text-gray-300">{image.description}</p>
                  </div>
                </div>
              ))}
              
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-orange-500 text-white hover:text-black p-3 rounded-full transition-all duration-300"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-orange-500 text-white hover:text-black p-3 rounded-full transition-all duration-300"
              >
                <ChevronRight size={24} />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? 'bg-orange-500 w-8'
                        : 'bg-white/50 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-navy-950 text-white relative overflow-hidden border-t border-orange-400/20">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900/50 to-navy-950"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                  Our Process
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A seamless journey from consultation to completion, designed around your vision and timeline.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
              {[
                { icon: CalendarDays, title: 'Consultation', desc: 'Free consultation to understand your vision and requirements' },
                { icon: CheckCircle2, title: 'Planning', desc: 'Detailed project planning with timeline and transparent pricing' },
                { icon: Hammer, title: 'Execution', desc: 'Expert craftsmen deliver premium results with regular updates' },
                { icon: Sparkles, title: 'Completion', desc: 'Final walkthrough and handover of your transformed space' }
              ].map((step, index) => (
                <div key={index} className="relative group">
                  <div className="bg-gradient-to-br from-navy-900 to-navy-950 p-5 sm:p-8 rounded-3xl border border-orange-400/20 hover:border-orange-400/40 transition-all duration-300 group-hover:scale-105 shadow-xl">
                    <div className="bg-gradient-to-br from-orange-400 to-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-orange-400/25">
                      <step.icon className="text-black" size={24} />
                    </div>
                    <div className="absolute top-4 right-4 text-6xl font-black text-gray-800 group-hover:text-orange-400/30 transition-colors duration-300">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                    <p className="text-gray-300">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 relative overflow-hidden border-t border-orange-400/20" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1B2A6B 50%, #0a1628 100%)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(245,166,35,0.08) 0%, transparent 60%)' }}></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 text-white">
                Client Stories
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Don't just take our word for it — hear from clients who've experienced our service first-hand.
              </p>
            </div>
            
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-navy-900/80 backdrop-blur-lg rounded-3xl p-6 sm:p-8 md:p-12 border border-orange-400/30 shadow-2xl">
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-orange-400 fill-current" size={24} />
                    ))}
                  </div>
                  <Quote className="text-orange-400/50 mx-auto mb-6" size={48} />
                  <p className="text-base sm:text-xl md:text-2xl font-light mb-8 leading-relaxed text-gray-100">
                    "{testimonials[activeTestimonial].text}"
                  </p>
                  <div className="flex items-center justify-center">
                    <div>
                      <h4 className="text-xl font-bold text-orange-400">{testimonials[activeTestimonial].name}</h4>
                      <p className="text-gray-400">{testimonials[activeTestimonial].role}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Testimonial Indicators */}
              <div className="flex justify-center mt-8 space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeTestimonial ? 'bg-orange-400 w-8' : 'bg-white/30 w-2 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-navy-950 text-white relative overflow-hidden border-t border-orange-400/20">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900/30 to-navy-950"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-black mb-8">
                  <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                    About Zentra M & CO
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  We're not just contractors - we're space transformation specialists. With over 5 years of experience, 
                  we've mastered the art of turning ordinary properties into extraordinary spaces that reflect your vision and exceed your expectations.
                </p>
                <div className="space-y-6">
                  {[
                    { label: 'Expertise & Craftsmanship', value: '100%' },
                    { label: 'Client Satisfaction', value: '98%' },
                    { label: 'On-Time Delivery', value: '95%' }
                  ].map((stat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-white">{stat.label}</span>
                        <span className="text-orange-400 font-bold">{stat.value}</span>
                      </div>
                      <div className="w-full bg-navy-800 rounded-full h-3 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-orange-400/25"
                          style={{ width: stat.value }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {[
                  { icon: Shield, title: 'Fully Insured', desc: 'Complete protection for your peace of mind' },
                  { icon: Clock, title: 'On Schedule', desc: 'Reliable timelines you can count on' },
                  { icon: Users, title: 'Expert Team', desc: 'Skilled professionals with years of experience' },
                  { icon: Award, title: 'Quality Guaranteed', desc: 'Premium results backed by our guarantee' }
                ].map((feature, index) => (
                  <div key={index} className="bg-navy-800 p-4 sm:p-6 rounded-2xl border border-orange-400/20 hover:border-orange-400/40 transition-all duration-300 group hover:scale-105 shadow-xl">
                    <feature.icon className="text-orange-400 mb-4 group-hover:text-orange-300 transition-colors duration-300" size={32} />
                    <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300 text-sm">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-navy-950 text-white relative overflow-hidden border-t border-orange-400/20">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900/30 to-navy-950"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                  Frequently Asked
                </span>
              </h2>
              <p className="text-xl text-gray-300">
                Get answers to common questions about our premium property services.
              </p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-navy-800 rounded-2xl border border-orange-400/20 hover:border-orange-400/40 transition-all duration-300 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-5 sm:px-8 py-4 sm:py-6 text-left flex justify-between items-center gap-4 hover:bg-navy-800/50 transition-colors duration-300"
                  >
                    <span className="text-sm sm:text-base lg:text-lg font-semibold text-white">{faq.question}</span>
                    <ChevronDown 
                      className={`text-orange-400 transition-transform duration-300 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`} 
                      size={24} 
                    />
                  </button>
                  <div className={`px-5 sm:px-8 transition-all duration-300 ${
                    openFaq === index ? 'pb-6 opacity-100' : 'pb-0 opacity-0 max-h-0 overflow-hidden'
                  }`}>
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 relative overflow-hidden border-t border-orange-400/20" style={{ background: 'linear-gradient(135deg, #060f1e 0%, #0d1f3c 100%)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(245,166,35,0.07) 0%, transparent 55%)' }}></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 sm:mb-8 text-white">
                  Get In Touch
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Ready to start your next project? Contact us for a free consultation and we'll bring your vision to life.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="bg-orange-400/10 border border-orange-400/20 p-4 rounded-2xl mr-4">
                      <Phone className="text-orange-400" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Call Us</h3>
                      <a href="tel:+61414463184" className="text-gray-300 hover:text-orange-400 transition-colors duration-300">+61 414 463 184</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-orange-400/10 border border-orange-400/20 p-4 rounded-2xl mr-4">
                      <Mail className="text-orange-400" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Email Us</h3>
                      <a href="mailto:Info@zentram.com.au" className="text-gray-300 hover:text-orange-400 transition-colors duration-300">Info@zentram.com.au</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-orange-400/10 border border-orange-400/20 p-4 rounded-2xl mr-4">
                      <MessageSquare className="text-orange-400" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Live Chat</h3>
                      <p className="text-gray-300">Available 24/7 for support</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-navy-900/60 backdrop-blur-lg p-5 sm:p-8 rounded-3xl border border-orange-400/30 shadow-2xl">
                <h3 className="text-2xl font-bold text-orange-400 mb-6">Request a Quote</h3>
                
                {showSuccessMessage && (
                  <div className="bg-green-500/20 border border-green-500/50 text-green-400 p-4 rounded-lg mb-6 flex items-center">
                    <CheckCircle className="mr-3" size={20} />
                    <span>Thank you! We'll get back to you within 24 hours.</span>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-navy-900 border border-navy-700 rounded-lg text-white focus:border-orange-400 focus:outline-none transition-colors duration-300"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-navy-900 border border-navy-700 rounded-lg text-white focus:border-orange-400 focus:outline-none transition-colors duration-300"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-navy-900 border border-navy-700 rounded-lg text-white focus:border-orange-400 focus:outline-none transition-colors duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Property Type</label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-navy-900 border border-navy-700 rounded-lg text-white focus:border-orange-400 focus:outline-none transition-colors duration-300"
                    >
                      <option value="">Select property type</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="industrial">Industrial</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Property Address</label>
                    <input
                      type="text"
                      name="propertyAddress"
                      value={formData.propertyAddress}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-navy-900 border border-navy-700 rounded-lg text-white focus:border-orange-400 focus:outline-none transition-colors duration-300"
                      placeholder="Property address (optional)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Services Required</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {services.map((service) => (
                        <label key={service} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="servicesRequired"
                            value={service}
                            checked={formData.servicesRequired.includes(service)}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-colors duration-300 ${
                            formData.servicesRequired.includes(service)
                              ? 'bg-orange-500 border-orange-400'
                              : 'border-gray-600 hover:border-orange-400'
                          }`}>
                            {formData.servicesRequired.includes(service) && (
                              <CheckCircle className="text-black" size={12} />
                            )}
                          </div>
                          <span className="text-gray-300 text-sm">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Project Details</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 bg-navy-900 border border-navy-700 rounded-lg text-white focus:border-orange-400 focus:outline-none transition-colors duration-300 resize-none"
                      placeholder="Tell us about your project, timeline, and any specific requirements..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-black py-4 px-8 rounded-lg font-bold hover:shadow-2xl hover:shadow-orange-400/25 hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Send Request</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* WhatsApp Contact Section */}
        <section className="py-20 bg-navy-950 text-white relative overflow-hidden border-t border-orange-400/20">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900/30 to-navy-950"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex flex-col items-center space-y-8">
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="bg-gradient-to-br from-orange-400 to-orange-500 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-400/25"
              >
                {/* WhatsApp inline SVG */}
                <svg className="w-11 h-11" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </motion.div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black">
                <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                  Let's Chat on WhatsApp
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl">
                Get instant responses to your questions. We're here to help you transform your space.
              </p>
              <a
                href="https://wa.me/+61414463184?text=Hello!%20I'm%20interested%20in%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-orange-400 to-orange-500 text-black px-10 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-orange-400/25 hover:scale-105 transition-all duration-300 inline-flex items-center space-x-3 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Start Chat Now
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-navy-900 text-white py-16 border-t border-orange-400/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center mb-6">
                  <img
                    src="/images/logonew.jpeg"
                    alt="Zentra M & CO"
                    className="h-14 w-auto object-contain mr-4 rounded-lg"
                  />
                  <div>
                    <p className="text-sm text-gray-400 leading-tight">Property Renovation<br />&amp; Maintenance</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 max-w-md">
                  Transforming properties with premium craftsmanship and exceptional service. 
                  Your vision, our expertise, extraordinary results.
                </p>
                <div className="flex space-x-4">
                  {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                    <button
                      key={social}
                      className="bg-navy-800 hover:bg-orange-500 hover:text-black p-3 rounded-full transition-all duration-300 group"
                    >
                      <MessageSquare size={20} />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-4 text-orange-400">Services</h3>
                <ul className="space-y-2">
                  {services.slice(0, 4).map((service) => (
                    <li key={service}>
                      <button
                        className="text-gray-300 hover:text-orange-400 transition-colors duration-300"
                        onClick={() => scrollToSection('services')}
                      >
                        {service}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-4 text-orange-400">Contact Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Phone size={16} className="mr-3 text-orange-400" />
                    <span>+61 414 463 184</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Mail size={16} className="mr-3 text-orange-400" />
                    <span>Info@zentram.com.au</span>
                  </div>
                  <div className="flex items-start text-gray-300">
                    <Building size={16} className="mr-3 mt-0.5 shrink-0 text-orange-400" />
                    <span>Unit 2, 9-13 Elgin Street, Sale VIC 3850</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-center">
              <p className="text-gray-400">
                © 2025 Zentra M &amp; CO. All rights reserved. |
                <button className="hover:text-orange-400 transition-colors duration-300 ml-1">Privacy Policy</button> | 
                <button className="hover:text-orange-400 transition-colors duration-300 ml-1">Terms of Service</button>
              </p>
            </div>
          </div>
        </footer>
        </main>

{/* Floating WhatsApp Button */}
<a
  href="https://wa.me/+61414463184?text=Hello!%20I'm%20interested%20in%20your%20services."
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl shadow-green-500/30 hover:scale-110 transition-transform duration-300"
  style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}
  aria-label="Chat on WhatsApp"
>
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>

{/* Mobile Menu Overlay */}
<div 
  className={`fixed inset-0 z-50 ${isMobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'} transition-all duration-300`}
>
  {/* Backdrop */}
  <div 
    className={`absolute inset-0 bg-black/80 backdrop-blur-md ${
      isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
    } transition-opacity duration-300`}
    onClick={() => setIsMobileMenuOpen(false)}
  />

  {/* Menu Panel */}
  <div 
    className={`absolute top-0 right-0 w-80 h-full bg-gradient-to-b from-gray-900 to-black border-l border-orange-400/20 shadow-2xl transform ${
      isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
    } transition-transform duration-500 ease-out`}
  >
    {/* Header */}
    <div className="flex items-center justify-between p-6 border-b border-orange-400/20">
      <img
        src="/images/logonew.jpeg"
        alt="Zentra M & CO"
        className="h-10 w-auto object-contain"
      />
      <button 
        onClick={() => setIsMobileMenuOpen(false)}
        className="p-2 rounded-full hover:bg-orange-400/10 text-gray-400 hover:text-orange-400 transition-colors duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    {/* Navigation Links */}
    <div className="px-4 py-6 space-y-2 overflow-y-auto">
      {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item, index) => (
        <button
          key={item}
          onClick={() => {
            scrollToSection(item.toLowerCase() === 'home' ? 'hero' : 
                          item.toLowerCase() === 'projects' ? 'gallery' : 
                          item.toLowerCase());
            setIsMobileMenuOpen(false);
          }}
          className={`w-full group px-4 py-4 text-left rounded-xl transition-all duration-300 
            ${index === 0 ? 'bg-orange-400/10 text-orange-400' : 'text-gray-300 hover:bg-orange-400/10'}
            flex items-center justify-between`}
          style={{
            transitionDelay: `${index * 50}ms`
          }}
        >
          <span className="font-medium">{item}</span>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center
            ${index === 0 ? 'bg-orange-400/20' : 'bg-transparent group-hover:bg-orange-400/20'}
            transition-all duration-300`}
          >
            <ArrowRight size={14} className={`transform ${
              index === 0 ? 'text-orange-400' : 'text-gray-400 group-hover:text-orange-400'
            } group-hover:translate-x-0.5 transition-all duration-300`} />
          </div>
        </button>
      ))}
    </div>

    {/* Contact Section */}
    <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-orange-400/20 bg-gradient-to-t from-gray-900 to-transparent">
      <div className="space-y-4">
        <button
          onClick={() => {
            scrollToSection('contact'); // Changed from 'inquiry'
            setIsMobileMenuOpen(false);
          }}
          className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-black px-6 py-4 rounded-xl 
            font-bold hover:shadow-lg hover:shadow-orange-400/25 hover:scale-[1.02] transform transition-all duration-300
            flex items-center justify-center space-x-2"
        >
          <span>Get Quote</span>
          <ArrowRight size={18} />
        </button>
        
        {/* Quick Contact */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href="tel:+61414463184"
            className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl
              bg-orange-400/10 text-orange-400 hover:bg-orange-400/20 transition-all duration-300"
          >
            <Phone size={16} />
            <span className="font-medium">Call Us</span>
          </a>
          <a
            href="https://wa.me/+61414463184"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl
              bg-orange-400/10 text-orange-400 hover:bg-orange-400/20 transition-all duration-300"
          >
            <MessageSquare size={16} />
            <span className="font-medium">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}


export default App;