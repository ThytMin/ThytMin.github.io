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

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-slide');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    testimonials[index].classList.add('active');
    currentTestimonial = index;
}

document.querySelector('.testimonial-next').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
});

document.querySelector('.testimonial-prev').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentTestimonial);
});

// Auto-rotate testimonials every 5 seconds
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}, 5000);

const portfolioItems = [
    {
        title: "Proyek Desain Logo",
        category: "design",
        image: "https://via.placeholder.com/400x300"
    },
    {
        title: "Website Perusahaan",
        category: "web",
        image: "https://via.placeholder.com/400x300"
    },
    // ... item lainnya dengan kategori yang sesuai
];

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            const categories = item.getAttribute('data-category') || '';
            if (filter === 'all' || categories.includes(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Update portfolio items to include data-category
document.querySelectorAll('.portfolio-item').forEach((item, index) => {
    item.setAttribute('data-category', portfolioItems[index].category);
});
