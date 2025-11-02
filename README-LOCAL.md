# Pi-World UI

Ein modernes, hochoptimiertes Glass-Morphism Dashboard für die Raspberry Pi 5 mit Echtzeit-Sensordaten, Wetterbild und LED-Steuerung.

## 🎯 Features

- **🎨 Glass-Morphism Design**: Modernes UI mit Gradient-Hintergründen und Frosted-Glass Effekten
- **📊 Echtzeit-Sensordaten**: Live Temperatur & Luftdruck Updates
- **🌤️ Dynamisches Wetterbild**: Automatische Aktualisierung alle 30 Minuten
- **🕐 Synchronisierte Uhr**: Pi-Zeit mit lokaler Interpolation für Smooth-Ticking
- **💡 LED-Steuerung**: One-Click LED- und Effect-Management
- **🔄 Multi-Base-Fallback**: Unterstützt Tailscale & mDNS Verbindungen
- **📱 Vollständig Responsive**: Mobile-optimiert für alle Bildschirmgrößen
- **♿ Accessible**: ARIA-Labels, semantische HTML, Keyboard-Navigation

## ⚡ Performance

- **-26% Dateigröße** durch CSS/JS Optimierungen
- **6s Timeout** für Netzwerk-Anfragen (verhindert Hänger)
- **Intelligentes Base-Picking**: Fallback zwischen Verbindungen
- **Zero Memory Leaks**: Automatisches Timer-Cleanup
- **Event Delegation**: Effiziente Event-Verarbeitung

## 🚀 Quick Start

```bash
# Lokal testen
python3 -m http.server 8000

# Browser öffnen
open http://localhost:8000/PyWorld.html
```

## 📁 Struktur

```
.
├── PyWorld.html          ← Hauptanwendung (optimiert)
├── Index.html            ← Alternative UI
├── README.md             ← Diese Datei
├── OPTIMIZATIONS.md      ← Detailliertes Changelog
├── DEVELOPMENT.md        ← Developer Guide
├── pi/
│   └── weather.png       ← Wetterbild
└── .gitignore
```

## ⚙️ Konfiguration

Bearbeite die Konstanten in `PyWorld.html`:

```javascript
const CONFIG = {
  bases: [
    { sensor: "http://100.66.12.52:5056", led: "http://100.66.12.52:5050" },
    { sensor: "http://raspberrypi.local:5056", led: "http://raspberrypi.local:5050" }
  ],
  clockIdx: 5,
  sensorPollMs: 15_000,
  weatherPollMs: 1_800_000
};
```

## 📡 API Schnittstellen

### Sensor-Endpunkt
```
GET /api/live-sensor
→ { pi_time, pi_date, temperature_c, pressure_hpa }
```

### LED-Endpunkte
```
POST /power/0        → LED aus
POST /effect/{id}    → Effekt aktivieren
```

## 🌐 Browser-Unterstützung

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 90+     | ✅ |
| Firefox | 88+     | ✅ |
| Safari  | 15+     | ✅ |
| Edge    | 90+     | ✅ |
| Mobile  | Modern  | ✅ |

## 📚 Dokumentation

- **[OPTIMIZATIONS.md](OPTIMIZATIONS.md)** - Detailliertes Changelog & Performance-Metriken
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Entwickler-Guide & Architecture

## 🔍 Debugging

**Status-Badge Farben:**
- 🟢 Grün: Sensor OK
- 🟡 Gelb: Initialisierung  
- 🔴 Rot: Fehler/Offline

## 📝 Lizenz

Privat - Michaels Pi-World Project

## 🤝 Contributing

Für Verbesserungen:
1. Fork the repo
2. Feature-Branch erstellen (`git checkout -b feature/improvement`)
3. Committen (`git commit -am 'Add feature'`)
4. Pushen (`git push origin feature/improvement`)
5. Pull Request öffnen

---

**Version**: 1.1 | **Letzte Aktualisierung**: 2. Nov 2025 | **Status**: Produktiv ✅
