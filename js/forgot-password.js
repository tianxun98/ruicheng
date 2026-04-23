const steps = document.querySelectorAll('.step');
const formSteps = document.querySelectorAll('.form-step');
const sendCodeBtn = document.getElementById('send-code-btn');
const nextStep1 = document.getElementById('next-step1');
const nextStep2 = document.getElementById('next-step2');
const backStep1 = document.getElementById('back-step1');
const backStep2 = document.getElementById('back-step2');
const confirmBtn = document.getElementById('confirm-btn');
const accountInput = document.getElementById('account');
const codeInput = document.getElementById('code');
const newPasswordInput = document.getElementById('new-password');
const confirmPasswordInput = document.getElementById('confirm-password');
const successMessage = document.getElementById('success-message');

let currentStep = 1;
let countdown = 0;
let countdownInterval = null;

function showStep(stepNumber) {
    steps.forEach((step, index) => {
        if (index + 1 < stepNumber) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (index + 1 === stepNumber) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });

    formSteps.forEach((formStep, index) => {
        formStep.classList.toggle('active', index + 1 === stepNumber);
    });

    currentStep = stepNumber;
}

function startCountdown() {
    countdown = 60;
    sendCodeBtn.disabled = true;
    sendCodeBtn.textContent = `重新发送 (${countdown}s)`;

    countdownInterval = setInterval(() => {
        countdown--;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            sendCodeBtn.disabled = false;
            sendCodeBtn.textContent = '发送验证码';
        } else {
            sendCodeBtn.textContent = `重新发送 (${countdown}s)`;
        }
    }, 1000);
}

function validateAccount(account) {
    const phoneRegex = /^1[3-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return phoneRegex.test(account) || emailRegex.test(account);
}

sendCodeBtn.addEventListener('click', () => {
    const account = accountInput.value.trim();
    
    if (!account) {
        alert('请输入手机号或邮箱');
        return;
    }

    if (!validateAccount(account)) {
        alert('请输入有效的手机号或邮箱');
        return;
    }

    startCountdown();
    alert('验证码已发送，请注意查收');
});

nextStep1.addEventListener('click', () => {
    const account = accountInput.value.trim();
    
    if (!account) {
        alert('请输入手机号或邮箱');
        return;
    }

    if (!validateAccount(account)) {
        alert('请输入有效的手机号或邮箱');
        return;
    }

    showStep(2);
});

backStep1.addEventListener('click', () => {
    showStep(1);
});

nextStep2.addEventListener('click', () => {
    const code = codeInput.value.trim();
    
    if (!code) {
        alert('请输入验证码');
        return;
    }

    if (code.length !== 6) {
        alert('验证码长度不正确');
        return;
    }

    showStep(3);
});

backStep2.addEventListener('click', () => {
    showStep(2);
});

confirmBtn.addEventListener('click', () => {
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!newPassword) {
        alert('请输入新密码');
        return;
    }

    if (newPassword.length < 6) {
        alert('密码长度至少6位');
        return;
    }

    if (!confirmPassword) {
        alert('请确认密码');
        return;
    }

    if (newPassword !== confirmPassword) {
        alert('两次输入的密码不一致');
        return;
    }

    successMessage.classList.add('show');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
});
