let timer;
let timeLeft;
let isRunning = false;
let currentSession = 'work';
let sessionCount = 0;
let completedSessions = 0;

const settings = {
    workTime: 25,
    shortBreak: 5,
    longBreak: 15,
    sessions: 4
};

function playBeep() {
    const audio = document.getElementById('sound');
    audio.currentTime = 0; // Reset to start
    audio.play().catch(e => console.log('Audio play failed:', e));
}

function loadSettings() {
    const saved = localStorage.getItem('pomodoro-settings');
    if (saved) {
        Object.assign(settings, JSON.parse(saved));
    }
    document.getElementById('work-time').value = settings.workTime;
    document.getElementById('short-break').value = settings.shortBreak;
    document.getElementById('long-break').value = settings.longBreak;
    document.getElementById('sessions').value = settings.sessions;
    resetTimer();
}

function saveSettings() {
    settings.workTime = parseInt(document.getElementById('work-time').value);
    settings.shortBreak = parseInt(document.getElementById('short-break').value);
    settings.longBreak = parseInt(document.getElementById('long-break').value);
    settings.sessions = parseInt(document.getElementById('sessions').value);
    localStorage.setItem('pomodoro-settings', JSON.stringify(settings));
    resetTimer();
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    currentSession = 'work';
    sessionCount = 0;
    timeLeft = settings.workTime * 60;
    updateDisplay();
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft <= 0) {
                nextSession();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function nextSession() {
    clearInterval(timer);
    isRunning = false;

    playBeep(); // Play sound when session changes

    if (currentSession === 'work') {
        completedSessions++;
        sessionCount++;
        if (sessionCount >= settings.sessions) {
            currentSession = 'longBreak';
            timeLeft = settings.longBreak * 60;
            sessionCount = 0;
        } else {
            currentSession = 'shortBreak';
            timeLeft = settings.shortBreak * 60;
        }
    } else {
        currentSession = 'work';
        timeLeft = settings.workTime * 60;
    }

    updateDisplay();
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('time').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    let statusText;
    if (currentSession === 'work') {
        statusText = 'Work Session';
    } else if (currentSession === 'shortBreak') {
        statusText = 'Short Break';
    } else {
        statusText = 'Long Break';
    }
    document.getElementById('status').textContent = statusText;

    const totalTime = settings[currentSession === 'work' ? 'workTime' : currentSession === 'shortBreak' ? 'shortBreak' : 'longBreak'] * 60;
    const progress = ((totalTime - timeLeft) / totalTime) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;

    document.getElementById('completed').textContent = completedSessions;
}

document.getElementById('tomato').addEventListener('click', () => {
    const today = new Date().toDateString();
    const key = 'tomato-clicks-' + today;
    let clicks = parseInt(localStorage.getItem(key) || '0');
    clicks++;
    localStorage.setItem(key, clicks.toString());
    
    if (clicks > 1) {
        window.location.href = 'https://www.youtube.com/watch?v=QDia3e12czc';
        return;
    }
    
    const tomato = document.getElementById('tomato');
    tomato.classList.add('enlarged');
    
    setTimeout(() => {
        alert('Ok, you had your fun, now go back to work before I reset the work time timer. Don\'t click the tomato again!');
        tomato.classList.remove('enlarged');
        tomato.style.transition = 'all 2s ease-in-out';
        
        setTimeout(() => {
            tomato.style.transition = '';
        }, 2000);
    }, 5000);
});

window.onload = () => {
    loadSettings();
    
    document.getElementById('start').addEventListener('click', startTimer);
    document.getElementById('pause').addEventListener('click', pauseTimer);
    document.getElementById('reset').addEventListener('click', resetTimer);
    document.getElementById('save-settings').addEventListener('click', saveSettings);
};