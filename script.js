// Smooth scrolling for navigation links with transition effects
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Add transition class to current section
        const currentSection = document.querySelector('section.active');
        if (currentSection) {
            currentSection.classList.remove('active');
            currentSection.classList.add('section-exit');
            setTimeout(() => {
                currentSection.classList.remove('section-exit');
            }, 500);
        }
        
        // Add transition class to target section
        targetSection.classList.add('section-enter');
        setTimeout(() => {
            targetSection.classList.add('active');
            targetSection.classList.remove('section-enter');
        }, 100);
        
        // Smooth scroll to section
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Form submission handling with animation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('.submit-button');
        submitButton.style.transform = 'scale(0.95)';
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', { name, email, message });
        
        // Show success message with animation
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        this.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.remove();
            submitButton.style.transform = 'scale(1)';
        }, 3000);
        
        // Reset form
        contactForm.reset();
    });
}

// Intersection Observer for section animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Update active nav link
            const id = entry.target.getAttribute('id');
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
    section.classList.add('section-transition');
});

// Add active class to first section on load
document.querySelector('section').classList.add('active');

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Add typing effect to hero text
const heroText = document.querySelector('.hero-content h1');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    typeWriter();
}

// Add smooth background transition between sections
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
    
    lastScrollTop = scrollTop;
});

class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current full text
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        // Check if deleting
        if(this.isDeleting) {
            // Remove a character
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add a character
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert text
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial type speed
        let typeSpeed = 100;

        if(this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if(!this.isDeleting && this.txt === fullTxt) {
            // Make a pause at end
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init on DOM Load
document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.typing-text');
    const words = ['Daniel Samarin'];
    const wait = 3000;
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}

// Skill Popup Functionality
const skillDescriptions = {
    python: {
        title: "Python Programming",
        description: "Proficient in Python development with expertise in data manipulation, automation, and machine learning. Experienced with libraries like NumPy, Pandas, and Scikit-learn for data analysis and model development.",
        projects: [
            "Developed a machine learning model for predicting customer churn",
            "Created an automated data processing pipeline for financial reports",
            "Built a natural language processing system for sentiment analysis"
        ]
    },
    sql: {
        title: "SQL Database Management",
        description: "Skilled in writing complex SQL queries, database design, and optimization. Experienced with various database systems and data warehousing solutions for efficient data storage and retrieval.",
        projects: [
            "Designed and implemented a data warehouse for business analytics",
            "Optimized database queries improving performance by 40%",
            "Created complex stored procedures for automated reporting"
        ]
    },
    powerbi: {
        title: "Power BI Visualization",
        description: "Expert in creating interactive dashboards and reports using Power BI. Capable of transforming complex data into clear, actionable visualizations and implementing automated data refresh solutions.",
        projects: [
            "Developed executive dashboards for real-time business monitoring",
            "Created interactive sales analytics reports with drill-through capabilities",
            "Implemented automated data refresh solutions for live reporting"
        ]
    },
    ml: {
        title: "Machine Learning",
        description: "Experienced in developing and deploying machine learning models. Proficient in supervised and unsupervised learning techniques, model evaluation, and optimization for real-world applications.",
        projects: [
            "Built a recommendation system for e-commerce platform",
            "Developed an image classification model for quality control",
            "Created a predictive maintenance system for industrial equipment"
        ]
    },
    analytics: {
        title: "Data Analytics",
        description: "Skilled in data analysis, statistical methods, and business intelligence. Capable of extracting meaningful insights from complex datasets and presenting findings to stakeholders.",
        projects: [
            "Conducted market analysis leading to 25% growth in customer base",
            "Developed customer segmentation models for targeted marketing",
            "Created automated reporting systems for key performance indicators"
        ]
    },
    cloud: {
        title: "Cloud Technologies",
        description: "Experienced with cloud platforms and services. Proficient in cloud-based data storage, computing, and deployment solutions for scalable and efficient data processing.",
        projects: [
            "Migrated on-premise systems to cloud infrastructure",
            "Implemented serverless functions for data processing",
            "Set up automated CI/CD pipelines for application deployment"
        ]
    },
    java: {
        title: "Java Development",
        description: "Proficient in Java programming with expertise in object-oriented design and enterprise applications. Experienced with Spring Framework, Java EE, and building scalable backend systems.",
        projects: [
            "Developed a microservices-based e-commerce platform",
            "Created a real-time data processing system",
            "Built a secure authentication service"
        ]
    },
    webdesign: {
        title: "Web Design",
        description: "Skilled in creating modern, responsive websites with a focus on user experience and accessibility. Proficient in HTML5, CSS3, JavaScript, and modern web development frameworks.",
        projects: [
            "Designed and developed a responsive e-commerce website",
            "Created an interactive portfolio website with modern UI/UX",
            "Built a real-time data visualization dashboard"
        ]
    }
};

const popup = document.getElementById('skillPopup');
const popupTitle = document.getElementById('popupTitle');
const popupDescription = document.getElementById('popupDescription');
const closePopup = document.querySelector('.close-popup');

document.querySelectorAll('.skill-btn').forEach(button => {
    button.addEventListener('click', () => {
        const skill = button.getAttribute('data-skill');
        const description = skillDescriptions[skill];
        
        // Update popup content with proper formatting
        popupTitle.textContent = description.title;
        popupDescription.textContent = description.description;
        
        // Update projects list with proper formatting
        const projectsList = document.getElementById('projectsList');
        projectsList.innerHTML = description.projects
            .map(project => `<li>${project}</li>`)
            .join('');
        
        // Show popup with animation
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        const popupContent = popup.querySelector('.popup-content');
        popupContent.style.animation = 'popupSlide 0.3s ease-out';
    });
});

// Update close popup functionality
closePopup.addEventListener('click', () => {
    const popupContent = popup.querySelector('.popup-content');
    popupContent.style.animation = 'popupSlideOut 0.3s ease-in';
    setTimeout(() => {
        popup.style.display = 'none';
        document.body.style.overflow = '';
        popupContent.style.animation = '';
    }, 300);
});

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes popupSlide {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes popupSlideOut {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-20px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Project Scroll Buttons
const projectsContainer = document.querySelector('.projects-container');
const scrollLeftBtn = document.querySelector('.scroll-left');
const scrollRightBtn = document.querySelector('.scroll-right');

let currentPage = 0;

// Function to update button states
function updateScrollButtons() {
    scrollLeftBtn.disabled = currentPage === 0;
    scrollRightBtn.disabled = currentPage === 1;
    
    scrollLeftBtn.style.opacity = currentPage === 0 ? '0.5' : '1';
    scrollRightBtn.style.opacity = currentPage === 1 ? '0.5' : '1';
}

// Scroll left
scrollLeftBtn.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        projectsContainer.style.transform = `translateX(-${currentPage * 50}%)`;
        updateScrollButtons();
    }
});

// Scroll right
scrollRightBtn.addEventListener('click', () => {
    if (currentPage < 1) {
        currentPage++;
        projectsContainer.style.transform = `translateX(-${currentPage * 50}%)`;
        updateScrollButtons();
    }
});

// Initialize button states
updateScrollButtons();

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentPage > 0) {
        currentPage--;
        projectsContainer.style.transform = `translateX(-${currentPage * 50}%)`;
        updateScrollButtons();
    } else if (e.key === 'ArrowRight' && currentPage < 1) {
        currentPage++;
        projectsContainer.style.transform = `translateX(-${currentPage * 50}%)`;
        updateScrollButtons();
    }
});

// Project data
const projects = {
    church: {
        title: "Church Website Project",
        image: "Church.jpg",
        description: "A modern, responsive website for a local church featuring event management, sermon archives, and community engagement features. The project focused on creating an intuitive platform that connects the church community and facilitates seamless communication.",
        details: [
            "Implemented a custom event calendar system with recurring events and reminders",
            "Created an interactive sermon archive with search functionality and audio playback",
            "Developed a prayer request submission system with admin moderation",
            "Integrated social media feeds and community updates",
            "Built a responsive donation system with multiple payment options",
            "Implemented a member portal for personalized content and preferences",
            "Created an automated newsletter system for event notifications",
            "Developed a mobile-friendly design for all screen sizes"
        ],
        tech: [
            "HTML5, CSS3, JavaScript for frontend development",
            "React.js for dynamic UI components",
            "Node.js and Express for backend services",
            "MongoDB for flexible data storage",
            "AWS for reliable hosting and CDN",
            "Stripe API for secure payment processing",
            "Firebase for real-time updates",
            "JWT for secure authentication"
        ]
    },
    hangry: {
        title: "Hangry App Project",
        image: "Hangry.jpg",
        description: "A mobile application that helps users find nearby restaurants based on their mood and preferences. The app uses AI to understand user preferences and provides personalized restaurant recommendations.",
        details: [
            "Developed real-time restaurant search with advanced filtering options",
            "Implemented mood-based restaurant recommendations using ML algorithms",
            "Created a user review and rating system with photo uploads",
            "Integrated with Google Maps API for location services",
            "Built a personalized recommendation engine",
            "Developed offline functionality for basic features",
            "Implemented push notifications for deals and updates",
            "Created a social feature for sharing experiences"
        ],
        tech: [
            "React Native for cross-platform development",
            "Firebase for backend services and authentication",
            "Google Maps API for location features",
            "Redux for state management",
            "TensorFlow Lite for on-device ML",
            "Cloud Functions for serverless operations",
            "Firebase Cloud Messaging for notifications",
            "MongoDB for user data storage"
        ]
    },
    analyzer: {
        title: "AI Customer Sentiment Analyzer",
        image: "Analyzer.png",
        description: "An AI-powered tool that analyzes customer feedback and social media mentions to provide actionable insights. The system uses natural language processing to understand customer sentiment and identify trends.",
        details: [
            "Built sentiment analysis model using advanced NLP techniques",
            "Developed real-time data processing pipeline for live analysis",
            "Created interactive visualization dashboard with Power BI",
            "Implemented automated report generation and scheduling",
            "Developed multi-language support for global analysis",
            "Built custom ML models for industry-specific insights",
            "Created API endpoints for third-party integration",
            "Implemented data export functionality in multiple formats"
        ],
        tech: [
            "Python with TensorFlow for ML models",
            "Natural Language Processing libraries",
            "Power BI for data visualization",
            "Azure Cloud Services for infrastructure",
            "Docker for containerization",
            "Kubernetes for orchestration",
            "FastAPI for API development",
            "PostgreSQL for data storage"
        ]
    },
    data: {
        title: "Data Visualization Dashboard",
        image: "Data.png",
        description: "A comprehensive dashboard for visualizing complex business metrics and KPIs in real-time. The dashboard provides interactive features for data exploration and custom reporting.",
        details: [
            "Designed interactive charts and graphs with drill-down capabilities",
            "Implemented real-time data updates using WebSocket",
            "Created custom filtering options for data segmentation",
            "Developed export functionality in multiple formats",
            "Built automated data refresh system",
            "Created custom visualization components",
            "Implemented user-specific dashboard layouts",
            "Developed data caching for improved performance"
        ],
        tech: [
            "D3.js for custom visualizations",
            "React for frontend development",
            "WebSocket for real-time updates",
            "Chart.js for basic charts",
            "Redux for state management",
            "Node.js for backend services",
            "MongoDB for data storage",
            "Redis for caching"
        ]
    },
    machine: {
        title: "Machine Learning Pipeline",
        image: "Machine.webp",
        description: "An automated pipeline for processing, training, and deploying machine learning models. The system handles the entire ML lifecycle from data preparation to model deployment.",
        details: [
            "Built automated data preprocessing pipeline with validation",
            "Developed model training workflow with version control",
            "Created model evaluation metrics and reporting",
            "Implemented automated deployment system",
            "Built A/B testing framework for model comparison",
            "Developed model monitoring and alerting system",
            "Created data drift detection system",
            "Implemented automated model retraining"
        ],
        tech: [
            "Python with scikit-learn for ML algorithms",
            "TensorFlow and PyTorch for deep learning",
            "Docker for containerization",
            "Kubernetes for orchestration",
            "MLflow for experiment tracking",
            "Prometheus for monitoring",
            "Grafana for visualization",
            "Airflow for workflow management"
        ]
    },
    migration: {
        title: "Cloud Migration Tool",
        image: "Migration.png",
        description: "A tool to automate and streamline the process of migrating applications to cloud platforms. The system provides comprehensive analysis and automated migration capabilities.",
        details: [
            "Developed automated migration scripts for multiple cloud providers",
            "Created dependency analysis tools for complex applications",
            "Implemented rollback functionality for failed migrations",
            "Built progress monitoring system with detailed reporting",
            "Developed cost estimation tools",
            "Created security compliance checker",
            "Built performance benchmarking system",
            "Implemented automated testing framework"
        ],
        tech: [
            "Python for automation scripts",
            "AWS SDK for AWS integration",
            "Azure API for Azure integration",
            "Terraform for infrastructure as code",
            "Ansible for configuration management",
            "Jenkins for CI/CD",
            "Docker for containerization",
            "Prometheus for monitoring"
        ]
    },
    ecommerce: {
        title: "E-commerce Platform",
        image: "E-commerce.jpeg",
        description: "A full-featured e-commerce platform with advanced search, filtering, and payment processing. The system includes inventory management, order processing, and analytics.",
        details: [
            "Implemented advanced product search with filters",
            "Created shopping cart system with real-time updates",
            "Developed payment processing integration",
            "Built order management system",
            "Implemented inventory tracking system",
            "Created customer analytics dashboard",
            "Built recommendation engine",
            "Developed multi-vendor support"
        ],
        tech: [
            "React for frontend development",
            "Node.js for backend services",
            "Stripe for payment processing",
            "MongoDB for product database",
            "Redis for caching",
            "Elasticsearch for search functionality",
            "Docker for containerization",
            "Kubernetes for orchestration"
        ]
    },
    mobile: {
        title: "Mobile App Development",
        image: "Mobile.png",
        description: "Cross-platform mobile application development with focus on performance and user experience. The app includes offline support and real-time synchronization.",
        details: [
            "Developed cross-platform UI components",
            "Implemented offline functionality with data sync",
            "Created push notification system",
            "Built performance optimization tools",
            "Developed custom animations",
            "Implemented biometric authentication",
            "Created data encryption system",
            "Built crash reporting system"
        ],
        tech: [
            "React Native for cross-platform development",
            "Firebase for backend services",
            "Redux for state management",
            "Native modules integration",
            "Jest for testing",
            "Fastlane for deployment",
            "Sentry for error tracking",
            "Firebase Analytics for user insights"
        ]
    }
};

// Project popup functionality
const projectPopup = document.getElementById('projectPopup');
const projectLinks = document.querySelectorAll('.view-project');

projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = link.getAttribute('data-project');
        const project = projects[projectId];
        
        if (project) {
            // Update popup content
            document.querySelector('.project-popup-image img').src = project.image;
            document.querySelector('.project-popup h3').textContent = project.title;
            document.querySelector('.project-popup p').textContent = project.description;
            
            // Update project details
            const detailsList = document.querySelector('.project-details ul');
            detailsList.innerHTML = project.details.map(detail => `<li>${detail}</li>`).join('');
            
            // Update technologies
            const techList = document.querySelector('.project-tech ul');
            techList.innerHTML = project.tech.map(tech => `<li>${tech}</li>`).join('');
            
            // Show popup
            projectPopup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close popup when clicking outside
projectPopup.addEventListener('click', (e) => {
    if (e.target === projectPopup) {
        projectPopup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close popup with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectPopup.style.display === 'flex') {
        projectPopup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}); 