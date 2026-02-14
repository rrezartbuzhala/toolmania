const canvas = document.getElementById('radarCanvas');
const ctx = canvas.getContext('2d');
let data = [
    { label: 'Integrity', value: 9 },
    { label: 'Security', value: 8 },
    { label: 'Performance', value: 7 },
    { label: 'Reliability', value: 8 },
    { label: 'Reconciliation', value: 9 }
];

function init() {
    renderInputs();
    draw();
}

function renderInputs() {
    const container = document.getElementById('inputs-container');
    container.innerHTML = '';
    data.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'input-group';
        div.innerHTML = `
            <input type="text" value="${item.label}" oninput="updateData(${index}, 'label', this.value)">
            <input type="number" value="${item.value}" min="0" max="10" oninput="updateData(${index}, 'value', this.value)">
            <button class="remove-btn" onclick="removeRow(${index})">×</button>
        `;
        container.appendChild(div);
    });
}

function updateData(index, key, val) {
    data[index][key] = key === 'value' ? parseFloat(val) : val;
    draw();
}

function addRow() {
    data.push({ label: 'New', value: 5 });
    renderInputs();
    draw();
}

function removeRow(index) {
    if (data.length > 3) {
        data.splice(index, 1);
        renderInputs();
        draw();
    } else {
        alert("You need at least 3 criteria for a radar chart!");
    }
}

function draw() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 180;
    const levels = 5;
    const color = document.getElementById('chartColor').value;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Chart Title
    const title = document.getElementById('chartTitle').value;
    if (title) {
        ctx.fillStyle = '#1e293b';
        ctx.font = '15px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(title, centerX, 15);
    }

    // 1. Draw Background Polygons (the grid)
    for (let i = 1; i <= levels; i++) {
        ctx.beginPath();
        ctx.strokeStyle = '#e2e8f0';
        const levelRadius = (radius / levels) * i;
        for (let j = 0; j < data.length; j++) {
            const angle = (Math.PI * 2 / data.length) * j - Math.PI / 2;
            const x = centerX + levelRadius * Math.cos(angle);
            const y = centerY + levelRadius * Math.sin(angle);
            j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
    }

    // 2. Draw Axes and Labels
    ctx.strokeStyle = '#cbd5e1';
    ctx.fillStyle = '#64748b';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';

    data.forEach((item, j) => {
        const angle = (Math.PI * 2 / data.length) * j - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        // Axis line
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Text labels with bold values in parentheses
        const labelDistance = radius + 25; // Moved closer to radar
        const labelX = centerX + labelDistance * Math.cos(angle);
        const labelY = centerY + labelDistance * Math.sin(angle);

        // Draw label in normal font
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';

        // Adjust vertical position based on angle to avoid overlap
        let adjustedY = labelY;
        if (Math.abs(Math.sin(angle)) < 0.1) { // Horizontal labels
            adjustedY += (Math.sin(angle) > 0 ? 5 : -5);
        }

        ctx.fillText(item.label, labelX, adjustedY);

        // Draw value in bold font below the label
        ctx.font = 'bold 14px sans-serif';
        const valueY = adjustedY + 18; // Position value below label
        ctx.fillText(`(${item.value})`, labelX, valueY);
    });

    // 3. Draw the Data Shape
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.fillStyle = color + '66'; // Add transparency

    data.forEach((item, j) => {
        const angle = (Math.PI * 2 / data.length) * j - Math.PI / 2;
        const valRadius = (item.value / 10) * radius;
        const x = centerX + valRadius * Math.cos(angle);
        const y = centerY + valRadius * Math.sin(angle);
        j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function downloadChart() {
    const link = document.createElement('a');
    const title = document.getElementById('chartTitle').value;
    const snakeCaseTitle = title ? title.toLowerCase().replace(/\s+/g, '_') : 'untitled';
    link.download = `${snakeCaseTitle}_radar_chart.png`;
    link.href = canvas.toDataURL();
    link.click();
}

init();