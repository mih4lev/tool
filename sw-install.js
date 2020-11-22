const updateTimeout = 1000;

// Service Worker
const registerSW = async () => {
    try {
        let isFirstTime = !navigator['serviceWorker'].controller, isUpdateCall = false;
        const registration = await navigator['serviceWorker'].register(`/service-worker.js`);
        // request updates every 15 seconds
        setInterval(() => registration.update(), updateTimeout);
        registration.addEventListener(`updatefound`, () => {
            registration.installing.addEventListener(`statechange`, () => {
                const { waiting } = registration;
                if (!waiting || isUpdateCall) return false;
                if (isFirstTime) return isFirstTime = false;
                // Install SW && show update message
                isUpdateCall = true;
                waiting.postMessage(`SKIP_WAITING`);
                setTimeout(() => isUpdateCall = false, 100);
                document.dispatchEvent(new CustomEvent(`APP_UPDATE`));
            });
        });
    } catch (error) {
        console.log(error);
    }
};
if (navigator['serviceWorker']) registerSW();