// Load components
async function loadComponent(url, elementId) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${elementId}:`, error);
    }
}

// Load navbar and footer
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('partials/navbar.html', 'navbar');
    loadComponent('partials/footer.html', 'footer');
    
    // Load services
    loadServices();
    loadPortfolio();
});

// Services Data
const services = [
    {
        id: 1,
        name: "Desain Grafis",
        icon: "fas fa-pen-fancy",
        description: "Solusi desain kreatif untuk branding bisnis Anda"
    },
    {
        id: 2,
        name: "Pengembangan Web",
        icon: "fas fa-code",
        description: "Bangun website profesional untuk bisnis Anda"
    },
    {
        id: 3,
        name: "Digital Marketing",
        icon: "fas fa-bullhorn",
        description: "Tingkatkan penjualan dengan strategi pemasaran digital"
    }
];

function loadServices() {
    const container = document.getElementById('services-container');
    container.innerHTML = services.map(service => `
        <div class="service-card">
            <i class="${service.icon}"></i>
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <a href="#contact" class="btn-outline">Pelajari Lebih</a>
        </div>
    `).join('');
}

// Portfolio Data
const portfolioItems = [
    {
        id: 1,
        title: "Desain Logo Perusahaan",
        category: "design",
        image: "portfolio1.jpg"
    },
    {
        id: 2,
        title: "Website E-commerce",
        category: "web",
        image: "portfolio2.jpg"
    }
];

function loadPortfolio() {
    const container = document.getElementById('portfolio-container');
    container.innerHTML = portfolioItems.map(item => `
        <div class="portfolio-item">
            <img src="images/${item.image}" alt="${item.title}">
            <div class="portfolio-overlay">
                <h3>${item.title}</h3>
                <p>${item.category}</p>
            </div>
        </div>
    `).join('');
}

// Check auth state
function checkAuthState() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authButtons = document.querySelector('.auth-buttons');
    const userMenu = document.querySelector('.user-menu');
    
    if (currentUser) {
        authButtons.style.display = 'none';
        userMenu.style.display = 'flex';
        document.querySelector('.user-name').textContent = currentUser.name;
    } else {
        authButtons.style.display = 'flex';
        userMenu.style.display = 'none';
    }
}
