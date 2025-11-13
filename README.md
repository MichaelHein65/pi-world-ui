# Pi World UI 🍓

A modern, glass-morphic dashboard UI for Raspberry Pi 5 with real-time sensor data monitoring and LED control capabilities.

![Raspberry Pi Dashboard](https://img.shields.io/badge/Raspberry%20Pi-5-C51A4A?style=for-the-badge&logo=raspberry-pi)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## Features ✨

### 🎨 Modern Glass-Morphic Design
- Beautiful gradient background with smooth animations
- Frosted glass effect cards with backdrop blur
- Responsive design optimized for various screen sizes
- Hover effects and smooth transitions

### 📊 Real-Time Sensor Monitoring
- **CPU Temperature**: Monitor your Pi's thermal performance
- **Memory Usage**: Track RAM utilization
- **CPU Usage**: View processor load in real-time
- **Disk Usage**: Monitor storage capacity
- Visual progress bars with color gradients
- Auto-updating sensor data (2-second intervals)

### 💡 LED Control Interface
- Color picker for RGB LED control
- Brightness slider (0-100%)
- Quick preset color buttons
- Real-time LED preview with glow effects
- On/Off toggle controls

### 📈 System Information
- System uptime display
- Load average monitoring
- Network status indicator
- Last update timestamp

## Screenshots 📸

The dashboard features:
- Clean, modern interface with glass-morphic cards
- Animated gradient background
- Real-time updating sensor displays
- Interactive LED control panel

## Installation 🚀

### Prerequisites
- Raspberry Pi 5 (or any modern web browser for demo)
- Web server (optional for local hosting)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/MichaelHein65/pi-world-ui.git
   cd pi-world-ui
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html
   
   # Or use a simple HTTP server
   python3 -m http.server 8000
   # Then navigate to http://localhost:8000
   ```

### For Raspberry Pi 5 Deployment

1. **Copy files to your Pi**
   ```bash
   scp -r * pi@raspberrypi.local:~/pi-world-ui/
   ```

2. **Set up a web server (nginx example)**
   ```bash
   sudo apt update
   sudo apt install nginx
   sudo cp -r ~/pi-world-ui /var/www/html/
   ```

3. **Access the dashboard**
   Navigate to `http://raspberrypi.local/pi-world-ui` or your Pi's IP address

## Usage 💻

### Sensor Monitoring
The dashboard automatically updates sensor data every 2 seconds. Currently displays simulated data for demonstration. To connect to real sensors:

1. Create a backend API endpoint at `/api/sensors` that returns:
   ```json
   {
     "cpuTemp": 45.2,
     "memoryUsage": 67.5,
     "cpuUsage": 34.2,
     "diskUsage": 45.8
   }
   ```

2. Uncomment the fetch calls in `app.js` to connect to your API

### LED Control
1. **Select Color**: Use the color picker or click preset color buttons
2. **Adjust Brightness**: Use the slider to set intensity (0-100%)
3. **Turn On/Off**: Click the respective buttons to control the LED

To connect to real GPIO LEDs:
1. Implement a backend API endpoint at `/api/led` that accepts:
   ```json
   {
     "on": true,
     "color": "#ff0000",
     "brightness": 100
   }
   ```
2. Uncomment the LED command implementation in `app.js`

## Customization 🎨

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --glass-bg: rgba(255, 255, 255, 0.1);
    --glass-border: rgba(255, 255, 255, 0.2);
    --accent-color: #6366f1;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --danger-color: #ef4444;
}
```

### Background Gradient
Modify the gradient in `styles.css`:
```css
.background-gradient {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, ...);
}
```

### Update Intervals
Change polling frequency in `app.js`:
```javascript
// Sensor data update interval (default: 2000ms)
setInterval(() => this.updateSensorData(), 2000);

// System info update interval (default: 5000ms)
setInterval(() => this.updateSystemInfo(), 5000);
```

## File Structure 📁

```
pi-world-ui/
├── index.html          # Main HTML structure
├── styles.css          # Glass-morphic styling and animations
├── app.js             # Dashboard logic and data handling
└── README.md          # Documentation
```

## Browser Support 🌐

- Chrome/Edge (recommended) - Full support
- Firefox - Full support
- Safari - Full support
- Mobile browsers - Responsive design supported

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is open source and available under the MIT License.

## Acknowledgments 🙏

- Inspired by modern glass-morphic design trends
- Built for the Raspberry Pi community
- Uses vanilla JavaScript for maximum compatibility

## Future Enhancements 🚀

- [ ] WebSocket support for real-time updates
- [ ] Additional sensor types (humidity, pressure, etc.)
- [ ] Multi-LED control support
- [ ] Historical data charts
- [ ] Custom alert thresholds
- [ ] Dark/Light theme toggle
- [ ] PWA support for mobile installation
- [ ] Backend API implementation examples

## Support 💬

For issues, questions, or suggestions, please open an issue on GitHub.

---

Made with ❤️ for Raspberry Pi enthusiasts