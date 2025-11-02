// Simulated sensor data for demonstration
// In a real Raspberry Pi 5 environment, this would connect to actual GPIO and system sensors

class PiWorldDashboard {
    constructor() {
        this.ledState = {
            on: false,
            color: '#ff0000',
            brightness: 100
        };
        
        this.init();
    }

    init() {
        // Initialize LED controls
        this.setupLEDControls();
        
        // Start sensor data updates
        this.updateSensorData();
        setInterval(() => this.updateSensorData(), 2000); // Update every 2 seconds
        
        // Update system info
        this.updateSystemInfo();
        setInterval(() => this.updateSystemInfo(), 5000); // Update every 5 seconds
    }

    setupLEDControls() {
        const colorInput = document.getElementById('led-color');
        const brightnessInput = document.getElementById('led-brightness');
        const brightnessValue = document.getElementById('brightness-value');
        const ledPreview = document.getElementById('led-preview');
        const ledOnBtn = document.getElementById('led-on');
        const ledOffBtn = document.getElementById('led-off');
        const presetButtons = document.querySelectorAll('.color-preset');

        // Color picker
        colorInput.addEventListener('input', (e) => {
            this.ledState.color = e.target.value;
            this.updateLEDPreview();
        });

        // Brightness slider
        brightnessInput.addEventListener('input', (e) => {
            this.ledState.brightness = parseInt(e.target.value);
            brightnessValue.textContent = `${this.ledState.brightness}%`;
            this.updateLEDPreview();
        });

        // LED On/Off buttons
        ledOnBtn.addEventListener('click', () => {
            this.ledState.on = true;
            this.updateLEDPreview();
            this.sendLEDCommand('on');
        });

        ledOffBtn.addEventListener('click', () => {
            this.ledState.on = false;
            this.updateLEDPreview();
            this.sendLEDCommand('off');
        });

        // Preset color buttons
        presetButtons.forEach(button => {
            button.addEventListener('click', () => {
                const color = button.dataset.color;
                this.ledState.color = color;
                colorInput.value = color;
                this.updateLEDPreview();
            });
        });

        // Initial preview update
        this.updateLEDPreview();
    }

    updateLEDPreview() {
        const ledPreview = document.getElementById('led-preview');
        
        if (this.ledState.on) {
            const opacity = this.ledState.brightness / 100;
            ledPreview.style.background = this.ledState.color;
            ledPreview.style.opacity = opacity;
            ledPreview.style.boxShadow = `0 0 30px ${this.hexToRgba(this.ledState.color, 0.6)}, 
                                           0 0 60px ${this.hexToRgba(this.ledState.color, 0.4)}`;
        } else {
            ledPreview.style.background = '#333333';
            ledPreview.style.opacity = 0.3;
            ledPreview.style.boxShadow = 'none';
        }
    }

    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    sendLEDCommand(command) {
        // In a real implementation, this would send commands to the Raspberry Pi GPIO
        console.log(`LED Command: ${command}`, this.ledState);
        
        // Simulate API call
        // fetch('/api/led', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(this.ledState)
        // });
    }

    updateSensorData() {
        // Simulate sensor data
        // In real implementation, this would fetch from Raspberry Pi sensors
        
        // CPU Temperature (30-75°C range)
        const cpuTemp = this.generateRandomValue(35, 75);
        document.getElementById('cpu-temp').textContent = `${cpuTemp.toFixed(1)}°C`;
        this.updateBar('cpu-temp-bar', cpuTemp, 30, 75);

        // Memory Usage (0-100%)
        const memoryUsage = this.generateRandomValue(20, 80);
        document.getElementById('memory-usage').textContent = `${memoryUsage.toFixed(0)}%`;
        this.updateBar('memory-bar', memoryUsage, 0, 100);

        // CPU Usage (0-100%)
        const cpuUsage = this.generateRandomValue(10, 70);
        document.getElementById('cpu-usage').textContent = `${cpuUsage.toFixed(0)}%`;
        this.updateBar('cpu-bar', cpuUsage, 0, 100);

        // Disk Usage (0-100%)
        const diskUsage = this.generateRandomValue(30, 60);
        document.getElementById('disk-usage').textContent = `${diskUsage.toFixed(0)}%`;
        this.updateBar('disk-bar', diskUsage, 0, 100);

        // In real implementation:
        // fetch('/api/sensors')
        //     .then(response => response.json())
        //     .then(data => {
        //         document.getElementById('cpu-temp').textContent = `${data.cpuTemp}°C`;
        //         // ... update other sensors
        //     });
    }

    updateBar(barId, value, min, max) {
        const percentage = ((value - min) / (max - min)) * 100;
        const bar = document.getElementById(barId);
        bar.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
    }

    generateRandomValue(min, max) {
        // Add some variance to make it look realistic
        if (!this.lastValues) this.lastValues = {};
        if (!this.lastValues[`${min}-${max}`]) {
            this.lastValues[`${min}-${max}`] = (min + max) / 2;
        }
        
        const lastValue = this.lastValues[`${min}-${max}`];
        const change = (Math.random() - 0.5) * 5; // Small random change
        const newValue = Math.max(min, Math.min(max, lastValue + change));
        this.lastValues[`${min}-${max}`] = newValue;
        
        return newValue;
    }

    updateSystemInfo() {
        // Update uptime
        const uptime = this.formatUptime(Math.floor(Math.random() * 86400));
        document.getElementById('uptime').textContent = uptime;

        // Update load average
        const load1 = (Math.random() * 2).toFixed(2);
        const load5 = (Math.random() * 2).toFixed(2);
        const load15 = (Math.random() * 2).toFixed(2);
        document.getElementById('load-avg').textContent = `${load1}, ${load5}, ${load15}`;

        // Update last update time
        const now = new Date();
        document.getElementById('last-update').textContent = now.toLocaleTimeString();

        // In real implementation:
        // fetch('/api/system')
        //     .then(response => response.json())
        //     .then(data => {
        //         document.getElementById('uptime').textContent = data.uptime;
        //         // ... update other system info
        //     });
    }

    formatUptime(seconds) {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        
        if (days > 0) {
            return `${days}d ${hours}h ${minutes}m`;
        } else if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else {
            return `${minutes}m`;
        }
    }
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PiWorldDashboard();
    console.log('Pi World Dashboard initialized');
});
