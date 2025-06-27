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

// Scroll Animation
function checkScroll() {
    const elements = document.querySelectorAll('[data-scroll]');
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;
    
    elements.forEach(element => {
        const elementPosition = element.offsetTop;
        
        if (scrollPosition > elementPosition - windowHeight + 100) {
            element.classList.add('scroll-animate');
        }
    });
}

// Initial check
checkScroll();

// Check on scroll
window.addEventListener('scroll', checkScroll);

// Cookie Consent
const cookieConsent = document.querySelector('.cookie-consent');
const cookieBtn = document.querySelector('.cookie-btn');

if (!localStorage.getItem('cookieAccepted')) {
    cookieConsent.style.display = 'flex';
}

cookieBtn.addEventListener('click', () => {
    localStorage.setItem('cookieAccepted', 'true');
    cookieConsent.style.display = 'none';
});

// Staff Data
const staffMembers = [
    {
        id: 1,
        name: "Andi Pratama",
        specialization: "Desainer Grafis",
        hourlyRate: 150000,
        rating: 4.8,
        image: "https://via.placeholder.com/300",
        skills: ["Photoshop", "Illustrator", "UI/UX"],
        availability: true
    },
    // Tambahkan staff lainnya
];

// Services Data
const services = [
    { id: 1, name: "Desain Logo", category: "Design", basePrice: 500000 },
    // Tambahkan layanan lainnya
];

// Load Staff List
const staffList = document.querySelector('.staff-list');
const staffSelect = document.getElementById('staff-select');
const serviceSelect = document.getElementById('service-select');
const hourlyRateEl = document.getElementById('hourly-rate');
const totalHoursEl = document.getElementById('total-hours');
const totalPriceEl = document.getElementById('total-price');

function loadStaff() {
    staffList.innerHTML = '';
    staffSelect.innerHTML = '<option value="">-- Pilih Staff --</option>';
    
    staffMembers.forEach(staff => {
        // Staff Card
        const staffCard = document.createElement('div');
        staffCard.className = 'staff-card';
        staffCard.dataset.id = staff.id;
        staffCard.innerHTML = `
            <img src="${staff.image}" alt="${staff.name}">
            <div class="staff-info">
                <h3>${staff.name}</h3>
                <p class="staff-specialization">${staff.specialization}</p>
                <div class="staff-rating">
                    ${generateRatingStars(staff.rating)}
                    <span>${staff.rating}</span>
                </div>
                <p><strong>Rp${staff.hourlyRate.toLocaleString()}/jam</strong></p>
                <p>${staff.availability ? 'Tersedia' : 'Tidak Tersedia'}</p>
            </div>
        `;
        staffList.appendChild(staffCard);
        
        // Staff Select Option
        const option = document.createElement('option');
        option.value = staff.id;
        option.textContent = `${staff.name} - ${staff.specialization}`;
        staffSelect.appendChild(option);
    });
}

// Load Services
function loadServices() {
    serviceSelect.innerHTML = '<option value="">-- Pilih Layanan --</option>';
    
    services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = `${service.name} (Rp${service.basePrice.toLocaleString()})`;
        serviceSelect.appendChild(option);
    });
}

// Rating Stars
function generateRatingStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}

// Calculate Price
function calculatePrice() {
    const startDate = new Date(document.getElementById('start-date').value);
    const endDate = new Date(document.getElementById('end-date').value);
    const staffId = staffSelect.value;
    
    if (staffId && !isNaN(startDate.getTime()) {
        const staff = staffMembers.find(s => s.id == staffId);
        const diffTime = Math.abs(endDate - startDate);
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
        
        hourlyRateEl.textContent = `Rp${staff.hourlyRate.toLocaleString()}`;
        totalHoursEl.textContent = diffHours;
        totalPriceEl.textContent = `Rp${(staff.hourlyRate * diffHours).toLocaleString()}`;
    }
}

// Event Listeners
document.getElementById('start-date').addEventListener('change', calculatePrice);
document.getElementById('end-date').addEventListener('change', calculatePrice);
staffSelect.addEventListener('change', calculatePrice);

// Initialize
loadStaff();
loadServices();

// Review Data
const reviews = [
    {
        id: 1,
        clientName: "Budi Santoso",
        clientCompany: "PT ABC",
        rating: 5,
        comment: "Hasil pekerjaan sangat memuaskan, dikerjakan tepat waktu dan profesional.",
        date: "2023-05-15",
        project: "Desain Website"
    },
    // Tambahkan ulasan lainnya
];

// Load Reviews
function loadReviews() {
    const reviewList = document.querySelector('.review-list');
    reviewList.innerHTML = '';
    
    reviews.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        reviewItem.innerHTML = `
            <div class="review-header">
                <div class="reviewer-info">
                    <h4>${review.clientName}</h4>
                    <p>${review.clientCompany}</p>
                </div>
                <div class="review-rating">
                    ${generateRatingStars(review.rating)}
                    <span>${review.date}</span>
                </div>
            </div>
            <div class="review-content">
                <h5>${review.project}</h5>
                <p>${review.comment}</p>
            </div>
        `;
        reviewList.appendChild(reviewItem);
    });
}

// Product Data
const products = [
    {
        id: 1,
        name: "Template Website Portfolio",
        category: "templates",
        price: 250000,
        description: "Template modern untuk website portfolio dengan desain responsif.",
        file: "template-portfolio.zip"
    },
    // Tambahkan produk lainnya
];

// Load Products
function loadProducts() {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.category = product.category;
        productCard.innerHTML = `
            <div class="product-image">
                <img src="https://via.placeholder.com/300" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-desc">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">Rp${product.price.toLocaleString()}</span>
                    <button class="add-to-cart" data-id="${product.id}">Beli</button>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Cart Functionality
let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id == productId);
    if (product) {
        cart.push(product);
        updateCartCount();
    }
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Event Delegation for Add to Cart
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = e.target.dataset.id;
        addToCart(productId);
        alert('Produk telah ditambahkan ke keranjang');
    }
});
