// Password Generator Script

const characterSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

function updateLengthValue() {
    const length = document.getElementById('length').value;
    document.getElementById('lengthValue').textContent = length;
    generatePassword();
}

function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    const useUppercase = document.getElementById('uppercase').checked;
    const useLowercase = document.getElementById('lowercase').checked;
    const useNumbers = document.getElementById('numbers').checked;
    const useSymbols = document.getElementById('symbols').checked;

    // Build character pool
    let charPool = '';
    if (useUppercase) charPool += characterSets.uppercase;
    if (useLowercase) charPool += characterSets.lowercase;
    if (useNumbers) charPool += characterSets.numbers;
    if (useSymbols) charPool += characterSets.symbols;

    // Ensure at least one character set is selected
    if (charPool === '') {
        document.getElementById('passwordOutput').value = 'Please select at least one character type';
        updateStrengthMeter(0);
        return;
    }

    // Generate password
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charPool.charAt(Math.floor(Math.random() * charPool.length));
    }

    // Ensure password includes at least one character from each selected set
    if (useUppercase && !/[A-Z]/.test(password)) {
        password = replaceRandomChar(password, characterSets.uppercase);
    }
    if (useLowercase && !/[a-z]/.test(password)) {
        password = replaceRandomChar(password, characterSets.lowercase);
    }
    if (useNumbers && !/\d/.test(password)) {
        password = replaceRandomChar(password, characterSets.numbers);
    }
    if (useSymbols && !/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
        password = replaceRandomChar(password, characterSets.symbols);
    }

    document.getElementById('passwordOutput').value = password;
    updateStrengthMeter(calculateStrength(password, length, useUppercase, useLowercase, useNumbers, useSymbols));
}

function replaceRandomChar(password, charSet) {
    const randomIndex = Math.floor(Math.random() * password.length);
    const randomChar = charSet.charAt(Math.floor(Math.random() * charSet.length));
    return password.substring(0, randomIndex) + randomChar + password.substring(randomIndex + 1);
}

function calculateStrength(password, length, hasUpper, hasLower, hasNumbers, hasSymbols) {
    let score = 0;

    // Length scoring
    if (length >= 8) score += 1;
    if (length >= 12) score += 1;
    if (length >= 16) score += 1;

    // Character variety scoring
    if (hasUpper) score += 1;
    if (hasLower) score += 1;
    if (hasNumbers) score += 1;
    if (hasSymbols) score += 1;

    // Bonus for longer passwords with variety
    if (length >= 12 && score >= 4) score += 1;

    return score;
}

function updateStrengthMeter(score) {
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');

    // Remove existing classes
    strengthBar.className = 'strength-bar';

    if (score <= 2) {
        strengthBar.classList.add('weak');
        strengthText.textContent = 'Password Strength: Weak';
        strengthText.style.color = '#ef4444';
    } else if (score <= 4) {
        strengthBar.classList.add('medium');
        strengthText.textContent = 'Password Strength: Medium';
        strengthText.style.color = '#f59e0b';
    } else {
        strengthBar.classList.add('strong');
        strengthText.textContent = 'Password Strength: Strong';
        strengthText.style.color = '#10b981';
    }
}

function copyPassword() {
    const passwordOutput = document.getElementById('passwordOutput');
    const copyBtn = document.getElementById('copyBtn');

    if (passwordOutput.value === 'Click Generate to create a password' ||
        passwordOutput.value === 'Please select at least one character type') {
        return;
    }

    passwordOutput.select();
    passwordOutput.setSelectionRange(0, 99999); // For mobile devices

    try {
        document.execCommand('copy');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✅ Copied!';
        copyBtn.style.background = 'rgba(16, 185, 129, 0.2)';
        copyBtn.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        copyBtn.style.color = '#10b981';

        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
            copyBtn.style.borderColor = '';
            copyBtn.style.color = '';
        }, 2000);
    } catch (err) {
        console.error('Failed to copy password: ', err);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    generatePassword();
});