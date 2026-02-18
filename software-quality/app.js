// Default metrics
const defaultMetrics = [
  {
    "id": "availability",
    "name": "Availability",
    "category": "Reliability",
    "targetValue": ">= 99.9%",
    "currentValue": "",
    "status": "warning",
    "lastUpdated": null,
    "explanation": "Measure the percentage of time the system is operational and available to users. Use uptime monitoring tools like Pingdom, New Relic, or DataDog to track availability over time. Calculate as: (total uptime / total time) * 100. High availability ensures reliable service delivery.",
    "link": "https://en.wikipedia.org/wiki/High_availability"
  },
  {
    "id": "mttr",
    "name": "Mean Time To Recovery (MTTR)",
    "category": "Reliability",
    "targetValue": "< 1 hour",
    "currentValue": "",
    "status": "warning",
    "lastUpdated": null,
    "explanation": "Calculate the average time required to recover from system failures or incidents. Track all downtime events, measure the duration from failure detection to full restoration, and compute the mean. Lower MTTR indicates better incident response capabilities.",
    "link": "https://en.wikipedia.org/wiki/Mean_time_between_failures"
  },
  {
    "id": "p99_latency",
    "name": "P99 Latency",
    "category": "Performance",
    "targetValue": "< 200 ms",
    "currentValue": "",
    "status": "warning",
    "lastUpdated": null,
    "explanation": "Measure the 99th percentile response time to ensure most user requests are fast. Use load testing tools like JMeter, Artillery, or k6 to simulate traffic and collect latency data. P99 latency represents the response time that 99% of requests are faster than.",
    "link": "https://en.wikipedia.org/wiki/Latency_(engineering)"
  },
  {
    "id": "throughput",
    "name": "Throughput",
    "category": "Performance",
    "targetValue": "> 100 req/sec",
    "currentValue": "",
    "status": "warning",
    "lastUpdated": null,
    "explanation": "Determine the maximum number of requests the system can process per second. Conduct load testing with tools like JMeter or Locust to find the sustainable throughput under normal conditions. Higher throughput supports better scalability.",
    "link": "https://en.wikipedia.org/wiki/Throughput"
  },
  {
    "id": "vulnerabilities",
    "name": "Critical Vulnerabilities",
    "category": "Security",
    "targetValue": "0",
    "currentValue": "",
    "status": "warning",
    "lastUpdated": null,
    "explanation": "Count the number of critical security vulnerabilities present in the system. Perform regular security scans using tools like OWASP ZAP, Nessus, or Snyk. Zero critical vulnerabilities is ideal for maintaining a secure system.",
    "link": "https://owasp.org/www-community/Vulnerability_Scanning"
  },
  {
    "id": "patch_time",
    "name": "Time to Patch",
    "category": "Security",
    "targetValue": "< 48 hours",
    "currentValue": "",
    "status": "warning",
    "lastUpdated": null,
    "explanation": "Measure the time elapsed from vulnerability discovery to successful patch deployment. Track security advisories, patch development, testing, and rollout. Faster patching reduces exposure to known threats.",
    "link": "https://en.wikipedia.org/wiki/Security_patching"
  },
  {
    "id": "code_duplication",
    "name": "Code Duplication",
    "category": "Maintainability",
    "targetValue": "< 5%",
    "currentValue": "",
    "status": "warning",
    "lastUpdated": null,
    "explanation": "Analyze the percentage of duplicated code in the codebase. Use static analysis tools like SonarQube, PMD, or CodeClimate to detect code clones. Lower duplication improves maintainability and reduces bug introduction risks.",
    "link": "https://en.wikipedia.org/wiki/Duplicate_code"
  },
  {
    "id": "cyclomatic_complexity",
    "name": "Cyclomatic Complexity",
    "category": "Maintainability",
    "targetValue": "< 10",
    "currentValue": "",
    "status": "warning",
    "lastUpdated": null,
    "explanation": "Measure the average cyclomatic complexity of functions or methods. Use static analysis tools to calculate complexity based on decision points. Lower complexity indicates more maintainable and testable code.",
    "link": "https://en.wikipedia.org/wiki/Cyclomatic_complexity"
  },
  {
    "id": "test_coverage",
    "name": "Test Coverage",
    "category": "Testing",
    "targetValue": ">= 80%",
    "currentValue": "",
    "status": "warning",
    "lastUpdated": null,
    "explanation": "Calculate the percentage of code covered by automated tests. Use coverage tools like JaCoCo, Istanbul, or Coverage.py during test execution. Higher coverage increases confidence in code changes and reduces regression bugs.",
    "link": "https://en.wikipedia.org/wiki/Code_coverage"
  },
  {
    "id": "defect_escape_rate",
    "name": "Defect Escape Rate",
    "category": "Testing",
    "targetValue": "< 2%",
    "currentValue": "",
    "status": "warning",
    "lastUpdated": null,
    "explanation": "Track the percentage of defects that escape to production. Compare defects found post-release to total defects introduced. Lower escape rates indicate effective testing and quality assurance processes.",
    "link": "https://en.wikipedia.org/wiki/Defect_tracking"
  },
  {
    "id": "task_completion",
    "name": "Task Completion Rate",
    "category": "Usability",
    "targetValue": ">= 95%",
    "currentValue": "",
    "status": "warning",
    "lastUpdated": null,
    "explanation": "Measure the percentage of users who successfully complete key tasks. Conduct usability testing sessions and observe user interactions. Higher completion rates indicate better user experience and interface design.",
    "link": "https://en.wikipedia.org/wiki/Usability_testing"
  },
  {
    "id": "max_concurrent_users",
    "name": "Max Concurrent Users",
    "category": "Scalability",
    "targetValue": "> 10,000",
    "currentValue": "",
    "status": "warning",
    "lastUpdated": null,
    "explanation": "Determine the maximum number of concurrent users the system can support before performance degrades. Use load testing tools to gradually increase user load and monitor system behavior. Higher concurrent user capacity supports business growth.",
    "link": "https://en.wikipedia.org/wiki/Load_testing"
  }
];

// Storage module
function loadData() {
  const data = localStorage.getItem('softwareQualityData');
  return data ? JSON.parse(data) : { scopes: {}, activeScope: null };
}

function saveData(data) {
  localStorage.setItem('softwareQualityData', JSON.stringify(data));
}

// State management
let data = loadData();

function getActiveScope() {
  return data.activeScope;
}

function setActiveScope(scope) {
  data.activeScope = scope;
  saveData(data);
}

// Scope functions
function addScope(name) {
  if (!data.scopes[name]) {
    data.scopes[name] = { metrics: defaultMetrics.map(m => ({ ...m, id: generateId() })) };
    if (!data.activeScope) {
      setActiveScope(name);
    }
    saveData(data);
  }
}

function deleteScope(name) {
  if (data.scopes[name]) {
    delete data.scopes[name];
    if (data.activeScope === name) {
      const keys = Object.keys(data.scopes);
      data.activeScope = keys.length > 0 ? keys[0] : null;
      saveData(data);
    }
  }
}

// Metric functions
function generateId() {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

function addMetric(scope, metric) {
  if (data.scopes[scope]) {
    metric.status = evaluateStatus(metric);
    metric.lastUpdated = new Date().toISOString();
    data.scopes[scope].metrics.push(metric);
    saveData(data);
  }
}

function updateMetric(scope, id, updates) {
  if (data.scopes[scope]) {
    const metric = data.scopes[scope].metrics.find(m => m.id === id);
    if (metric) {
      Object.assign(metric, updates);
      metric.status = evaluateStatus(metric);
      metric.lastUpdated = new Date().toISOString();
      saveData(data);
    }
  }
}

function deleteMetric(scope, id) {
  if (data.scopes[scope]) {
    data.scopes[scope].metrics = data.scopes[scope].metrics.filter(m => m.id !== id);
    saveData(data);
  }
}

function evaluateStatus(metric) {
  if (!metric.currentValue || metric.currentValue.trim() === '') return 'warning';
  const target = metric.targetValue;
  const currentStr = metric.currentValue.trim();
  let current;
  if (target.includes('%')) {
    current = parseFloat(currentStr);
  } else if (target.includes('hour') || target.includes('ms') || target.includes('req/sec') || target.includes('hours')) {
    current = parseFloat(currentStr);
  } else {
    current = parseFloat(currentStr);
  }
  if (isNaN(current)) return 'warning';

  if (target.startsWith('>= ')) {
    const val = parseFloat(target.slice(3));
    return current >= val ? 'pass' : 'fail';
  } else if (target.startsWith('< ')) {
    const val = parseFloat(target.slice(2));
    return current < val ? 'pass' : 'fail';
  } else if (target.startsWith('> ')) {
    const val = parseFloat(target.slice(2));
    return current > val ? 'pass' : 'fail';
  } else if (target === '0') {
    return current == 0 ? 'pass' : 'fail';
  } else {
    return 'warning';
  }
}

// UI rendering
function renderScopes() {
  const selector = document.getElementById('scope-selector');
  selector.innerHTML = '';
  Object.keys(data.scopes).forEach(scope => {
    const option = document.createElement('option');
    option.value = scope;
    option.textContent = scope;
    if (scope === data.activeScope) option.selected = true;
    selector.appendChild(option);
  });
  document.getElementById('active-scope').textContent = data.activeScope || 'None';
}

function renderMetrics() {
  const tbody = document.getElementById('metrics-body');
  const active = getActiveScope();
  if (!active || !data.scopes[active]) {
    tbody.innerHTML = '<tr><td colspan="6">No active scope selected or no metrics available.</td></tr>';
    return;
  }
  const filter = document.getElementById('category-filter').value;
  const metrics = data.scopes[active].metrics.filter(m => !filter || m.category === filter);
  tbody.innerHTML = '';
  metrics.forEach(metric => {
    const row = document.createElement('tr');
    row.className = 'metric-row';
    row.innerHTML = `
      <td>${metric.name}</td>
      <td>${metric.category}</td>
      <td>${metric.targetValue}</td>
      <td contenteditable="true" data-id="${metric.id}">${metric.currentValue}</td>
      <td><span class="status ${metric.status}">${metric.status.toUpperCase()}</span></td>
      <td>
        <button class="info-btn" data-id="${metric.id}">How to Test</button>
        <button class="delete-btn" data-id="${metric.id}">Delete</button>
      </td>
    `;
    tbody.appendChild(row);

    // Add explanation row
    const explanationRow = document.createElement('tr');
    explanationRow.className = 'explanation-row';
    explanationRow.style.display = 'none';
    const expl = { explanation: metric.explanation || 'No explanation available.', link: metric.link || '' };
    const linkHtml = expl.link ? `<a href="${expl.link}" target="_blank">Learn more</a>` : '';
    explanationRow.innerHTML = `
      <td colspan="6">
        <p>${expl.explanation}</p>
        ${linkHtml}
      </td>
    `;
    tbody.appendChild(explanationRow);
  });
}

function renderDashboard() {
  const active = getActiveScope();
  if (!active || !data.scopes[active]) {
    document.getElementById('completion').textContent = '0';
    document.getElementById('failing').textContent = '0';
    document.getElementById('total').textContent = '0';
    return;
  }
  const metrics = data.scopes[active].metrics;
  const total = metrics.length;
  const pass = metrics.filter(m => m.status === 'pass').length;
  const fail = metrics.filter(m => m.status === 'fail').length;
  document.getElementById('completion').textContent = total > 0 ? Math.round((pass / total) * 100) : 0;
  document.getElementById('failing').textContent = fail;
  document.getElementById('total').textContent = total;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  if (Object.keys(data.scopes).length === 0) {
    addScope('demo-scope');
  }
  renderScopes();
  renderMetrics();
  renderDashboard();
});

document.getElementById('scope-selector').addEventListener('change', (e) => {
  setActiveScope(e.target.value);
  renderScopes();
  renderMetrics();
  renderDashboard();
});

document.getElementById('add-scope').addEventListener('click', () => {
  const input = document.getElementById('new-scope-name');
  const name = input.value.trim();
  if (name) {
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    addScope(slug);
    renderScopes();
    renderMetrics();
    renderDashboard();
    input.value = '';
  }
});

document.getElementById('delete-scope').addEventListener('click', () => {
  const active = getActiveScope();
  if (active && confirm(`Delete scope "${active}"?`)) {
    deleteScope(active);
    renderScopes();
    renderMetrics();
    renderDashboard();
  }
});

document.getElementById('add-metric-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const active = getActiveScope();
  if (!active) {
    alert('Please select a scope first.');
    return;
  }
  const explanation = formData.get('explanation') || 'Please provide testing instructions for this custom metric.';
  const link = formData.get('link') || '';
  const metric = {
    id: generateId(),
    name: formData.get('name'),
    category: formData.get('category'),
    targetValue: formData.get('targetValue'),
    currentValue: '',
    status: 'warning',
    lastUpdated: new Date().toISOString(),
    explanation: explanation,
    link: link
  };
  addMetric(active, metric);
  renderMetrics();
  renderDashboard();
  form.reset();
});

document.getElementById('category-filter').addEventListener('change', renderMetrics);

document.getElementById('metrics-body').addEventListener('blur', (e) => {
  if (e.target.contentEditable === 'true') {
    const id = e.target.dataset.id;
    const value = e.target.textContent.trim();
    const active = getActiveScope();
    updateMetric(active, id, { currentValue: value });
    renderMetrics();
    renderDashboard();
  }
}, true);

document.getElementById('metrics-body').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.dataset.id;
    const active = getActiveScope();
    if (confirm('Delete this metric?')) {
      deleteMetric(active, id);
      renderMetrics();
      renderDashboard();
    }
  } else if (e.target.classList.contains('info-btn')) {
    const row = e.target.closest('tr');
    const nextRow = row.nextElementSibling;
    nextRow.style.display = nextRow.style.display === 'none' ? 'table-row' : 'none';
  }
});