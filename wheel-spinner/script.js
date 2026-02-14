let isSpinning = false;
const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 180;

let options = [];
let currentAngle = 0;
let spinAngle = 0;
let spinSpeed = 0;
let selectedOption = '';

// Vibrant color palette for wheel segments
const wheelColors = [
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#45B7D1', // Blue
    '#FFA07A', // Light Salmon
    '#98D8C8', // Mint
    '#F7DC6F', // Yellow
    '#BB8FCE', // Light Purple
    '#85C1E9', // Light Blue
    '#F8C471', // Orange
    '#82E0AA', // Light Green
    '#F1948A', // Pink
    '#AED6F1', // Pale Blue
    '#D7BDE2', // Lavender
    '#A3E4D7', // Aqua
    '#FAD7A0', // Peach
    '#ABEBC6'  // Pale Green
];

// Preload audio to avoid delay on first play
let spinAudio;
function preloadAudio() {
    spinAudio = document.getElementById('spinSound');
    // Force preload by loading the audio
    spinAudio.load();
    // Also create a promise to ensure it's ready
    return new Promise((resolve) => {
        if (spinAudio.readyState >= 2) {
            resolve();
        } else {
            spinAudio.addEventListener('canplaythrough', resolve, { once: true });
            spinAudio.addEventListener('error', resolve, { once: true });
        }
    });
}

// Initialize audio preloading when page loads
document.addEventListener('DOMContentLoaded', () => {
    preloadAudio().then(() => {
        console.log('Wheel spinner audio preloaded successfully');
    });
});

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (options.length === 0) {
        // Draw empty wheel
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#334155';
        ctx.fill();
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#f1f5f9';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Add options to spin', centerX, centerY);
        return;
    }

    const anglePerOption = (2 * Math.PI) / options.length;

    options.forEach((option, index) => {
        const startAngle = index * anglePerOption + currentAngle;
        const endAngle = (index + 1) * anglePerOption + currentAngle;

        // Draw segment
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();

        // Use vibrant colors from the palette, cycling through them
        const colorIndex = index % wheelColors.length;
        ctx.fillStyle = wheelColors[colorIndex];
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw text (horizontal)
        const textAngle = startAngle + anglePerOption / 2;
        const textX = centerX + Math.cos(textAngle) * (radius * 0.7);
        const textY = centerY + Math.sin(textAngle) * (radius * 0.7);

        ctx.save();
        ctx.translate(textX, textY);
        ctx.fillStyle = '#1a1a1a';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(option.length > 10 ? option.substring(0, 10) + '...' : option, 0, 0);
        ctx.restore();
    });

    // Draw pointer (at top, pointing down to the wheel)
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius); // tip at the wheel
    ctx.lineTo(centerX - 15, centerY - radius - 20); // left base above
    ctx.lineTo(centerX + 15, centerY - radius - 20); // right base above
    ctx.closePath();
    ctx.fillStyle = '#ef4444';
    ctx.fill();
}

function spinWheel() {
    if (isSpinning) return;

    const optionsText = document.getElementById('options').value.trim();
    if (!optionsText) {
        alert('Please add some options first!');
        return;
    }

    options = optionsText.split('\n').map(opt => opt.trim()).filter(opt => opt.length > 0);

    if (options.length < 2) {
        alert('Please add at least 2 options!');
        return;
    }

    // Randomly select winning option
    const winningIndex = Math.floor(Math.random() * options.length);
    selectedOption = options[winningIndex];

    isSpinning = true;
    document.getElementById('spin-btn').disabled = true;

    // Play sound using preloaded audio
    if (spinAudio) {
        spinAudio.currentTime = 0;
        spinAudio.play().catch(e => console.log('Audio play failed:', e));
    }

    // Calculate angle to land on winning option (pointer at top, pointing down, angle -PI/2)
    const anglePerOption = (2 * Math.PI) / options.length;
    const winningAngle = winningIndex * anglePerOption + anglePerOption / 2;
    const finalAngle = -Math.PI / 2 - winningAngle;

    // Random spin duration between 3-5 seconds
    const spinDuration = 4000;
    const startTime = Date.now();

    const totalRotations = 5 + Math.random() * 5; // 5-10 full rotations

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / spinDuration, 1);

        // Easing function for deceleration
        const easeOut = 1 - Math.pow(1 - progress, 3);
        currentAngle = finalAngle + (totalRotations * 2 * Math.PI) * (1 - easeOut);

        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Spin finished
            isSpinning = false;
            document.getElementById('spin-btn').disabled = false;

            showResult(selectedOption);
        }
    }

    animate();
}

function showResult(option) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = `${option}`;
    resultDiv.style.display = 'block';

    setTimeout(() => {
        resultDiv.style.display = 'none';
    }, 3000);
}

// Initial draw
drawWheel();

// Update wheel when options change
document.getElementById('options').addEventListener('input', () => {
    const optionsText = document.getElementById('options').value.trim();
    options = optionsText.split('\n').map(opt => opt.trim()).filter(opt => opt.length > 0);
    drawWheel();
});