class SchengenTracker {
    constructor() {
        this.visits = this.loadVisits();
        this.init();
    }

    init() {
        this.updateStatus();
        this.renderVisits();
        this.setupEventListeners();
    }

    loadVisits() {
        const visits = localStorage.getItem('schengen-visits-tracker-visits');
        let parsedVisits = visits ? JSON.parse(visits) : [];

        // Migrate old data format to include planned property
        parsedVisits = parsedVisits.map(visit => ({
            ...visit,
            planned: visit.planned || false
        }));

        return parsedVisits;
    }

    saveVisits() {
        localStorage.setItem('schengen-visits-tracker-visits', JSON.stringify(this.visits));
    }

    calculateDaysSpentInPeriod(startDate, endDate) {
        // Calculate total days spent in Schengen between startDate and endDate
        // Only count past visits, not planned ones
        let totalDays = 0;

        this.visits.forEach(visit => {
            // Skip planned visits
            if (visit.planned) return;

            const entry = new Date(visit.entry);
            const exit = new Date(visit.exit);

            // Find overlap between visit period and the 180-day window
            const overlapStart = new Date(Math.max(startDate.getTime(), entry.getTime()));
            const overlapEnd = new Date(Math.min(endDate.getTime(), exit.getTime()));

            if (overlapStart <= overlapEnd) {
                // Count days inclusive
                const days = Math.ceil((overlapEnd - overlapStart) / (1000 * 60 * 60 * 24)) + 1;
                totalDays += days;
            }
        });

        return totalDays;
    }

    getCurrentStatus() {
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - 180);

        const daysUsed = this.calculateDaysSpentInPeriod(startDate, today);
        const daysRemaining = Math.max(0, 90 - daysUsed);
        const isValid = daysUsed <= 90;

        return { daysUsed, daysRemaining, isValid };
    }

    addVisit(entryDate, exitDate) {
        const entry = new Date(entryDate);
        const exit = new Date(exitDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison

        // Automatically determine if this is a planned visit based on entry date
        const isPlanned = entry > today;

        if (entry > exit) {
            alert('Exit date must be after entry date');
            return false;
        }

        // For planned visits, we don't check the 90/180 rule
        if (!isPlanned) {
            // Check if this visit would violate the rule
            const tempVisits = [...this.visits, { entry: entryDate, exit: exitDate, planned: false }];
            const originalVisits = this.visits;
            this.visits = tempVisits;

            const status = this.getCurrentStatus();
            this.visits = originalVisits;

            if (!status.isValid) {
                alert('Adding this visit would violate the 90/180 rule!');
                return false;
            }
        }

        this.visits.push({ entry: entryDate, exit: exitDate, planned: isPlanned });
        this.visits.sort((a, b) => new Date(a.entry) - new Date(b.entry));
        this.saveVisits();
        this.updateStatus();
        this.renderVisits();
        return true;
    }

    deleteVisit(index) {
        this.visits.splice(index, 1);
        this.saveVisits();
        this.updateStatus();
        this.renderVisits();
    }

    updateStatus() {
        const status = this.getCurrentStatus();
        document.getElementById('daysUsed').textContent = status.daysUsed;
        document.getElementById('daysRemaining').textContent = status.daysRemaining;

        const indicator = document.getElementById('statusIndicator');
        indicator.textContent = status.isValid ? 'Valid' : 'Invalid';
        indicator.className = status.isValid ? 'status-indicator valid' : 'status-indicator invalid';
    }

    renderVisits() {
        const pastList = document.getElementById('pastVisitsList');
        const plannedList = document.getElementById('plannedVisitsList');

        pastList.innerHTML = '';
        plannedList.innerHTML = '';

        const pastVisits = this.visits.filter(visit => !visit.planned);
        const plannedVisits = this.visits.filter(visit => visit.planned);

        // Render past visits
        if (pastVisits.length === 0) {
            pastList.innerHTML = '<li class="empty-message">No past visits recorded yet.</li>';
        } else {
            pastVisits.forEach((visit, originalIndex) => {
                const actualIndex = this.visits.findIndex(v => v === visit);
                const li = this.createVisitElement(visit, actualIndex, false);
                pastList.appendChild(li);
            });
        }

        // Render planned visits
        if (plannedVisits.length === 0) {
            plannedList.innerHTML = '<li class="empty-message">No planned visits.</li>';
        } else {
            plannedVisits.forEach((visit, originalIndex) => {
                const actualIndex = this.visits.findIndex(v => v === visit);
                const li = this.createVisitElement(visit, actualIndex, true);
                plannedList.appendChild(li);
            });
        }
    }

    createVisitElement(visit, index, isPlanned) {
        const li = document.createElement('li');
        li.className = `visit-item ${isPlanned ? 'planned' : 'past'}`;

        const entry = new Date(visit.entry);
        const exit = new Date(visit.exit);
        const duration = Math.ceil((exit - entry) / (1000 * 60 * 60 * 24)) + 1;

        li.innerHTML = `
            <div>
                <div class="visit-dates">${this.formatDate(entry)} - ${this.formatDate(exit)}</div>
                <div class="visit-duration">${duration} days</div>
            </div>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;

        return li;
    }

    formatDate(date) {
        return date.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    setupEventListeners() {
        const form = document.getElementById('visitForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const entryDate = document.getElementById('entryDate').value;
            const exitDate = document.getElementById('exitDate').value;

            if (this.addVisit(entryDate, exitDate)) {
                form.reset();
            }
        });

        // Handle both past and planned visits lists
        document.getElementById('pastVisitsList').addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) {
                const index = parseInt(e.target.dataset.index);
                if (confirm('Are you sure you want to delete this past visit?')) {
                    this.deleteVisit(index);
                }
            }
        });

        document.getElementById('plannedVisitsList').addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) {
                const index = parseInt(e.target.dataset.index);
                if (confirm('Are you sure you want to delete this planned visit?')) {
                    this.deleteVisit(index);
                }
            }
        });
    }
}

// Initialize the tracker when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SchengenTracker();
});