function handleInput() {
    updateCharCounts();
    compareTexts();
}

function updateCharCounts() {
    const text1 = document.getElementById('text1').value;
    const text2 = document.getElementById('text2').value;

    document.getElementById('charCount1').textContent = text1.length + ' characters';
    document.getElementById('charCount2').textContent = text2.length + ' characters';
}

function compareTexts() {
    const text1 = document.getElementById('text1').value;
    const text2 = document.getElementById('text2').value;

    if (!text1.trim() && !text2.trim()) {
        document.getElementById('results').style.display = 'none';
        return;
    }

    // Show results immediately when there's content
    document.getElementById('results').style.display = 'block';

    // Generate unified diff
    const diff = generateUnifiedDiff(text1, text2);

    document.getElementById('resultStats').textContent = `${diff.lines} lines compared`;

    // Display results
    document.getElementById('comparisonResult').innerHTML = diff.html;
    document.getElementById('results').style.display = 'block';
}

function generateUnifiedDiff(text1, text2) {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');

    let html = '';
    let plainText = '';
    let added = 0;
    let removed = 0;
    let changes = 0;
    let lineCount = 0;

    // Simple line-by-line comparison
    const maxLines = Math.max(lines1.length, lines2.length);

    for (let i = 0; i < maxLines; i++) {
        const line1 = lines1[i] || '';
        const line2 = lines2[i] || '';

        let compareLine1 = line1;
        let compareLine2 = line2;

        if (compareLine1 === compareLine2) {
            // Unchanged line
            html += `<span class="unchanged">${escapeHtml(line1 || ' ')}\n</span>`;
            plainText += (line1 || ' ') + '\n';
        } else {
            if (!line1 && line2) {
                // Added line
                html += `<span class="added">+ ${escapeHtml(line2)}\n</span>`;
                plainText += '+ ' + line2 + '\n';
                added += line2.length;
                changes++;
            } else if (line1 && !line2) {
                // Removed line
                html += `<span class="removed">- ${escapeHtml(line1)}\n</span>`;
                plainText += '- ' + line1 + '\n';
                removed += line1.length;
                changes++;
            } else {
                // Modified line - show both
                html += `<span class="removed">- ${escapeHtml(line1)}\n</span>`;
                html += `<span class="added">+ ${escapeHtml(line2)}\n</span>`;
                plainText += '- ' + line1 + '\n';
                plainText += '+ ' + line2 + '\n';
                removed += line1.length;
                added += line2.length;
                changes++;
            }
        }
        lineCount++;
    }

    return {
        html,
        plainText,
        added,
        removed,
        changes,
        lines: lineCount
    };
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function clearTexts() {
    document.getElementById('text1').value = '';
    document.getElementById('text2').value = '';
    document.getElementById('results').style.display = 'none';
    updateCharCounts();
}

// Initialize
updateCharCounts();

// Sample data for demonstration
document.getElementById('text1').value = 'The quick brown fox\njumps over the lazy dog.\nThis is a test.';
document.getElementById('text2').value = 'The fast brown fox\nleaps over the sleepy dog.\nThis is a comparison test.';

// Trigger initial comparison
handleInput();