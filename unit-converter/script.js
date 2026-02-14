// Unit Converter Script

// Unit definitions with conversion factors to base unit
const units = {
    length: {
        'millimeters': 0.001,
        'centimeters': 0.01,
        'meters': 1,
        'kilometers': 1000,
        'inches': 0.0254,
        'feet': 0.3048,
        'yards': 0.9144,
        'miles': 1609.344,
        'nautical miles': 1852
    },
    weight: {
        'milligrams': 0.000001,
        'grams': 0.001,
        'kilograms': 1,
        'metric tons': 1000,
        'ounces': 0.0283495,
        'pounds': 0.453592,
        'stones': 6.35029,
        'tons': 907.185
    },
    temperature: {
        'celsius': 'celsius',
        'fahrenheit': 'fahrenheit',
        'kelvin': 'kelvin'
    },
    area: {
        'square millimeters': 0.000001,
        'square centimeters': 0.0001,
        'square meters': 1,
        'square kilometers': 1000000,
        'square inches': 0.00064516,
        'square feet': 0.092903,
        'square yards': 0.836127,
        'acres': 4046.86,
        'hectares': 10000
    },
    volume: {
        'milliliters': 0.000001,
        'liters': 0.001,
        'cubic meters': 1,
        'cubic centimeters': 0.000001,
        'cubic inches': 0.000016387,
        'cubic feet': 0.0283168,
        'gallons (US)': 0.00378541,
        'gallons (UK)': 0.00454609,
        'quarts (US)': 0.000946353,
        'pints (US)': 0.000473176
    }
};

// Common conversions for quick access
const commonConversions = {
    length: [
        { from: 'meters', to: 'feet', value: 1 },
        { from: 'kilometers', to: 'miles', value: 1 },
        { from: 'centimeters', to: 'inches', value: 1 }
    ],
    weight: [
        { from: 'kilograms', to: 'pounds', value: 1 },
        { from: 'grams', to: 'ounces', value: 100 },
        { from: 'metric tons', to: 'tons', value: 1 }
    ],
    temperature: [
        { from: 'celsius', to: 'fahrenheit', value: 0 },
        { from: 'fahrenheit', to: 'celsius', value: 32 },
        { from: 'celsius', to: 'kelvin', value: 0 }
    ],
    area: [
        { from: 'square meters', to: 'square feet', value: 1 },
        { from: 'hectares', to: 'acres', value: 1 },
        { from: 'square kilometers', to: 'square miles', value: 1 }
    ],
    volume: [
        { from: 'liters', to: 'gallons (US)', value: 1 },
        { from: 'cubic meters', to: 'cubic feet', value: 1 },
        { from: 'milliliters', to: 'fluid ounces', value: 100 }
    ]
};

function updateUnits() {
    const category = document.getElementById('category').value;
    const fromSelect = document.getElementById('fromUnit');
    const toSelect = document.getElementById('toUnit');

    // Clear existing options
    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';

    // Add new options
    for (const unit in units[category]) {
        const option1 = document.createElement('option');
        option1.value = unit;
        option1.textContent = unit;
        fromSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = unit;
        option2.textContent = unit;
        toSelect.appendChild(option2);
    }

    // Set default selections
    fromSelect.value = Object.keys(units[category])[0];
    toSelect.value = Object.keys(units[category])[1];

    updateCommonConversions();
    convert();
}

function convert() {
    const category = document.getElementById('category').value;
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const outputElement = document.getElementById('outputValue');

    if (isNaN(inputValue)) {
        outputElement.value = '';
        return;
    }

    let result;

    if (category === 'temperature') {
        result = convertTemperature(inputValue, fromUnit, toUnit);
    } else {
        // Convert to base unit first, then to target unit
        const baseValue = inputValue * units[category][fromUnit];
        result = baseValue / units[category][toUnit];
    }

    outputElement.value = result.toFixed(6).replace(/\.?0+$/, '');
}

function convertTemperature(value, from, to) {
    let celsius;

    // Convert to Celsius first
    switch (from) {
        case 'celsius':
            celsius = value;
            break;
        case 'fahrenheit':
            celsius = (value - 32) * 5/9;
            break;
        case 'kelvin':
            celsius = value - 273.15;
            break;
    }

    // Convert from Celsius to target unit
    switch (to) {
        case 'celsius':
            return celsius;
        case 'fahrenheit':
            return celsius * 9/5 + 32;
        case 'kelvin':
            return celsius + 273.15;
    }
}

function swapUnits() {
    const fromSelect = document.getElementById('fromUnit');
    const toSelect = document.getElementById('toUnit');
    const inputValue = document.getElementById('inputValue');
    const outputValue = document.getElementById('outputValue');

    // Swap units
    const tempUnit = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = tempUnit;

    // Swap values
    const tempValue = inputValue.value;
    inputValue.value = outputValue.value;
    outputValue.value = tempValue;

    convert();
}

function updateCommonConversions() {
    const category = document.getElementById('category').value;
    const commonList = document.getElementById('commonList');
    commonList.innerHTML = '';

    commonConversions[category].forEach(conv => {
        const item = document.createElement('div');
        item.className = 'common-item';
        item.onclick = () => {
            document.getElementById('inputValue').value = conv.value;
            document.getElementById('fromUnit').value = conv.from;
            document.getElementById('toUnit').value = conv.to;
            convert();
        };

        const result = category === 'temperature' ?
            convertTemperature(conv.value, conv.from, conv.to) :
            (conv.value * units[category][conv.from] / units[category][conv.to]);

        item.innerHTML = `
            <div class="title">${conv.value} ${conv.from}</div>
            <div class="conversion">= ${result.toFixed(3)} ${conv.to}</div>
        `;

        commonList.appendChild(item);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateUnits();
});