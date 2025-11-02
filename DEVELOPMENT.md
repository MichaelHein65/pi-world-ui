# Developer Guide

## Architektur

```
PyWorld.html
├── HTML Struktur
│   ├── Header mit Status-Badge
│   ├── Weather Card
│   ├── Info Row (Zeit, Temperatur)
│   └── Control Buttons
├── CSS (Glass Morphism)
│   ├── CSS-Variablen für Theme
│   ├── Responsive Grid Layout
│   └── Glasmorphe Komponenten
└── JavaScript (State-driven)
    ├── CONFIG: Zentrale Konfiguration
    ├── State: Laufzeit-State
    ├── Utilities: Fetch, Base-Picking
    ├── Core Features: Time, Sensor, Weather, LED
    └── Event Handlers: Click Delegation
```

## Konfiguration

Bearbeite diese Konstanten in PyWorld.html:

```javascript
const CONFIG = {
  bases: [
    { sensor: "...", led: "..." },  // Tailscale
    { sensor: "...", led: "..." }   // mDNS/LAN
  ],
  clockIdx: 5,              // LED-Effect-Index für Uhr
  sensorPollMs: 15_000,     // Sensor-Update Intervall
  weatherPollMs: 1_800_000, // Wetter-Bild Update
  weatherRetryMs: 5_000,    // Retry bei Wetter-Fehler
  fetchTimeoutMs: 6_000     // Fetch Timeout
};
```

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
- **Network Tab**: Überprüfe Fetch-Requests
- **Console Tab**: Fehler und Warnungen
- **Application Tab**: State & Cookies (falls nötig)

## Debugging

### Status-Badge Farben
- 🟢 Grün: Sensor OK
- 🟡 Gelb: Initialisierung/Warnung  
- 🔴 Rot: Fehler/Offline

### Common Issues

**Sensor antwortet nicht:**
1. Prüfe Netzwerk-Verbindung
2. Überprüfe IPs in `CONFIG.bases`
3. Prüfe Firewall-Regeln

**Wetterbild lädt nicht:**
1. Überprüfe `/pi/weather.png` existiert
2. Prüfe Web-Server-Rechte
3. Browser-Cache clearen

**LED-Befehle funktionieren nicht:**
1. Prüfe LED-Server läuft
2. Versuche verschiedene Endpoints
3. Überprüfe CORS Headers

## Performance Tipps

### Browser-Caching
- Wetterbild: `?ts=` Query-String für Cache-Bypass
- Sensor-Requests: `cache: "no-store"` wird gesetzt
- Static Assets: 30+ Minuten cachen

### Network Optimization
- 6s Timeout für Fetches (verhindert Hänger)
- Automatisches Fallback auf alternative Bases
- Lokale Zeit-Interpolation zwischen Polls

### Memory
- Timer werden bei Seiten-Entfernen cleanup
- State-Objekte sind minimiert
- Kein globales Scope-Pollution

## Weitere Optimierungen

### Nächste Schritte (Priorität)
1. **TypeScript Migration**: Type-Safety
2. **Component-Extraction**: Reusable UI-Components
3. **State Machine**: Komplexere State-Verwaltung
4. **PWA-Support**: Offline-Funktionalität

### Nice-to-Have
- Dark/Light Mode Selector
- Historien-Graph der Sensordaten
- Konfigurable Unit-System (°F/°C)
- Multi-Language Support

## Git Workflow

```bash
# Feature Branch erstellen
git checkout -b feature/new-feature

# Änderungen committen
git add .
git commit -m "Add new feature"

# Zu main mergen
git checkout main
git merge feature/new-feature

# Zu GitHub pushen
git push origin main
```

## File Structure

```
.
├── PyWorld.html          ← Main Application
├── Index.html            ← Alternative UI
├── Index Kopie.html      ← Backup
├── PyWorld Kopie.html    ← Backup
├── pi/
│   └── weather.png       ← Weather Image
├── README.md             ← Projekt-Übersicht
├── OPTIMIZATIONS.md      ← Changelog
├── DEVELOPMENT.md        ← Diese Datei
└── .gitignore            ← Git Config
```

## Support

Bei Fragen oder Bugs:
1. Überprüfe Browser-Console (F12)
2. Überprüfe Netzwerk-Tab
3. Lese OPTIMIZATIONS.md
4. Öffne Issue auf GitHub

