document.addEventListener('DOMContentLoaded', function() {
    const urlInput = document.getElementById('urlInput');
    const portInput = document.getElementById('portInput');
    const checkConnectionButton = document.getElementById('checkConnectionButton');
    const connectionResult = document.getElementById('connectionResult');
    const getBrowserInfoButton = document.getElementById('getBrowserInfoButton');
    const browserInfo = document.getElementById('browserInfo');

    // Connection checker
    checkConnectionButton.addEventListener('click', async function() {
        const url = urlInput.value.trim();
        const port = portInput.value.trim();

        if (!url || !port) {
            connectionResult.innerHTML = '<span style="color: red;">Please enter both URL and port.</span>';
            return;
        }

        connectionResult.innerHTML = 'Checking connection...';
        
        try {
            const response = await fetch(`https://${url}:${port}`, {
                mode: 'no-cors',
                method: 'HEAD',
                timeout: 5000
            });
            connectionResult.innerHTML = '<span style="color: green;">Connection successful!</span>';
        } catch (error) {
            connectionResult.innerHTML = `<span style="color: red;">Connection failed: ${error.message}</span>`;
        }
    });

    // Browser information
    getBrowserInfoButton.addEventListener('click', async function() {
        // Get browser information
        const browserData = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            cookiesEnabled: navigator.cookieEnabled,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            colorDepth: window.screen.colorDepth,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };

        // Get IP address using a public API
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            browserData.ipAddress = data.ip;
        } catch (error) {
            browserData.ipAddress = 'Could not detect IP';
        }

        // Display the information
        browserInfo.innerHTML = `
            <strong>Browser:</strong> ${getBrowserName(browserData.userAgent)}<br>
            <strong>IP Address:</strong> ${browserData.ipAddress}<br>
            <strong>Platform:</strong> ${browserData.platform}<br>
            <strong>Language:</strong> ${browserData.language}<br>
            <strong>Screen Resolution:</strong> ${browserData.screenResolution}<br>
            <strong>Timezone:</strong> ${browserData.timezone}
        `;
    });

    // Helper function to get browser name
    function getBrowserName(userAgent) {
        if (userAgent.includes('Firefox')) return 'Firefox';
        if (userAgent.includes('Chrome')) return 'Chrome';
        if (userAgent.includes('Safari')) return 'Safari';
        if (userAgent.includes('Edge')) return 'Edge';
        if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) return 'Internet Explorer';
        return 'Unknown';
    }
});