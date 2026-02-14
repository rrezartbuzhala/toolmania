function generateRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

function hexToHsl(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

function hslToHex(h, s, l) {
    const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    };

    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = c => Math.round(c * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function generatePalette() {
    const type = document.getElementById('paletteType').value;
    const numColors = parseInt(document.getElementById('numColors').value);
    let colors = [];

    if (type === 'random') {
        for (let i = 0; i < numColors; i++) {
            colors.push(generateRandomColor());
        }
    } else if (type === 'monochromatic') {
        const baseColor = generateRandomColor();
        const [h, s, l] = hexToHsl(baseColor);
        for (let i = 0; i < numColors; i++) {
            const newL = Math.max(0.1, Math.min(0.9, l + (i - Math.floor(numColors/2)) * 0.2));
            colors.push(hslToHex(h, s, newL));
        }
    } else if (type === 'complementary') {
        const baseColor = generateRandomColor();
        const [h, s, l] = hexToHsl(baseColor);
        colors.push(baseColor);
        colors.push(hslToHex((h + 0.5) % 1, s, l));
        // Fill remaining with variations
        for (let i = 2; i < numColors; i++) {
            colors.push(generateRandomColor());
        }
    } else if (type === 'analogous') {
        const baseColor = generateRandomColor();
        const [h, s, l] = hexToHsl(baseColor);
        for (let i = 0; i < numColors; i++) {
            const newH = (h + (i - Math.floor(numColors/2)) * 0.1 + 1) % 1;
            colors.push(hslToHex(newH, s, l));
        }
    }

    displayPalette(colors);
}

function displayPalette(colors) {
    const paletteDiv = document.getElementById('palette');
    paletteDiv.innerHTML = '';

    colors.forEach(color => {
        const colorCard = document.createElement('div');
        colorCard.className = 'color-card';
        colorCard.style.backgroundColor = color;
        colorCard.textContent = color.toUpperCase();
        colorCard.onclick = () => copyToClipboard(color);
        paletteDiv.appendChild(colorCard);
    });

    document.getElementById('copyButton').style.display = 'block';
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Color copied to clipboard!');
    }).catch(err => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Color copied to clipboard!');
    });
}

function copyPalette() {
    const colors = Array.from(document.querySelectorAll('.color-card')).map(card => card.textContent);
    const paletteText = colors.join('\n');
    copyToClipboard(paletteText);
}

// Generate initial palette
generatePalette();