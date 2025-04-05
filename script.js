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
        description: "Proficient in Python development with expertise in data manipulation, automation, and machine learning. Experienced with libraries like NumPy, Pandas, and Scikit-learn for data analysis and model development."
    },
    sql: {
        title: "SQL Database Management",
        description: "Skilled in writing complex SQL queries, database design, and optimization. Experienced with various database systems and data warehousing solutions for efficient data storage and retrieval."
    },
    powerbi: {
        title: "Power BI Visualization",
        description: "Expert in creating interactive dashboards and reports using Power BI. Capable of transforming complex data into clear, actionable visualizations and implementing automated data refresh solutions."
    },
    ml: {
        title: "Machine Learning",
        description: "Experienced in developing and deploying machine learning models. Proficient in supervised and unsupervised learning techniques, model evaluation, and optimization for real-world applications."
    },
    analytics: {
        title: "Data Analytics",
        description: "Skilled in data analysis, statistical methods, and business intelligence. Capable of extracting meaningful insights from complex datasets and presenting findings to stakeholders."
    },
    cloud: {
        title: "Cloud Technologies",
        description: "Experienced with cloud platforms and services. Proficient in cloud-based data storage, computing, and deployment solutions for scalable and efficient data processing."
    },
    java: {
        title: "Java Development",
        description: "Proficient in Java programming with expertise in object-oriented design and enterprise applications. Experienced with Spring Framework, Java EE, and building scalable backend systems."
    },
    webdesign: {
        title: "Web Design",
        description: "Skilled in creating modern, responsive websites with a focus on user experience and accessibility. Proficient in HTML5, CSS3, JavaScript, and modern web development frameworks."
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
        
        popupTitle.textContent = description.title;
        popupDescription.textContent = description.description;
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
    document.body.style.overflow = '';
});

popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
        document.body.style.overflow = '';
    }
}); 