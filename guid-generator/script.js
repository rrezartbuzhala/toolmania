function generateUUIDv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

let lastTimestamp = 0;

function generateUUIDv1() {
    let timestamp = Date.now();
    if (timestamp <= lastTimestamp) {
        timestamp = lastTimestamp + 1;
    }
    lastTimestamp = timestamp;

    const timeLow = (timestamp & 0xffffffff).toString(16).padStart(8, '0');
    const timeMid = ((timestamp >> 32) & 0xffff).toString(16).padStart(4, '0');
    const timeHigh = ((timestamp >> 48) & 0x0fff | 0x1000).toString(16).padStart(4, '0');
    const clockSeq = (Math.random() * 0x3fff | 0x8000).toString(16).padStart(4, '0');
    const node = Array.from({length: 6}, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');

    return `${timeLow}-${timeMid}-${timeHigh}-${clockSeq}-${node}`;
}

function updateInputs() {
    // No inputs to update since only v1 and v4
}

function generateGUID() {
    const guidType = document.getElementById('guidType').value;

    switch (guidType) {
        case 'v1':
            return generateUUIDv1();
        default:
            return generateUUIDv4();
    }
}

function generateGUIDs() {
    const count = parseInt(document.getElementById('guidCount').value);
    const container = document.getElementById('guids-container');

    if (count < 1 || count > 100) {
        alert('Please enter a number between 1 and 100');
        return;
    }

    let html = '<div class="guid-display">';

    for (let i = 0; i < count; i++) {
        const guid = generateGUID();
        html += `
            <div class="guid-item">
                <div>${guid}</div>
                <button onclick="copyToClipboard('${guid}')" style="margin-top: 5px; padding: 4px 8px; font-size: 12px;">Copy</button>
            </div>
        `;
    }

    html += '</div>';
    container.innerHTML = html;

    // Show copy all button
    document.getElementById('copyButton').style.display = 'block';
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('GUID copied to clipboard!');
    }).catch(err => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('GUID copied to clipboard!');
    });
}

function copyAllGUIDs() {
    const guidItems = document.querySelectorAll('.guid-item div:first-child');
    let allGuids = '';

    guidItems.forEach(item => {
        allGuids += item.textContent.trim() + '\n';
    });

    copyToClipboard(allGuids.trim());
}

// Generate one GUID on page load
generateGUIDs();