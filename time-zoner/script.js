const baseTimezoneSelect = document.getElementById('base-timezone');
const baseHourInput = document.getElementById('base-hour');
const baseMinuteInput = document.getElementById('base-minute');
const timezonesContainer = document.getElementById('timezones');

const timezones = [
    { name: 'UTC', tz: 'UTC' },
    { name: 'Eastern Time', tz: 'America/New_York' },
    { name: 'Central Time', tz: 'America/Chicago' },
    { name: 'Mountain Time', tz: 'America/Denver' },
    { name: 'Pacific Time', tz: 'America/Los_Angeles' },
    { name: 'London', tz: 'Europe/London' },
    { name: 'Paris', tz: 'Europe/Paris' },
    { name: 'Tokyo', tz: 'Asia/Tokyo' },
    { name: 'Sydney', tz: 'Australia/Sydney' }
];

function updateTimezones() {
    const baseTz = baseTimezoneSelect.value;
    const baseHour = parseInt(baseHourInput.value) || 0;
    const baseMinute = parseInt(baseMinuteInput.value) || 0;

    // Create a date in the base timezone at the selected time
    const now = new Date();
    const baseDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), baseHour, baseMinute, 0);

    timezonesContainer.innerHTML = '';

    timezones.forEach(tz => {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: tz.tz,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        const timeString = formatter.format(baseDate);

        const card = document.createElement('div');
        card.className = 'timezone-card';
        card.innerHTML = `
            <div class="timezone-name">${tz.name}</div>
            <div class="timezone-time">${timeString}</div>
        `;
        timezonesContainer.appendChild(card);
    });
}

baseHourInput.addEventListener('input', updateTimezones);
baseMinuteInput.addEventListener('input', updateTimezones);
baseTimezoneSelect.addEventListener('change', updateTimezones);

// Initial update
updateTimezones();