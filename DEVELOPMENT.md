# Developer Guide

## Projekt-Übersicht

**Pi-World UI** ist ein modernes, hochoptimiertes Glass-Morphism Dashboard für die Raspberry Pi 5.

- **Repository**: https://github.com/MichaelHein65/pi-world-ui
- **Branch**: main
- **Commits**: 10+ mit klaren Messages
- **Status**: Produktiv & optimiert ✅

## Architektur

```
PyWorld.html (468 Zeilen)
├── HTML Struktur (Semantic HTML5)
│   ├── <header> mit <h1> Title und Status-Badge
│   ├── <section> Weather Card (weather-img)
│   ├── <section> Info Row (Zeit, Temperatur)
│   └── <section> Control Buttons (<button> Elements)
├── CSS (Glass Morphism)
│   ├── CSS-Variablen für Theming
│   ├── Responsive Grid & Flexbox
│   ├── Glasmorphe Komponenten mit blur()
│   ├── Portrait Mode Media Query (max-width: 480px)
│   ├── Landscape Mode Media Query (max-width: 1024px)
│   └── Mobile-optimiert (50-600px)
└── JavaScript (State-driven)
    ├── CONFIG: Zentrale Konfiguration
    ├── State: Laufzeit-State Management
    ├── Utilities: tfetch(), pickBase()
    ├── Core Features: Time, Sensor, Weather, LED
    ├── Event Delegation: document.addEventListener()
    └── Cleanup: beforeunload Handler
```

## Konfiguration

Bearbeite diese Konstanten in PyWorld.html (Zeile ~220):

```javascript
const CONFIG = {
  bases: [
    { sensor: "http://100.66.12.52:5056", led: "http://100.66.12.52:5050" },  // Tailscale
    { sensor: "http://raspberrypi.local:5056", led: "http://raspberrypi.local:5050" }   // mDNS/LAN
  ],
  clockIdx: 5,              // LED-Effect-Index für Uhr-Modus
  sensorPollMs: 15_000,     // Sensor-Update Intervall: 15 Sekunden
  weatherPollMs: 1_800_000, // Wetter-Bild Update: 30 Minuten
  weatherRetryMs: 5_000,    // Retry bei Wetter-Fehler: 5 Sekunden
  fetchTimeoutMs: 6_000     // Fetch Timeout: 6 Sekunden (verhindert Hänger)
};
```

**Hinweis**: Die erste funktionierende Base wird gecacht und wiederverwendet für schnellere Requests.

## API Schnittstellen

### Sensor API (Sensor-Server)
```
GET /api/live-sensor
Response: {
  "pi_time": "14:23:45",
  "pi_date": "02.11.2025",
  "temperature_c": 22.5,
  "temperature": 22.5,  // Fallback
  "pressure_hpa": 1013,
  "pressure": 1013,      // Fallback
  "temp": 22.5          // Legacy Fallback
}
```

### LED API (LED-Server)
```
POST /power/0              → LED aus
POST /power/off           → LED aus (alternativ)
POST /effect/{idx}        → Effect aktivieren
POST /color/{r},{g},{b}  → Farbe setzen
```

## Entwicklung

### Lokales Testen
```bash
# HTTP-Server starten
python3 -m http.server 8000

# Öffne http://localhost:8000/PyWorld.html
```

### Browser DevTools
- **Network Tab**: Überprüfe Fetch-Requests und deren Status
- **Console Tab**: Fehler, Warnungen und Debuggen
- **Responsive Design Mode**: Teste verschiedene Bildschirmgrößen (F12 → Toggle Device Toolbar)
- **Application Tab**: State, Cookies, LocalStorage

### Testing verschiedener Geräte-Modi
```
- iPhone Portrait: 375×667px
- iPhone Landscape: 812×375px
- iPad Portrait: 768×1024px
- iPad Landscape: 1024×768px
- Desktop: 1600px+
```

### Code-Qualität
```bash
# EditorConfig Einstellungen prüfen (VS Code Extension empfohlen)
# Prettier Config verfügbar (.prettierrc)
# Quality Check durchführen
bash quality-check.sh
```

## Debugging

### Status-Badge Farben
- 🟢 Grün: Sensor OK & verbunden
- 🟡 Gelb: Initialisierung/Warnung/Laden  
- 🔴 Rot: Fehler/Offline/Unreachable

### Common Issues

**Sensor antwortet nicht:**
1. Überprüfe Netzwerk-Verbindung (WiFi/Tailscale)
2. Verifiziere IPs in `CONFIG.bases`
3. Teste: `curl http://100.66.12.52:5056/api/live-sensor`
4. Prüfe Firewall-Regeln auf Pi und lokalem Netzwerk

**Wetterbild lädt nicht:**
1. Überprüfe `/pi/weather.png` existiert auf Server
2. Prüfe Web-Server-Rechte: `ls -la pi/weather.png`
3. Browser-Cache leeren (Strg+Shift+Del)
4. DevTools Console auf Fehler prüfen

**LED-Befehle funktionieren nicht:**
1. Überprüfe LED-Server läuft: `curl -X POST http://100.66.12.52:5050/ping`
2. Versuche verschiedene Endpoints: `/power/0`, `/power/off`, `/stop`
3. Überprüfe CORS Headers auf Pi-Server
4. Prüfe Logs auf Pi: `journalctl -u led-server -n 20`

**Performance-Probleme:**
1. Netzwerk-Latenz überprüfen: DevTools → Network Tab
2. Fetch-Timeouts überprüfen (CONFIG.fetchTimeoutMs)
3. CPU/Memory auf Pi überprüfen: `htop`
4. Browser-Extensions deaktivieren (können WebSocket blockieren)

## Performance Tipps

### Browser-Caching
- Wetterbild: `?ts=` Query-String für Cache-Bypass (verhindert Caching)
- Sensor-Requests: `cache: "no-store"` wird gesetzt
- Static Assets: 30+ Minuten Cache-TTL

### Network Optimization
- 6s Timeout für Fetches (verhindert UI-Hänger)
- Automatisches Fallback auf alternative Bases (Tailscale → mDNS)
- Lokale Zeit-Interpolation zwischen Polls (smooth ticking)
- Smart Base-Selection Caching (Winner-Base)

### Memory & Cleanup
- Timer werden bei `beforeunload` gelöscht (kein Memory Leak)
- State-Objekte sind minimal und effizient
- Keine globalen Variablen im Scope
- Event Listeners via Delegation (nicht mehrfach gebunden)

## Weitere Optimierungen

### Abgeschlossene Optimierungen (v1.1)
- ✅ CSS-Cleanup & Responsive Design
- ✅ JavaScript Refactoring mit State Management
- ✅ Mobile Portrait Mode Optimierungen
- ✅ Button Design & Typography
- ✅ Accessibility Improvements (ARIA, Semantik)
- ✅ Memory-Leak Prevention & Cleanup

### Zukünftige Features (Optional)
1. **TypeScript Migration** - Type-Safety & besseres DX
2. **PWA Support** - Service Worker, Offline-Modus
3. **Data Visualization** - Historien-Graph für Sensoren
4. **Dark/Light Mode** - Intelligente Farbschema-Umschaltung
5. **Multi-Language** - i18n Support (en, de, es, etc.)
6. **Advanced LED Control** - Farbwähler, Effekt-Presets
7. **Unit System** - Temperatur (°C/°F), Druck (hPa/mb)

## Responsive Design Breakpoints

| Gerät | Breite | Höhe | Modus | Optimiert |
|-------|--------|------|-------|-----------|
| iPhone SE | 375px | 667px | Portrait | ✅ |
| iPhone 12/13 | 390px | 844px | Portrait | ✅ |
| iPhone (Landscape) | 812px | 375px | Landscape | ✅ |
| iPad Mini | 768px | 1024px | Portrait | ✅ |
| iPad (Landscape) | 1024px | 768px | Landscape | ✅ |
| Laptop | 1366px | 768px | Desktop | ✅ |
| Desktop | 1920px | 1080px | Desktop | ✅ |

## Git Workflow

```bash
# Feature Branch erstellen
git checkout -b feature/new-feature

# Änderungen committen
git add .
git commit -m "feat: Add new feature"

# Zu main pushen
git push origin feature/new-feature

# GitHub: Pull Request erstellen und mergen

# Zu main checken und pullen
git checkout main
git pull origin main
```

## File Structure

```
.
├── PyWorld.html          ← Main Application (468 Zeilen, optimiert)
├── Index.html            ← Alternative UI (Alternative Design)
├── Index Kopie.html      ← Backup (Nicht in Verwendung)
├── PyWorld Kopie.html    ← Backup (Nicht in Verwendung)
├── pi/
│   └── weather.png       ← Wetterbild (wird vom Pi aktualisiert)
├── README.md             ← GitHub Projekt-Übersicht
├── README-LOCAL.md       ← Erweiterte Dokumentation
├── OPTIMIZATIONS.md      ← Detailliertes Changelog & Metriken
├── DEVELOPMENT.md        ← Diese Datei (Developer Guide)
├── .gitignore            ← Git Ignore Rules
├── .editorconfig         ← Editor-Konfiguration (VS Code)
├── .prettierrc            ← Prettier Code-Format Config
└── quality-check.sh      ← Automated Quality Check Script
```

## Support & Fragen

Bei Fragen oder Bugs:
1. Überprüfe Browser-Console (F12 → Console Tab)
2. Überprüfe Netzwerk-Tab auf Fehler/Timeouts
3. Lese OPTIMIZATIONS.md für Details
4. Überprüfe Status-Badge für aktuelle Verbindungsstatus
5. Öffne Issue auf https://github.com/MichaelHein65/pi-world-ui

## Zusammenfassung

**Pi-World UI** ist ein hochperformantes, responsives Dashboard für die Pi 5:

✅ **Fertiggestellt:**
- Modernes Glass-Morphism Design
- Vollständig responsive (Mobile, Tablet, Desktop)
- Optimierter Code (-26% Dateigröße)
- Robuste Fehlerbehandlung & Fallback-Systeme
- Umfangreiche Dokumentation
- Production-Ready

🎯 **Letzte Änderungen:**
- Mobile Portrait Mode Optimierung (50vh → 70vh für Wetterbild)
- Button Design Verbesserung (eleganter & kompakter)
- Responsive Media Queries für alle Geräte
- Vollständige DEVELOPMENT.md Dokumentation

📊 **Projekt-Statistik:**
- 10+ Git Commits
- 468 Zeilen optimierter Code
- 100% Responsive Design
- Zero Memory Leaks
- 44+ ms Interaction to Paint (Desktop)


