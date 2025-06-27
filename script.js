// Mobile Navigation
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70, // Adjust for fixed header
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            burger.classList.remove('toggle');
        }
    });
});

// Portfolio Data
const portfolioItems = [
    {
        title: "Proyek Desain Logo",
        category: "Desain Grafis",
        image: "https://via.placeholder.com/400x300"
    },
    {
        title: "Website Perusahaan",
        category: "Pengembangan Web",
        image: "https://via.placeholder.com/400x300"
    },
    {
        title: "Kampanye Media Sosial",
        category: "Digital Marketing",
        image: "https://via.placeholder.com/400x300"
    },
    {
        title: "Aplikasi Mobile",
        category: "Pengembangan Web",
        image: "https://via.placeholder.com/400x300"
    },
    {
        title: "Branding Produk",
        category: "Desain Grafis",
        image: "https://via.placeholder.com/400x300"
    },
    {
        title: "SEO Optimization",
        category: "Digital Marketing",
        image: "https://via.placeholder.com/400x300"
    }
];

// Load Portfolio Items
const portfolioGrid = document.querySelector('.portfolio-grid');

portfolioItems.forEach(item => {
    const portfolioItem = document.createElement('div');
    portfolioItem.className = 'portfolio-item';
    portfolioItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="portfolio-overlay">
            <h3>${item.title}</h3>
            <p>${item.category}</p>
        </div>
    `;
    portfolioGrid.appendChild(portfolioItem);
});

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.elements[0].value;
    const email = this.elements[1].value;
    const message = this.elements[3].value;
    
    // Here you would typically send the data to a server
    console.log({ name, email, message });
    
    // Show success message
    alert('Terima kasih atas pesan Anda! Kami akan segera menghubungi Anda.');
    
    // Reset form
    this.reset();
});

// Sticky Navigation on Scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    } else {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});
