const tabs = document.querySelectorAll('.tab');
const forms = document.querySelectorAll('.form');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const successMessage = document.getElementById('success-message');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        
        tabs.forEach(t => t.classList.remove('active'));
        forms.forEach(f => f.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(`${targetTab}-form`).classList.add('active');
    });
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showSuccess('登录成功！正在跳转...');
    setTimeout(() => {
        window.location.href = 'main.html';
    }, 1500);
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // 注释登录和注册校验
    /*
    const password = registerForm.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = registerForm.querySelectorAll('input[type="password"]')[1].value;
    
    if (password !== confirmPassword) {
        alert('两次输入的密码不一致');
        return;
    }
    
    if (password.length < 6) {
        alert('密码长度至少为6位');
        return;
    }
    */
    
    showSuccess('注册成功！请登录');
    setTimeout(() => {
        tabs[0].click();
    }, 1500);
});

function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.classList.add('show');
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}