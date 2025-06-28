// Auth System
document.addEventListener('DOMContentLoaded', () => {
    // Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Register Form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Check if user is already logged in
    checkAuthRedirect();
});

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation
    if (!email || !password) {
        showAlert('error', 'Harap isi semua field');
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        // In production, replace with actual API call
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Save user to localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Redirect based on user role
            if (user.role === 'freelancer') {
                window.location.href = '../dashboard/freelancer.html';
            } else {
                window.location.href = '../dashboard/client.html';
            }
        } else {
            showAlert('error', 'Email atau password salah');
        }
    }, 1000);
}

function handleRegister(e) {
    e.preventDefault();
    
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const userType = document.getElementById('user-type').value;
    const terms = document.getElementById('terms').checked;
    
    // Validation
    if (!fullname || !email || !password || !confirmPassword || !userType) {
        showAlert('error', 'Harap isi semua field');
        return;
    }
    
    if (password !== confirmPassword) {
        showAlert('error', 'Password tidak cocok');
        return;
    }
    
    if (!terms) {
        showAlert('error', 'Anda harus menyetujui syarat & ketentuan');
        return;
    }
    
    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === email)) {
        showAlert('error', 'Email sudah terdaftar');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now().toString(),
        name: fullname,
        email,
        password,
        role: userType,
        createdAt: new Date().toISOString()
    };
    
    // Save to "database"
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    showAlert('success', 'Pendaftaran berhasil!');
    
    // Redirect
    setTimeout(() => {
        if (userType === 'freelancer') {
            window.location.href = '../dashboard/freelancer.html';
        } else {
            window.location.href = '../dashboard/client.html';
        }
    }, 1500);
}

function checkAuthRedirect() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isAuthPage = window.location.pathname.includes('/auth');
    
    if (currentUser && isAuthPage) {
        // Redirect to dashboard if already logged in
        if (currentUser.role === 'freelancer') {
            window.location.href = '../dashboard/freelancer.html';
        } else {
            window.location.href = '../dashboard/client.html';
        }
    }
}

function showAlert(type, message) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 3000);
}
