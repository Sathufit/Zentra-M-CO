import React, { useState, useEffect } from 'react';
import { Mail, Phone, Hammer, Paintbrush, Leaf, LayoutGrid, Brush, Sparkles, ChevronDown, CheckCircle, Code, Briefcase, Award, Quote, CalendarDays, CheckCircle2, Home, Building, MessageSquare, Star, ArrowRight, Play, Shield, Clock, Users } from 'lucide-react';

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

  const services = [
    'Premium Cleaning',
    'Pressure Washing',
    'Interior & Exterior Painting',
    'Comprehensive Maintenance',
    'Landscape Design',
    'Luxury Flooring',
    'Web Design & Digital Solutions',
  ];

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

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqaqvwev"; // Replace with your Formspree endpoint

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
        // Optionally handle errors here
        alert("There was an error submitting the form.");
      }
    } catch (error) {
      alert("There was an error submitting the form.");
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-lg shadow-xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0 relative">
                <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  APEX
                </span>
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-8">
              {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase())}
                  className="relative text-slate-700 hover:text-indigo-600 px-3 py-2 text-sm font-semibold transition-all duration-300 group"
                >
                  {item}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </button>
              ))}
              <button
                onClick={() => scrollToSection('inquiry')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Get Quote</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-indigo-600 focus:outline-none"
              >
                <div className="w-6 h-6 relative">
                  <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
                  <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 top-3 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-white/95 backdrop-blur-lg`}>
          <div className="px-4 pt-2 pb-4 space-y-2">
            {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase())}
                className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:text-indigo-600 transition-colors duration-300"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('inquiry')}
              className="block w-full text-left bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-2 rounded-lg text-base font-medium mt-4"
            >
              Get Quote
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat'
              }}
            />
          </div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full animate-pulse"
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
                <span className="bg-gradient-to-r from-white via-indigo-100 to-purple-100 bg-clip-text text-transparent">
                  Transform
                </span>
                <br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Your Space
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Premium property maintenance services that elevate your lifestyle. 
                From stunning renovations to meticulous maintenance - we create spaces that inspire.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button
                  onClick={() => scrollToSection('inquiry')}
                  className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Start Your Project
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="group flex items-center text-white hover:text-indigo-300 transition-colors duration-300"
                >
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full mr-3 group-hover:bg-white/20 transition-colors duration-300">
                    <Play size={20} />
                  </div>
                  <span className="text-lg font-medium">View Our Work</span>
                </button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="text-white/60" size={32} />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '500+', label: 'Projects Completed', icon: Home },
                { number: '98%', label: 'Client Satisfaction', icon: Star },
                { number: '15+', label: 'Years Experience', icon: Award },
                { number: '24/7', label: 'Support Available', icon: Shield }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="text-white" size={24} />
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-slate-800 mb-2">{stat.number}</div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900/50 to-purple-900/50"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Our Process
                </span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
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
                  <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-3xl border border-slate-600 hover:border-indigo-500 transition-all duration-300 group-hover:scale-105">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                      <step.icon className="text-white" size={24} />
                    </div>
                    <div className="absolute top-4 right-4 text-6xl font-black text-slate-700 group-hover:text-indigo-500/30 transition-colors duration-300">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                    <p className="text-slate-300">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-indigo-50"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-slate-800 to-indigo-600 bg-clip-text text-transparent">
                  Premium Services
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Comprehensive property solutions delivered with exceptional craftsmanship and attention to detail.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const icons = [Brush, Sparkles, Paintbrush, Hammer, Leaf, LayoutGrid, Code];
                const Icon = icons[index] || Briefcase;
                return (
                  <div key={index} className="group relative">
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200 hover:border-indigo-300 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                        <Icon className="text-white" size={24} />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-slate-800 group-hover:text-indigo-600 transition-colors duration-300">
                        {service}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {service.includes('Cleaning') && 'Comprehensive cleaning solutions that leave your space spotless and refreshed with eco-friendly products.'}
                        {service.includes('Pressure') && 'Professional pressure washing to restore surfaces and remove years of built-up grime and stains.'}
                        {service.includes('Painting') && 'Expert painting services using premium materials for stunning, long-lasting interior and exterior finishes.'}
                        {service.includes('Maintenance') && 'Complete property maintenance solutions to keep your investment in perfect condition year-round.'}
                        {service.includes('Landscape') && 'Creative landscape design and installation that transforms outdoor spaces into beautiful, functional environments.'}
                        {service.includes('Flooring') && 'Premium flooring installation and restoration using the finest materials and expert craftsmanship.'}
                        {service.includes('Web') && 'Professional web design and digital solutions to establish your strong online presence and grow your business.'}
                      </p>
                      <div className="mt-6">
                        <button className="text-indigo-600 font-semibold flex items-center group-hover:text-purple-600 transition-colors duration-300">
                          Learn More
                          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-white">
                Client Stories
              </h2>
              <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
                Don't just take our word for it - hear from our satisfied clients who've experienced our premium service.
              </p>
            </div>
            
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20">
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={24} />
                    ))}
                  </div>
                  <Quote className="text-white/60 mx-auto mb-6" size={48} />
                  <p className="text-2xl md:text-3xl font-light mb-8 leading-relaxed">
                    "{testimonials[activeTestimonial].text}"
                  </p>
                  <div className="flex items-center justify-center">
                    <div>
                      <h4 className="text-xl font-bold">{testimonials[activeTestimonial].name}</h4>
                      <p className="text-indigo-200">{testimonials[activeTestimonial].role}</p>
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
                      index === activeTestimonial ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900/30 to-purple-900/30"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-5xl md:text-6xl font-black mb-8">
                  <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    About Apex
                  </span>
                </h2>
                <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                  We're not just contractors - we're space transformation specialists. With over 15 years of experience, 
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
                        <span className="text-indigo-400 font-bold">{stat.value}</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
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
                  <div key={index} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-indigo-500 transition-all duration-300 group hover:scale-105">
                    <feature.icon className="text-indigo-400 mb-4 group-hover:text-purple-400 transition-colors duration-300" size={32} />
                    <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-300 text-sm">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-indigo-50"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-slate-800 to-indigo-600 bg-clip-text text-transparent">
                  Featured Projects
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Every project tells a story of transformation. Here are some of our recent success stories.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="aspect-w-4 aspect-h-64 bg-gradient-to-br from-indigo-500 to-purple-600 relative">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Building className="mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" size={48} />
                        <h3 className="text-2xl font-bold mb-2">Project {i + 1}</h3>
                        <p className="text-indigo-100">Premium Transformation</p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h4 className="text-white font-bold mb-2">
                        {['Modern Kitchen Renovation', 'Luxury Bathroom Remodel', 'Complete Home Makeover', 'Commercial Office Design', 'Landscape Transformation', 'Exterior Restoration'][i] || 'Premium Project'}
                      </h4>
                      <p className="text-slate-200 text-sm">
                        {['Complete kitchen transformation with premium finishes', 'Spa-like bathroom with luxury fixtures', 'Whole home renovation with modern design', 'Professional office space optimization', 'Beautiful outdoor living space creation', 'Full exterior restoration and enhancement'][i] || 'Professional transformation'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 relative overflow-hidden group">
                <span className="relative z-10">View All Projects</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900/30 to-purple-900/30"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Frequently Asked
                </span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Get answers to common questions about our premium property services.
              </p>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-700 transition-colors duration-300"
                  >
                    <span className="text-lg font-semibold text-white">{faq.question}</span>
                    <ChevronDown 
                      className={`text-indigo-400 transition-transform duration-300 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`} 
                      size={24} 
                    />
                  </button>
                  <div className={`px-8 transition-all duration-300 ${
                    openFaq === index ? 'pb-6 max-h-96' : 'max-h-0 overflow-hidden'
                  }`}>
                    <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="inquiry" className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-white">
                Start Your Project
              </h2>
              <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
                Ready to transform your space? Get in touch for a free consultation and detailed quote.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold mb-8 text-white">Get In Touch</h3>
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl mr-6">
                        <Phone className="text-white" size={24} />
                      </div>
                      <div>
                        <p className="text-indigo-100 text-sm">Call Us</p>
                        <p className="text-white text-xl font-semibold">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl mr-6">
                        <Mail className="text-white" size={24} />
                      </div>
                      <div>
                        <p className="text-indigo-100 text-sm">Email Us</p>
                        <p className="text-white text-xl font-semibold">info@apexproperty.com</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl mr-6">
                        <MessageSquare className="text-white" size={24} />
                      </div>
                      <div>
                        <p className="text-indigo-100 text-sm">Live Chat</p>
                        <p className="text-white text-xl font-semibold">Available 24/7</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                {showSuccessMessage && (
                  <div className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-xl flex items-center">
                    <CheckCircle className="text-green-400 mr-3" size={20} />
                    <span className="text-green-100">Thank you! We'll contact you within 24 hours.</span>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="telephone" className="block text-sm font-medium text-white mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="propertyType" className="block text-sm font-medium text-white mb-2">
                        Property Type
                      </label>
                      <select
                        id="propertyType"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                      >
                        <option value="" className="text-slate-800">Select property type</option>
                        <option value="residential" className="text-slate-800">Residential</option>
                        <option value="commercial" className="text-slate-800">Commercial</option>
                        <option value="industrial" className="text-slate-800">Industrial</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="propertyAddress" className="block text-sm font-medium text-white mb-2">
                        Property Address
                      </label>
                      <input
                        type="text"
                        id="propertyAddress"
                        name="propertyAddress"
                        value={formData.propertyAddress}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                        placeholder="Property address"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-4">
                      Services Required (Select all that apply)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {services.map((service) => (
                        <label key={service} className="flex items-center cursor-pointer group">
                          <input
                            type="checkbox"
                            name="servicesRequired"
                            value={service}
                            checked={formData.servicesRequired.includes(service)}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded border-2 border-white/40 mr-3 flex items-center justify-center transition-all duration-200 ${
                            formData.servicesRequired.includes(service) 
                              ? 'bg-white border-white' 
                              : 'group-hover:border-white/60'
                          }`}>
                            {formData.servicesRequired.includes(service) && (
                              <CheckCircle className="text-indigo-600" size={12} />
                            )}
                          </div>
                          <span className="text-white/90 group-hover:text-white text-sm">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm resize-none"
                      placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-100 hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                  >
                    <span>Send Inquiry</span>
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="bg-slate-900 text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900/20 to-purple-900/20"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="lg:col-span-2">
                <div className="flex items-center mb-6">
                  <span className="text-4xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    APEX
                  </span>
                </div>
                <p className="text-slate-300 mb-6 text-lg leading-relaxed max-w-md">
                  Transforming properties with premium craftsmanship and unmatched attention to detail. 
                  Your vision, our expertise.
                </p>
                <div className="flex space-x-6">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-2xl hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-2xl hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-2xl hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <MessageSquare className="text-white" size={20} />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-6 text-white">Services</h3>
                <ul className="space-y-3">
                  {services.slice(0, 4).map((service) => (
                    <li key={service}>
                      <a href="#" className="text-slate-300 hover:text-indigo-400 transition-colors duration-300">
                        {service}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
                <ul className="space-y-3">
                  {['About Us', 'Our Process', 'Portfolio', 'Contact', 'Get Quote'].map((link) => (
                    <li key={link}>
                      <button
                        onClick={() => scrollToSection(link.toLowerCase().replace(' ', ''))}
                        className="text-slate-300 hover:text-indigo-400 transition-colors duration-300 text-left"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="border-t border-slate-700 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-slate-400 text-sm">
                  © 2024 APEX Property Services. All rights reserved.
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <a href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors duration-300">
                    Privacy Policy
                  </a>
                  <a href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors duration-300">
                    Terms of Service
                  </a>
                  <a href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors duration-300">
                    Cookie Policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
        </main>
    </div>
  );
}

export default App;