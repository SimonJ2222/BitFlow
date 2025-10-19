# Common Playground - Software Requirements Specification 

## Table of contents
- [Table of contents](#table-of-contents)
- [Introduction](#1-introduction)
    - [Purpose](#11-purpose)
    - [Scope](#12-scope)
    - [Definitions, Acronyms and Abbreviations](#13-definitions-acronyms-and-abbreviations)
    - [References](#14-references)
    - [Overview](#15-overview)
- [Overall Description](#2-overall-description)
    - [Vision](#21-vision)
    - [Use Case Diagram](#22-use-case-diagram)
	- [Technology Stack](#23-technology-stack)
- [Specific Requirements](#3-specific-requirements)
    - [Functionality](#31-functionality)
    - [Usability](#32-usability)
    - [Reliability](#33-reliability)
    - [Performance](#34-performance)
    - [Supportability](#35-supportability)
    - [Design Constraints](#36-design-constraints)
    - [Online User Documentation and Help System Requirements](#37-on-line-user-documentation-and-help-system-requirements)
    - [Purchased Components](#purchased-components)
    - [Interfaces](#39-interfaces)
    - [Licensing Requirements](#310-licensing-requirements)
    - [Legal, Copyright And Other Notices](#311-legal-copyright-and-other-notices)
    - [Applicable Standards](#312-applicable-standards)
- [Supporting Information](#4-supporting-information)

## 1. Introduction

### 1.1 Purpose
Dieses Dokument beschreibt die grundlegenden Ziele, die Vision und den technologischen Aufbau der Webanwendung BitFlow.
BitFlow ist eine browserbasierte Simulationsplattform für logische Schaltungen, die es Nutzer*innen ermöglicht, digitale Logiksysteme visuell zu entwerfen, zu simulieren und zu speichern. 
Ziel dieses Projekts ist es, eine moderne und intuitive Alternative zu klassischen Desktop-Simulationstools wie Logi(k)sim zu schaffen.

### 1.2 Scope
Das Projekt wird als Webanwendung realisiert, die vollständig im Browser lauffähig ist. Damit wird die Installation zusätzlicher Software überflüssig und eine plattformunabhängige Nutzung ermöglicht.

Geplante Teilsysteme sind: 
Benutzerverwaltung:
Benutzer*innen können sich registrieren, anmelden und ihre persönlichen Profildaten verwalten. 
Außerdem besteht die Möglichkeit, Passwörter zurückzusetzen oder den eigenen Account zu löschen.
Alle benutzerbeozgenen Daten werden sicher in der Datenbank gespeichert.

Projekt- und Schaltungsmanagement:
Benutzer*innen können neue Schaltungen oder Projekte erstellen, speichern, laden und löschen.
Zudem besteht die Möglichkeit, Schaltungen zu importieren oder zu exportieren.

Editor / Arbeitsfläche:
Der Editor bildet den zentralen Bestandteil der Benutzeroberfläche.
Logikgatter (z.B. AND, OR) können per Drag & Drop platziert, verbunden und bearbeitet werden.
Funktionen wie Kopieren, Löschen oder Rückgängig/Wiederholen (Undo/Redo) erleichtern die Bearbeitung.

Benutzerdefinierte Bausteine:
Erstellte Schaltungen können zu neuen, wiederverwendbaren Bauteilen zusammengefasst werden.
Diese Benutzerdefinierten Komponenten lassen sich speichern und in anderen Projekten erneut verwenden.

Simulation und Visualisierung:
Die Anwendung bietet eine Echtzeit-Simulation, die das Verhalten der Schaltung direkt visualisiert.
Signalzustände von Schaltern, LEDs und Anzeigen werden dabei dynamisch dargestellt.

System und Benutzeroberfläche:
Das System bietet ein modernes, responsives Design mit umschaltbarem Dark- und Light-Mode.
Hilfetexte, Tooltips und Bestätigungsdialoge unterstützen die Bedienung.

### 1.3 Definitions, Acronyms and Abbreviations
| Abbrevation | Explanation                            |
| ----------- | -------------------------------------- |
| SRS         | Software Requirements Specification    |
| UC          | Use Case                               |
| n/a         | not applicable                         |
| tbd         | to be determined                       |
| UCD         | overall Use Case Diagram               |
| FAQ         | Frequently asked Questions             |

### 1.4 References

| Title                                                              | Date       | Publishing organization   |
| -------------------------------------------------------------------|:----------:| ------------------------- |
| [BitFlow-Blog](https://github.com/SimonJ2222/BitFlow/discussions)  | | |


### 1.5 Overview
TODO

## 2. Overall Description

### 2.1 Vision
BitFlow soll eine moderne, leicht zugängliche und plattformunabhängige Lösung für die Simulation digitaler Logikschaltungen bieten.
Während bestehende Programme wie "Logi(k)sim" nur lokal installiert werden können und oft eine veraltete Benutzeroberfläche besitzen, ermöglicht BitFlow die Simulation direkt im Browser, ohne Installation, auf jedem Gerät und Betriebssystem.

Ziel der Anwendung ist es, das Verständnis digitaler Logik und Schaltungstechnik zu fördern.
Studierende, Lehrkräfte und Technikinteressierte sollen Logikgatter, Schaltungen und Signale intuitiv und visuell erkunden können.

### 2.2 Use Case Diagram
<img width="2686" height="3451" alt="UseCaseDiagramm_BitFlow" src="https://github.com/user-attachments/assets/039a5b8d-69ab-4674-ba08-8f26e407d0d1" />


### 2.3 Technology Stack
The technology we use is:

Backend:
- **Programmiersprache:** C#  
- **Framework:** ASP.NET Core Web API  
- **API-Tests:** Postman

Frontend:
- **Programmiersprache:** TypeScript  
- **Framework:** React mit Vite  
- **CSS-Framework:** Tailwind CSS  

IDE:
Visual Studio Code & WebStorm

Project Management:
-YouTrack
-GitHub

Deployment (geplant):
- Webhosting über GitHub Pages oder einen ASP.NET-kompatiblen Webserver 

Testing:
- **Unit-Tests:** Jest (Frontend), xUnit (Backend)  
- **Manuelle Tests:** Browserbasierte Oberflächentests  
- **API-Tests:** Postman  

## 3. Specific Requirements

### 3.1 Functionality
#### 3.3.1 UC-01 – Dark Mode einstellen
- **Akteure:** Benutzer  
- **Ziel:** Benutzer möchte das Erscheinungsbild der Webanwendung anpassen, um die Nutzung in dunkler Umgebung zu erleichtern.  
- **Voraussetzungen:** Benutzer ist eingeloggt oder nutzt die Anwendung im Gastmodus.  
- **Auslöser:** Benutzer klickt auf das Einstellungsmenü und aktiviert den Schalter „Dark Mode“.  
- **Hauptablauf:**
	1. Benutzer öffnet das Einstellungsmenü.
	2. Benutzer wählt „Darstellung → Dark Mode“.
	3. System speichert die Einstellung lokal (im Browser-Storage oder Benutzerprofil).
	4. UI wechselt sofort zur dunklen Farbpalette.
- **Alternativabläufe:**  
	- 3a. Wenn Browser LocalStorage deaktiviert: Einstellung wird nur temporär gespeichert.
- **Nachbedingungen:** Oberfläche wird dauerhaft im gewählten Modus angezeigt.  
- **Akzeptanzkriterien:** Farbwechsel erfolgt flüssig; Einstellung bleibt beim nächsten Start erhalten.


#### 3.3.2 UC-02 – Änderungen rückgängig machen
- **Akteure:** Benutzer  
- **Ziel:** Benutzer möchte versehentliche Aktionen im Schaltplan rückgängig machen.  
- **Voraussetzungen:** Es existiert mindestens eine Aktion im Verlauf.  
- **Auslöser:** Benutzer drückt `Ctrl+Z` oder klickt auf „Rückgängig“.  
- **Hauptablauf:**
	1. Benutzer führt Aktionen im Canvas aus.
	2. System speichert jede Aktion in einem Undo-Stack.
	3. Benutzer löst „Undo“ aus.
	4. System stellt vorherigen Zustand des Canvas wieder her.
- **Alternativabläufe:**  
	- 2a. Kein Undo-Verlauf vorhanden → System zeigt Hinweis „Keine Änderungen rückgängig zu machen“.  
- **Nachbedingungen:** Letzte Änderung ist rückgängig gemacht.  
- **Akzeptanzkriterien:** Alle Aktionen (z. B. Baustein verschieben, Leitung löschen) lassen sich rückgängig machen.


#### 3.3.3 UC-03 – Projektdatei löschen
- **Akteure:** Benutzer  
- **Ziel:** Ein bestehendes Projekt soll dauerhaft entfernt werden.  
- **Voraussetzungen:** Benutzer ist eingeloggt und hat Schreibrechte auf das Projekt.  
- **Auslöser:** Benutzer wählt im Projektmanager „Löschen“.  
- **Hauptablauf:**
	1. System zeigt Sicherheitsabfrage an.
	2. Benutzer bestätigt Löschung.
	3. System entfernt Projektdatei aus Cloud- oder LocalStorage.
	4. System aktualisiert Projektliste.  
- **Alternativabläufe:**  
	- 2a. Benutzer bricht ab → Aktion wird verworfen.  
- **Nachbedingungen:** Projektdatei ist gelöscht.  
- **Akzeptanzkriterien:** Gelöschte Datei taucht nicht mehr im Projektmanager auf.


#### 3.3.4 UC-04 – Schaltung zu Baustein zusammenfassen
- **Akteure:** Benutzer  
- **Ziel:** Eine bestehende Schaltung soll als wiederverwendbarer Baustein gespeichert werden.  
- **Voraussetzungen:** Schaltung ist vollständig und fehlerfrei.  
- **Auslöser:** Benutzer klickt auf „Als Baustein speichern“.  
- **Hauptablauf:**
	1. Benutzer markiert relevante Schaltungsteile.
	2. System öffnet Dialog „Neuer Logikbaustein“.
	3. Benutzer vergibt Name, Symbol, Beschreibung.
	4. System erstellt Metadatei und speichert Baustein in der Bibliothek.
- **Alternativabläufe:**  
	- 1a. Schaltung enthält unverbundene Pins → Warnung und Möglichkeit zur Korrektur.  
- **Nachbedingungen:** Neuer Baustein steht in der Bibliothek zur Verfügung.  
- **Akzeptanzkriterien:** Baustein kann im nächsten Projekt per Drag & Drop verwendet werden.


#### 3.3.5 UC-05 – Schaltung exportieren
- **Akteure:** Benutzer  
- **Ziel:** Schaltung in externes Format (z. B. JSON, XML, VHDL) exportieren.  
- **Voraussetzungen:** Projekt geöffnet.  
- **Auslöser:** Klick auf „Exportieren“.  
- **Hauptablauf:**
	1. Benutzer wählt Exportformat.
	2. System generiert Datei und bietet Download an.
	3. Benutzer speichert Datei lokal.  
- **Alternativabläufe:**  
	- 2a. Export fehlschlägt → System zeigt Fehlerdialog mit Log.  
- **Nachbedingungen:** Datei ist im Zielverzeichnis gespeichert.  
- **Akzeptanzkriterien:** Exportierte Datei enthält vollständige Netzliste und Bausteindefinitionen.


#### 3.3.6 UC-06 – Gesamte Schaltung löschen
- **Akteure:** Benutzer  
- **Ziel:** Der Benutzer möchte das aktuelle Canvas vollständig leeren.  
- **Voraussetzungen:** Schaltung ist geladen.  
- **Auslöser:** Klick auf „Alles löschen“.  
- **Hauptablauf:**
	1. System fragt nach Bestätigung.
	2. Benutzer bestätigt.
	3. System löscht alle Bausteine und Leitungen.
- **Alternativabläufe:**  
	- 2a. Benutzer bricht ab → keine Änderung.  
- **Nachbedingungen:** Canvas ist leer.  
- **Akzeptanzkriterien:** Kein Element verbleibt sichtbar.


#### 3.3.7 UC-07 – Signalverläufe visualisieren
- **Akteure:** Benutzer  
- **Ziel:** Benutzer möchte die zeitlichen Signaländerungen im Diagramm sehen.  
- **Voraussetzungen:** Simulation wurde ausgeführt.  
- **Auslöser:** Klick auf „Signalverlauf anzeigen“.  
- **Hauptablauf:**
	1. System öffnet Signalviewer.
	2. Benutzer wählt Knoten oder Leitungen.
	3. System zeigt Wellenformen in Echtzeit oder Zeitachse.  
- **Alternativabläufe:**  
	- 2a. Kein Signal gewählt → Meldung „Bitte Leitung auswählen“.  
- **Nachbedingungen:** Signaldiagramm ist sichtbar.  
- **Akzeptanzkriterien:** Werteänderungen stimmen mit Simulation überein.


#### 3.3.8 UC-08 – Schaltung importieren
- **Akteure:** Benutzer  
- **Ziel:** Bestehende Schaltung aus Datei laden.  
- **Voraussetzungen:** Datei vorhanden, gültiges Format.  
- **Auslöser:** Klick auf „Importieren“.  
- **Hauptablauf:**
	1. Benutzer wählt Datei.
	2. System liest Datei ein und validiert Format.
	3. Schaltung wird ins Canvas geladen.  
- **Alternativabläufe:**  
	- 2a. Datei fehlerhaft → Fehlerdialog.  
- **Nachbedingungen:** Schaltung ist geladen.  
- **Akzeptanzkriterien:** Alle Bausteine korrekt platziert.


#### 3.3.9 UC-09 – Benutzerdefinierte Logikbausteine erstellen
- **Akteure:** Benutzer  
- **Ziel:** Eigene Bausteine mit individuellem Verhalten definieren.  
- **Voraussetzungen:** Benutzer hat Schreibrechte in Bibliothek.  
- **Auslöser:** Menü „Neuer Baustein“.  
- **Hauptablauf:**
	1. System öffnet Baustein-Editor.
	2. Benutzer legt Pins, Symbole, Logik (z. B. durch Wahrheitstabelle) fest.
	3. System kompiliert und speichert Baustein.  
- **Alternativabläufe:**  
	- 3a. Kompilierungsfehler → Benutzer erhält Fehlermeldung.  
- **Nachbedingungen:** Neuer Baustein steht zur Verwendung bereit.  
- **Akzeptanzkriterien:** Baustein erscheint in Bibliothek und funktioniert korrekt.


#### 3.3.10 UC-10 – Logikbausteine per Drag & Drop positionieren
- **Akteure:** Benutzer  
- **Ziel:** Bausteine intuitiv auf dem Canvas platzieren.  
- **Voraussetzungen:** Schaltung geöffnet.  
- **Auslöser:** Benutzer zieht Element aus Bibliothek.  
- **Hauptablauf:**
	1. Benutzer wählt Baustein.
	2. Drag & Drop auf Canvas.
	3. System platziert Baustein und registriert im Netlist-Model.  
- **Alternativabläufe:**  
	- 3a. Kollision mit bestehendem Objekt → automatische Verschiebung.  
- **Nachbedingungen:** Baustein auf Canvas platziert.  
- **Akzeptanzkriterien:** Drag & Drop funktioniert flüssig.


#### 3.3.11 UC-11 – Bausteine verbinden
- **Akteure:** Benutzer  
- **Ziel:** Bausteine logisch miteinander verbinden.  
- **Voraussetzungen:** Zwei oder mehr Bausteine auf Canvas.  
- **Auslöser:** Klick und Ziehen von Pin zu Pin.  
- **Hauptablauf:**
	1. Benutzer startet Verbindung am Ausgangspin.
	2. System zeigt Gummiband-Leitung.
	3. Benutzer verbindet mit Zielpin.
	4. System validiert Verbindung.  
- **Alternativabläufe:**  
	- 4a. Ungültige Verbindung → rote Leitung, Fehlertext.  
- **Nachbedingungen:** Signalleitung hergestellt.  
- **Akzeptanzkriterien:** Verbindung korrekt in Simulation berücksichtigt.


#### 3.3.12 UC-12 – Baustein löschen
- **Akteure:** Benutzer  
- **Ziel:** Baustein aus Schaltung entfernen.  
- **Voraussetzungen:** Baustein ausgewählt.  
- **Auslöser:** Tastendruck `Entf`.  
- **Hauptablauf:**
	1. System entfernt Baustein und zugehörige Leitungen.
	2. Canvas aktualisiert.  
- **Nachbedingungen:** Baustein nicht mehr vorhanden.  
- **Akzeptanzkriterien:** Keine unverbundenen Leitungen verbleiben.


#### 3.3.13 UC-13 – Simulation in Echtzeit starten
- **Akteure:** Benutzer  
- **Ziel:** Verhalten der Schaltung prüfen.  
- **Voraussetzungen:** Vollständige, fehlerfreie Schaltung.  
- **Auslöser:** Klick auf „Simulieren“.  
- **Hauptablauf:**
	1. System prüft Netzliste.
	2. Simulation startet in WebAssembly-Modul.
	3. LEDs, Anzeigen und Signale aktualisieren sich live.  
- **Alternativabläufe:**  
	- 2a. Fehlerhafte Netzliste → Abbruch mit Meldung.  
- **Nachbedingungen:** Simulation beendet oder pausiert.  
- **Akzeptanzkriterien:** Echtzeitsimulation reagiert korrekt auf Eingaben.


#### 3.3.14 UC-14 – Schaltung speichern
- **Akteure:** Benutzer  
- **Ziel:** Aktuelle Arbeit sichern.  
- **Voraussetzungen:** Schaltung geöffnet.  
- **Auslöser:** Klick auf „Speichern“ oder `Ctrl+S`.  
- **Hauptablauf:**
	1. System speichert Datei in Cloud oder lokal.
	2. Versionsnummer wird angehoben.  
- **Nachbedingungen:** Schaltung gespeichert.  
- **Akzeptanzkriterien:** Datei im Projektmanager sichtbar.


#### 3.3.15 UC-15 – Schaltung laden
- **Akteure:** Benutzer  
- **Ziel:** Frühere Schaltung öffnen.  
- **Auslöser:** Klick auf „Laden“.  
- **Hauptablauf:**
	1. System zeigt Projektliste.
	2. Benutzer wählt Projekt.
	3. System lädt Schaltung ins Canvas.  
- **Nachbedingungen:** Schaltung verfügbar.  
- **Akzeptanzkriterien:** Vollständiger Zustand geladen.


#### 3.3.16 UC-16 – Nutzer verwalten
- **Akteure:** Administrator  
- **Ziel:** Benutzerkonten prüfen, sperren oder bearbeiten.  
- **Voraussetzungen:** Administrator ist eingeloggt.  
- **Auslöser:** Menü „Administration → Nutzer verwalten“.  
- **Hauptablauf:**
	1. System zeigt Benutzerliste.
	2. Admin bearbeitet Status, Rechte oder löscht Konten.
	3. Änderungen werden gespeichert.  
- **Nachbedingungen:** Nutzerdaten aktualisiert.  
- **Akzeptanzkriterien:** Änderungen sofort wirksam.


#### 3.3.17 UC-17 – Systemeinstellungen bearbeiten
- **Akteure:** Administrator  
- **Ziel:** Globale Systemeinstellungen anpassen.  
- **Voraussetzungen:** Administratorzugriff.  
- **Auslöser:** Menü „Systemeinstellungen“.  
- **Hauptablauf:**
	1. Admin öffnet Einstellungsmaske.
	2. Nimmt Änderungen vor (z. B. Serverpfade, Simulationstakte).
	3. System speichert und lädt neu.  
- **Nachbedingungen:** Neue Einstellungen aktiv.  
- **Akzeptanzkriterien:** Änderungen korrekt übernommen.


#### 3.3.18 UC-18 – Registrieren
- **Akteure:** Benutzer  
- **Ziel:** Neues Konto anlegen.  
- **Auslöser:** Klick auf „Registrieren“.  
- **Hauptablauf:**
	1. Benutzer gibt E-Mail, Passwort und Namen ein.
	2. System validiert Eingaben.
	3. Konto wird erstellt.  
- **Alternativabläufe:**  
	- 2a. E-Mail existiert → Fehlermeldung.  
- **Nachbedingungen:** Neues Konto angelegt.  
- **Akzeptanzkriterien:** Benutzer kann sich anschließend anmelden.


#### 3.3.19 UC-19 – Anmelden
- **Akteure:** Benutzer  
- **Ziel:** Zugriff auf persönliche Projekte.  
- **Auslöser:** Klick auf „Login“.  
- **Hauptablauf:**
	1. Benutzer gibt Zugangsdaten ein.
	2. System prüft Authentifizierung.
	3. Zugriff gewährt.  
- **Alternativabläufe:**  
	- 2a. Passwort falsch → Fehlermeldung.  
- **Nachbedingungen:** Benutzer eingeloggt.  
- **Akzeptanzkriterien:** Zugang nur bei korrekten Daten.


#### 3.3.20 UC-20 – Abmelden
- **Akteure:** Benutzer  
- **Ziel:** Sitzung sicher beenden.  
- **Auslöser:** Klick auf „Logout“.  
- **Hauptablauf:**
	1. System löscht Session-Cookies.
	2. Benutzer wird zur Startseite geleitet.  
- **Nachbedingungen:** Sitzung beendet.  
- **Akzeptanzkriterien:** Kein Zugriff mehr auf geschützte Bereiche.


#### 3.3.21 UC-21 – Nutzeraccount löschen
- **Akteure:** Administrator oder Benutzer (selbst).  
- **Ziel:** Konto entfernen.  
- **Voraussetzungen:** Authentifiziert.  
- **Auslöser:** Klick auf „Account löschen“.  
- **Hauptablauf:**
	1. System fragt nach Bestätigung.
	2. Benutzer bestätigt.
	3. Daten werden gelöscht.  
- **Nachbedingungen:** Konto entfernt, Daten anonymisiert.  
- **Akzeptanzkriterien:** Kein Login mehr möglich.


#### 3.3.22 UC-22 – Passwort zurücksetzen
- **Akteure:** Benutzer  
- **Ziel:** Passwort wiederherstellen.  
- **Auslöser:** Klick auf „Passwort vergessen“.  
- **Hauptablauf:**
	1. Benutzer gibt E-Mail-Adresse ein.
	2. System sendet Link.
	3. Benutzer setzt neues Passwort.  
- **Nachbedingungen:** Neues Passwort gültig.  
- **Akzeptanzkriterien:** Login mit neuem Passwort möglich.


### 3.2 Usability

- **Schnell erfassbar:** Minimaler Einarbeitungsaufwand durch intuitives GUI.

- **Erkundbarkeit:** Kontext-Menüs, konfigurierbarer Toolbar, direkte Inline-Hilfe (Hover-Tootips).

- **Effizienz:** Tastaturkürzel für alle häufigen Aktionen (Place Gate, Connect, Delete, Save, Simulate, Step).

- **Konsistenz:** Einheitliche Icons, responsive Panels, konsistente Zeichen- und Snap-Regeln wie in Desktop-Editoren.

- **Fehlertoleranz:** Undo/Redo unbegrenzt (bis zu Speichergrenze), Safety-Prompts bei destruktiven Aktionen.

### 3.3 Reliability

- **Autosave & Checkpoints:** Automatisches Speichern alle X Sekunden (konfigurierbar), inkrementelle Snapshots für Recovery.

- **Crash des Browsers:** beim Reopen wird letzte Autosave-Version angeboten.

- **Autosave & Checkpoints:** Automatisches Speichern alle X Sekunden (konfigurierbar)

- **Fehlerresistenz:** Simulator-Engine isoliert in Worker-Prozessen (WebWorker/WASM), Abstürze des Simulations-Threads beeinflussen UI nicht.

### 3.4 Perfomance

- UI-Startzeit + Interaktions-Latenz gering.

- **Simulation:** kleine Schaltungen in-browser in Echtzeit

### 3.5 Supportability
- **Server-Side Logs:** Structured logging, correlation-id für Requests (Traceability).

### 3.6 Design Constraints
- **Browser-Support:** Ziel: aktuelle Chrome, Firefox, Edge.

### 3.7 On-line User Documentation and Help System Requirements
TODO

### 3.8 Purchased Components
--

### 3.9 Interfaces
TODO

### 3.10 Licensing Requirements
TODO

## 4. Supporting Information
For any further information you can check out the Blog on out [GitHub Discussions Page](https://github.com/SimonJ2222/BitFlow/discussions). 
The Team Members are:
- Mohid Syed
- Florian Blum
- Moritz Czekalski
- Simon Just
