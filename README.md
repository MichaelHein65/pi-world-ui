# Pi-World UI

Ein modernes, glasmorphes Web-Interface für die Raspberry Pi 5 mit Wetterdaten, Sensoren und LED-Steuerung.

## Features

- **Glasmorphes Design**: Modern, responsive UI mit Gradient-Hintergründen
- **Echtzeit-Sensordaten**: Temperatur und Luftdruck von der Pi
- **Wetterbild**: Aktuelle Wetterkarte von der Pi
- **Uhrfunktion**: Synchronisierte Zeit mit lokaler Tick-Optimierung
- **LED-Steuerung**: Buttons zum Ein-/Ausschalten und Effekte
- **Multi-Base-Fallback**: Unterstützt Tailscale und mDNS Verbindungen

## Struktur

- `PyWorld.html` - Hauptanwendung (aktuell aktiv)
- `Index.html` - Alternative Version
- `pi/weather.png` - Wetterbild (wird vom Sensor aktualisiert)

## Konfiguration

In `PyWorld.html` müssen die Endpunkte konfiguriert werden:

```javascript
const BASES = [
  { sensor: "http://100.66.12.52:5056", led: "http://100.66.12.52:5050" }, // Tailscale
  { sensor: "http://raspberrypi.local:5056", led: "http://raspberrypi.local:5050" } // mDNS
];
```

## Performance-Features

- Fetch mit automatischen 6s-Timeouts
- Intelligentes Base-Selection (Winner-Caching)
- Lokale Zeit-Interpolation zwischen Sensor-Polls
- Adaptive Wetterbild-Aktualisierung (30min Intervall)
- CSS-Optimierungen mit CSS-Variablen

## Browser-Kompatibilität

- Chrome/Edge 90+
- Firefox 88+
- Safari 15+
- Mobile (iOS/Android)

## Lizenz

Privat
