export class BookingSystem {
    constructor() {
        this.staffMembers = [];
        this.services = [];
        this.initialize();
    }
    
    async initialize() {
        await this.loadStaff();
        await this.loadServices();
        this.setupEventListeners();
    }
    
    async loadStaff() {
        // In production, replace with API call
        this.staffMembers = [
            {
                id: 1,
                name: "Andi Pratama",
                specialization: "Desainer Grafis",
                rate: 150000,
                rating: 4.8,
                available: true
            },
            {
                id: 2,
                name: "Budi Santoso",
                specialization: "Pengembang Web",
                rate: 250000,
                rating: 4.9,
                available: true
            }
        ];
        
        this.renderStaffList();
    }
    
    async loadServices() {
        // In production, replace with API call
        this.services = [
            {
                id: 1,
                name: "Desain Logo",
                category: "design",
                duration: 3,
                basePrice: 500000
            },
            {
                id: 2,
                name: "Website Perusahaan",
                category: "web",
                duration: 14,
                basePrice: 5000000
            }
        ];
        
        this.renderServiceOptions();
    }
    
    renderStaffList() {
        const container = document.getElementById('staff-list');
        if (container) {
            container.innerHTML = this.staffMembers.map(staff => `
                <div class="staff-card" data-id="${staff.id}">
                    <img src="images/staff/${staff.id}.jpg" alt="${staff.name}">
                    <div class="staff-info">
                        <h3>${staff.name}</h3>
                        <p class="specialization">${staff.specialization}</p>
                        <div class="staff-rating">
                            ${this.generateRatingStars(staff.rating)}
                            <span>${staff.rating}</span>
                        </div>
                        <p class="rate">Rp${staff.rate.toLocaleString('id-ID')}/jam</p>
                        <p class="availability ${staff.available ? 'available' : 'unavailable'}">
                            ${staff.available ? 'Tersedia' : 'Tidak Tersedia'}
                        </p>
                    </div>
                </div>
            `).join('');
        }
    }
    
    renderServiceOptions() {
        const select = document.getElementById('service-select');
        if (select) {
            select.innerHTML = `
                <option value="">Pilih Layanan</option>
                ${this.services.map(service => `
                    <option value="${service.id}">
                        ${service.name} (${service.duration} hari kerja)
                    </option>
                `).join('')}
            `;
        }
    }
    
    generateRatingStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        return stars;
    }
    
    setupEventListeners() {
        // Staff selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.staff-card')) {
                const card = e.target.closest('.staff-card');
                const staffId = parseInt(card.dataset.id);
                this.selectStaff(staffId);
            }
        });
        
        // Service selection
        document.getElementById('service-select')?.addEventListener('change', (e) => {
            this.selectService(parseInt(e.target.value));
        });
        
        // Date selection
        document.getElementById('booking-date')?.addEventListener('change', (e) => {
            this.calculateTotal();
        });
        
        // Form submission
        document.getElementById('booking-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitBooking();
        });
    }
    
    selectStaff(staffId) {
        this.selectedStaff = this.staffMembers.find(staff => staff.id === staffId);
        document.querySelectorAll('.staff-card').forEach(card => {
            card.classList.toggle('selected', parseInt(card.dataset.id) === staffId);
        });
        
        document.getElementById('selected-staff').textContent = 
            this.selectedStaff ? this.selectedStaff.name : 'Belum dipilih';
        
        this.calculateTotal();
    }
    
    selectService(serviceId) {
        this.selectedService = this.services.find(service => service.id === serviceId);
        this.calculateTotal();
    }
    
    calculateTotal() {
        if (!this.selectedStaff || !this.selectedService) return;
        
        const days = this.selectedService.duration;
        const hours = days * 8; // Assuming 8 working hours per day
        const total = hours * this.selectedStaff.rate;
        
        document.getElementById('booking-summary').innerHTML = `
            <h3>Ringkasan Booking</h3>
            <div class="summary-item">
                <span>Layanan:</span>
                <span>${this.selectedService.name}</span>
            </div>
            <div class="summary-item">
                <span>Freelancer:</span>
                <span>${this.selectedStaff.name}</span>
            </div>
            <div class="summary-item">
                <span>Durasi:</span>
                <span>${days} hari kerja (${hours} jam)</span>
            </div>
            <div class="summary-item">
                <span>Tarif per jam:</span>
                <span>Rp${this.selectedStaff.rate.toLocaleString('id-ID')}</span>
            </div>
            <div class="summary-item total">
                <span>Total:</span>
                <span>Rp${total.toLocaleString('id-ID')}</span>
            </div>
        `;
    }
    
    async submitBooking() {
        if (!this.selectedStaff || !this.selectedService) {
            alert('Silakan pilih freelancer dan layanan terlebih dahulu');
            return;
        }
        
        const bookingData = {
            staffId: this.selectedStaff.id,
            serviceId: this.selectedService.id,
            date: document.getElementById('booking-date').value,
            notes: document.getElementById('booking-notes').value,
            total: this.calculateTotal()
        };
        
        try {
            // In production, replace with actual API call
            const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
            bookings.push({
                ...bookingData,
                id: Date.now(),
                status: 'pending',
                createdAt: new Date().toISOString()
            });
            localStorage.setItem('bookings', JSON.stringify(bookings));
            
            alert('Booking berhasil dikirim!');
            window.location.href = 'dashboard/client.html';
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert('Terjadi kesalahan saat mengirim booking');
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('booking-page')) {
        new BookingSystem();
    }
});
