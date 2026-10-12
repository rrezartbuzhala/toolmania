let completionTimeout;

self.addEventListener('message', event => {
    clearTimeout(completionTimeout);

    if (event.data.type === 'start') {
        const delay = Math.max(0, event.data.endTime - Date.now());
        completionTimeout = setTimeout(() => {
            self.postMessage({ type: 'complete' });
        }, delay);
    }
});
