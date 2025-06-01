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

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/meokjwar";

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
      title: "Exterior & Interior Cleaning",
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
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-black/95 backdrop-blur-lg shadow-2xl border-b border-yellow-400/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0 relative group">
                <img
                  src="images/logo2.png"
                  alt="Zentra M & CO Logo"
                  className="h-30 md:h-42 w-auto object-contain hover:scale-105 transition-transform duration-300"
                  style={{
                    maxWidth: '300px',
                    minWidth: '240px'
                  }}
                />
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-8">
              {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase() === 'home' ? 'hero' : 
                                               item.toLowerCase() === 'projects' ? 'gallery' : 
                                               item.toLowerCase())}
                  className="relative text-gray-300 hover:text-yellow-400 px-3 py-2 text-sm font-semibold transition-all duration-300 group"
                >
                  {item}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </button>
              ))}
              <button
                onClick={() => scrollToSection('inquiry')}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-full text-sm font-bold hover:shadow-2xl hover:shadow-yellow-400/25 hover:scale-105 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Get Quote</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-yellow-400 focus:outline-none"
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
        <div className={`md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-black/95 backdrop-blur-lg border-t border-yellow-400/20`}>
          <div className="px-4 pt-2 pb-4 space-y-2">
            {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase())}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-yellow-400 transition-colors duration-300"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('inquiry')}
              className="block w-full text-left bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-2 rounded-lg text-base font-bold mt-4"
            >
              Get Quote
            </button>
          </div>
        </div>

      <main className="pt-20">
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat'
              }}
            />
          </div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="absolute bg-gradient-to-r from-yellow-400/10 to-yellow-500/20 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
            <div className="animate-fade-in-up">
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                  Transform
                </span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl">
                  Your Space
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Premium property maintenance services that elevate your lifestyle. 
                From stunning renovations to meticulous maintenance - we create spaces that inspire.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                {/* Start Your Project Button - Updated to link to quote section */}
                <button
                  onClick={() => scrollToSection('contact')}
                  className="group bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-10 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-yellow-400/25 hover:scale-105 transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Start Your Project
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                {/* View Our Work Button - Updated to link to gallery section */}
                <button
                  onClick={() => {
                    const gallerySection = document.getElementById('gallery');
                    if (gallerySection) {
                      gallerySection.scrollIntoView({ behavior: 'smooth' });
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className="group flex items-center text-white hover:text-yellow-400 transition-colors duration-300"
                >
                  <div className="bg-yellow-400/10 backdrop-blur-sm p-3 rounded-full mr-3 group-hover:bg-yellow-400/20 border border-yellow-400/30 transition-colors duration-300">
                    <Play size={20} className="text-yellow-400" />
                  </div>
                  <span className="text-lg font-medium">View Our Work</span>
                </button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="text-yellow-400" size={32} />
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                  Premium Services
                </span>
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                    <div className="relative bg-black p-8 rounded-3xl shadow-2xl border border-yellow-400/20 hover:border-yellow-400/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-yellow-400/10 overflow-hidden h-full">
                      {/* Background Image Layer - Increased opacity */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity duration-300"
                        style={{
                          backgroundImage: `url('${serviceImages[service]}')`,
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                        }}
                      />
                      
                      {/* Dark Gradient Overlay - Reduced opacity */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
                      
                      {/* Content */}
                      <div className="relative z-20">
                        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-yellow-400/25">
                          <Icon className="text-black" size={24} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-yellow-400 transition-colors duration-300">
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
                        <button className="text-yellow-400 font-semibold flex items-center group-hover:text-yellow-300 transition-colors duration-300">
                          Learn More
                          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={16} />
                        </button>
                      </div>

                      {/* Top Border Gradient */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-20" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                { number: '500+', label: 'Projects Completed', icon: Home },
                { number: '98%', label: 'Client Satisfaction', icon: Star },
                { number: '5+', label: 'Years Experience', icon: Award },
                { number: '24/7', label: 'Support Available', icon: Shield }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center group"
                >
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-yellow-400/25">
                    <stat.icon className="text-black" size={24} />
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-3xl md:text-4xl font-black text-yellow-400 mb-2"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-300 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Our Gallery Section */}
        <section id="gallery" className="py-20 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
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
              className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border border-yellow-400/20"
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
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-yellow-400 text-white hover:text-black p-3 rounded-full transition-all duration-300"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-yellow-400 text-white hover:text-black p-3 rounded-full transition-all duration-300"
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
                        ? 'bg-yellow-400 w-8'
                        : 'bg-white/50 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-black text-white relative overflow-hidden border-t border-yellow-400/20">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  Our Process
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A seamless journey from consultation to completion, designed around your vision and timeline.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: CalendarDays, title: 'Consultation', desc: 'Free consultation to understand your vision and requirements' },
                { icon: CheckCircle2, title: 'Planning', desc: 'Detailed project planning with timeline and transparent pricing' },
                { icon: Hammer, title: 'Execution', desc: 'Expert craftsmen deliver premium results with regular updates' },
                { icon: Sparkles, title: 'Completion', desc: 'Final walkthrough and handover of your transformed space' }
              ].map((step, index) => (
                <div key={index} className="relative group">
                  <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 group-hover:scale-105 shadow-xl">
                    <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-yellow-400/25">
                      <step.icon className="text-black" size={24} />
                    </div>
                    <div className="absolute top-4 right-4 text-6xl font-black text-gray-800 group-hover:text-yellow-400/30 transition-colors duration-300">
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
        <section className="py-20 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-black relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-black">
                Client Stories
              </h2>
              <p className="text-xl text-black/80 max-w-3xl mx-auto">
                Don't just take our word for it - hear from our satisfied clients who've experienced our premium service.
              </p>
            </div>
            
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-black/90 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-yellow-400/50 shadow-2xl">
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={24} />
                    ))}
                  </div>
                  <Quote className="text-yellow-400/60 mx-auto mb-6" size={48} />
                  <p className="text-2xl md:text-3xl font-light mb-8 leading-relaxed text-white">
                    "{testimonials[activeTestimonial].text}"
                  </p>
                  <div className="flex items-center justify-center">
                    <div>
                      <h4 className="text-xl font-bold text-yellow-400">{testimonials[activeTestimonial].name}</h4>
                      <p className="text-gray-300">{testimonials[activeTestimonial].role}</p>
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
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeTestimonial ? 'bg-black scale-125' : 'bg-black/40 hover:bg-black/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-black text-white relative overflow-hidden border-t border-yellow-400/20">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/30 to-black"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-black mb-8">
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                    About Zentra M & CO
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  We're not just contractors - we're space transformation specialists. With over 5 of experience, 
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
                        <span className="text-yellow-400 font-bold">{stat.value}</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-yellow-400/25"
                          style={{ width: stat.value }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Shield, title: 'Fully Insured', desc: 'Complete protection for your peace of mind' },
                  { icon: Clock, title: 'On Schedule', desc: 'Reliable timelines you can count on' },
                  { icon: Users, title: 'Expert Team', desc: 'Skilled professionals with years of experience' },
                  { icon: Award, title: 'Quality Guaranteed', desc: 'Premium results backed by our guarantee' }
                ].map((feature, index) => (
                  <div key={index} className="bg-gray-900 p-6 rounded-2xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 group hover:scale-105 shadow-xl">
                    <feature.icon className="text-yellow-400 mb-4 group-hover:text-yellow-300 transition-colors duration-300" size={32} />
                    <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300 text-sm">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-black text-white relative overflow-hidden border-t border-yellow-400/20">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/30 to-black"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  Frequently Asked
                </span>
              </h2>
              <p className="text-xl text-gray-300">
                Get answers to common questions about our premium property services.
              </p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-900 rounded-2xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-800/50 transition-colors duration-300"
                  >
                    <span className="text-lg font-semibold text-white">{faq.question}</span>
                    <ChevronDown 
                      className={`text-yellow-400 transition-transform duration-300 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`} 
                      size={24} 
                    />
                  </button>
                  <div className={`px-8 transition-all duration-300 ${
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
        <section id="contact" className="py-20 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-black relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-5xl md:text-6xl font-black mb-8 text-black">
                  Get In Touch
                </h2>
                <p className="text-xl text-black/80 mb-8 leading-relaxed">
                  Ready to transform your space? Contact us today for a free consultation and discover how we can bring your vision to life.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="bg-black/10 p-4 rounded-2xl mr-4">
                      <Phone className="text-black" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-black">Call Us</h3>
                      <p className="text-black/80">+61 414 463 184</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-black/10 p-4 rounded-2xl mr-4">
                      <Mail className="text-black" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-black">Email Us</h3>
                      <p className="text-black/80">Info@zentram.com.au</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-black/10 p-4 rounded-2xl mr-4">
                      <MessageSquare className="text-black" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-black">Live Chat</h3>
                      <p className="text-black/80">Available 24/7 for support</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/90 backdrop-blur-lg p-8 rounded-3xl border border-yellow-400/50 shadow-2xl">
                <h3 className="text-2xl font-bold text-yellow-400 mb-6">Request a Quote</h3>
                
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
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors duration-300"
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
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors duration-300"
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
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Property Type</label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors duration-300"
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
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors duration-300"
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
                              ? 'bg-yellow-400 border-yellow-400'
                              : 'border-gray-600 hover:border-yellow-400'
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
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors duration-300 resize-none"
                      placeholder="Tell us about your project, timeline, and any specific requirements..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-4 px-8 rounded-lg font-bold hover:shadow-2xl hover:shadow-yellow-400/25 hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Send Request</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* WhatsApp Contact Section */}
        <section className="py-20 bg-black text-white relative overflow-hidden border-t border-yellow-400/20">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/30 to-black"></div>
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
                className="bg-gradient-to-br from-yellow-400 to-yellow-500 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-400/25"
              >
                <img 
                  src="https://img.icons8.com/color/96/000000/whatsapp--v1.png"
                  alt="WhatsApp"
                  className="w-14 h-14 hover:scale-110 transition-transform duration-300"
                />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-black">
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
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
                className="group bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-10 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-yellow-400/25 hover:scale-105 transition-all duration-300 inline-flex items-center space-x-3 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Start Chat Now
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16 border-t border-yellow-400/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center mb-6">
                  <span className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent mr-4">
                   Zentra M & CO
                  </span>
                  <div className="h-8 w-px bg-yellow-400/50"></div>
                  <span className="ml-4 text-gray-300">Property Solutions</span>
                </div>
                <p className="text-gray-300 mb-6 max-w-md">
                  Transforming properties with premium craftsmanship and exceptional service. 
                  Your vision, our expertise, extraordinary results.
                </p>
                <div className="flex space-x-4">
                  {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                    <button
                      key={social}
                      className="bg-gray-800 hover:bg-yellow-400 hover:text-black p-3 rounded-full transition-all duration-300 group"
                    >
                      <MessageSquare size={20} />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-4 text-yellow-400">Services</h3>
                <ul className="space-y-2">
                  {services.slice(0, 4).map((service) => (
                    <li key={service}>
                      <button className="text-gray-300 hover:text-yellow-400 transition-colors duration-300">
                        {service}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-4 text-yellow-400">Contact Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Phone size={16} className="mr-3 text-yellow-400" />
                    <span>+61 414 463 184</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Mail size={16} className="mr-3 text-yellow-400" />
                    <span>Info@zentram.com.au</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Building size={16} className="mr-3 text-yellow-400" />
                    <span>123 Business Ave, City, State 12345</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-center">
              <p className="text-gray-400">
                © 2024 Apex Property Solutions. All rights reserved. | 
                <button className="hover:text-yellow-400 transition-colors duration-300 ml-1">Privacy Policy</button> | 
                <button className="hover:text-yellow-400 transition-colors duration-300 ml-1">Terms of Service</button>
              </p>
            </div>
          </div>
        </footer>
        </main>

        {/* Mobile Menu Panel */}
<div 
  className={`md:hidden fixed inset-0 z-40 transform transition-all duration-300 ease-in-out ${
    isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
  }`}
>
  {/* Backdrop */}
  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
  
  {/* Menu Panel */}
  <div className="absolute right-0 top-0 w-64 h-full bg-gray-900 shadow-2xl">
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-yellow-400/20">
        <span className="text-xl font-bold text-yellow-400">Menu</span>
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="p-2 rounded-full hover:bg-yellow-400/10 text-gray-400 hover:text-yellow-400"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
          <button
            key={item}
            onClick={() => {
              scrollToSection(item.toLowerCase() === 'home' ? 'hero' : 
                            item.toLowerCase() === 'projects' ? 'gallery' : 
                            item.toLowerCase());
              setIsMobileMenuOpen(false);
            }}
            className="w-full px-4 py-3 text-left text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-all duration-300 flex items-center space-x-2"
          >
            <span>{item}</span>
          </button>
        ))}
      </div>

      {/* Call to Action Button */}
      <div className="p-4 border-t border-yellow-400/20">
        <button
          onClick={() => {
            scrollToSection('inquiry');
            setIsMobileMenuOpen(false);
          }}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-3 rounded-lg text-sm font-bold hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <span>Get Quote</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  </div>
</div>

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
    className={`absolute top-0 right-0 w-80 h-full bg-gradient-to-b from-gray-900 to-black border-l border-yellow-400/20 shadow-2xl transform ${
      isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
    } transition-transform duration-500 ease-out`}
  >
    {/* Header */}
    <div className="flex items-center justify-between p-6 border-b border-yellow-400/20">
      <img
        src="images/logo2.png"
        alt="Zentra M & CO"
        className="h-8 w-auto"
      />
      <button 
        onClick={() => setIsMobileMenuOpen(false)}
        className="p-2 rounded-full hover:bg-yellow-400/10 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
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
            ${index === 0 ? 'bg-yellow-400/10 text-yellow-400' : 'text-gray-300 hover:bg-yellow-400/10'}
            flex items-center justify-between`}
          style={{
            transitionDelay: `${index * 50}ms`
          }}
        >
          <span className="font-medium">{item}</span>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center
            ${index === 0 ? 'bg-yellow-400/20' : 'bg-transparent group-hover:bg-yellow-400/20'}
            transition-all duration-300`}
          >
            <ArrowRight size={14} className={`transform ${
              index === 0 ? 'text-yellow-400' : 'text-gray-400 group-hover:text-yellow-400'
            } group-hover:translate-x-0.5 transition-all duration-300`} />
          </div>
        </button>
      ))}
    </div>

    {/* Contact Section */}
    <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-yellow-400/20 bg-gradient-to-t from-gray-900 to-transparent">
      <div className="space-y-4">
        <button
          onClick={() => {
            scrollToSection('contact');
            setIsMobileMenuOpen(false);
          }}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-4 rounded-xl 
            font-bold hover:shadow-lg hover:shadow-yellow-400/25 hover:scale-[1.02] transform transition-all duration-300
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
              bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20 transition-all duration-300"
          >
            <Phone size={16} />
            <span className="font-medium">Call Us</span>
          </a>
          <a
            href="https://wa.me/+61414463184"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl
              bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20 transition-all duration-300"
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