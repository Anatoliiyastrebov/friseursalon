# Bildnachweise und Lizenzen (Demo-Projekt)

Diese Website ist ein Demo-Projekt für ein Portfolio. Unternehmen, Personen,
Namen, Bewertungen, Adresse, Telefonnummer und die Domain
`mirabeautylounge.de` (inkl. `hello@mirabeautylounge.de`) sind frei erfunden
und nur Platzhalter.

## Bilder (`public/images/`)

**Status: Herkunft nicht belegt.** Die Dateien enthalten keine Autoren- oder
Lizenz-Metadaten (nur ein Farbprofil). Bis die Herkunft jeder Datei
nachgewiesen ist, dürfen sie nicht als frei nutzbar gelten. Bilder werden
nicht mehr von Unsplash zur Laufzeit geladen – alle liegen lokal.

Es sind 12 verschiedene Bilder; die 6 Dateien in `instagram/` sind
Duplikate von Dateien in `gallery/`.

| Datei | Verwendet für | Quelle / Lizenz |
|---|---|---|
| `hero/salon-interior.jpg` | Hero, Open Graph | offen |
| `gallery/balayage.jpg` (= `instagram/post-1.jpg`) | Galerie, Instagram-Bereich | offen |
| `gallery/blonde-highlights.jpg` | Galerie | offen |
| `gallery/hair-color.jpg` (= `instagram/post-3.jpg`) | Galerie, Instagram-Bereich | offen |
| `gallery/salon-interior.jpg` (= `instagram/post-6.jpg`) | Galerie, Instagram-Bereich | offen |
| `gallery/soft-highlights.jpg` (= `instagram/post-5.jpg`) | Galerie, Instagram-Bereich | offen |
| `gallery/bridal-updo.jpg` (= `instagram/post-4.jpg`) | Galerie, Instagram-Bereich | offen |
| `gallery/beauty-portrait.jpg` | Galerie | offen |
| `gallery/hair-styling.jpg` (= `instagram/post-2.jpg`) | „Über uns“, Galerie, Instagram-Bereich | offen |
| `team/mira.jpg`, `team/lena.jpg`, `team/sophie.jpg`, `team/anna.jpg` | Team | offen |

**To do:** Jedes Bild per Rückwärtssuche (Google Lens, TinEye) prüfen. Ist es
bei Unsplash, Pexels oder Pixabay zu finden, Link und Lizenz in die Spalte
„Quelle / Lizenz“ eintragen. Bilder ohne nachweisbare Quelle ersetzen.

## Personenfotos

Die Team-Fotos zeigen reale Menschen (Stockfotos) und sind auf der Seite als
*Symbolbild* gekennzeichnet. Die Namen und Rollen der abgebildeten
„Mitarbeiterinnen“ sind erfunden. Die Lizenz eines Stockfotos erlaubt nicht
den Eindruck, die Person gehöre zum Unternehmen oder empfehle es. Bei einem
echten Salon: nur eigene Fotos mit Einwilligung verwenden.

## Schriften

- **Cormorant Garamond** und **DM Sans** – SIL Open Font License 1.1
  (kommerzielle Nutzung erlaubt). Eingebunden über `next/font/google`: Die
  Dateien werden beim Build heruntergeladen und vom eigenen Server
  ausgeliefert, zur Laufzeit gibt es keine Verbindung zu Google Fonts.

## Icons und Code

- **lucide-react** – ISC-Lizenz.
- Instagram-Icon (`components/ui/InstagramIcon.tsx`) – eigene, einfache
  Strichzeichnung, kein Markenlogo.
- Favicon und Apple-Icon (`app/icon.tsx`, `app/apple-icon.tsx`) – selbst
  per Code erzeugt.
- **Next.js, React, framer-motion, Tailwind CSS, OpenNext for Cloudflare** –
  MIT-Lizenz; **wrangler** – MIT OR Apache-2.0.

## Externe Inhalte

- **Google Maps** wird erst nach ausdrücklichem Klick („Karte laden“)
  eingebunden; die Zustimmung wird im Browser (`localStorage`) gespeichert.

## Was für einen echten Salon noch fehlt (nicht Teil dieser Datei)

Impressum und Datenschutzerklärung (aktuell Platzhalter-Links), echte
Bewertungen statt erfundener Texte, echte Firmendaten.
