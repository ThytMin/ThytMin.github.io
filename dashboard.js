import { checkAuth, logout } from '../auth.js';

document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    checkAuth();
    
    // Load user data
    loadUserData();
    
    // Load projects
    loadProjects();
    
    // Logout button
    document.getElementById('logout-btn')?.addEventListener('click', logout);
});

function loadUserData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('user-name').textContent = currentUser.name;
    }
}

function loadProjects() {
    const projects = [
        {
            id: 1,
            title: "Desain Logo Perusahaan",
            client: "PT ABC",
            deadline: "2023-07-15",
            status: "in-progress",
            price: "Rp1.500.000"
        },
        {
            id: 2,
            title: "Website E-commerce",
            client: "Toko Online XYZ",
            deadline: "2023-07-30",
            status: "pending",
            price: "Rp5.000.000"
        }
    ];
    
    const table = document.querySelector('.projects-table');
    if (table) {
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Proyek</th>
                    <th>Klien</th>
                    <th>Deadline</th>
                    <th>Status</th>
                    <th>Harga</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                ${projects.map(project => `
                    <tr>
                        <td>${project.title}</td>
                        <td>${project.client}</td>
                        <td>${formatDate(project.deadline)}</td>
                        <td>
                            <span class="project-status status-${project.status}">
                                ${getStatusText(project.status)}
                            </span>
                        </td>
                        <td>${project.price}</td>
                        <td>
                            <button class="btn-action" data-id="${project.id}">
                                <i class="fas fa-ellipsis-h"></i>
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

function getStatusText(status) {
    const statusMap = {
        'pending': 'Pending',
        'in-progress': 'Dalam Proses',
        'completed': 'Selesai'
    };
    return statusMap[status] || status;
}
