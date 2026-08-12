(async () => {
    try {
        const response = await fetch('/api/analytics-config');
        if (!response.ok) return;

        const { measurementId } = await response.json();
        if (!/^G-[A-Z0-9]+$/i.test(measurementId)) return;

        const analyticsScript = document.createElement('script');
        analyticsScript.async = true;
        analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
        document.head.appendChild(analyticsScript);

        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag() {
            window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('config', measurementId);
    } catch (error) {
        // Analytics is optional and must never block the landing page.
    }
})();

window.trackAnalyticsEvent = (eventName) => {
    if (typeof window.gtag === 'function') {
        window.gtag('event', eventName);
    }
};
