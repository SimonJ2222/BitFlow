# Architecture Significant Requirements (ASR)

# Utility Tree

# Architekturentscheidungen & Entwurfsmuster

## 1. Überblick  
Die Architektur von BitFlow orientiert sich an den architektonisch signifikanten Anforderungen (ASR), die sich aus den wichtigsten Geschäfts- und Qualitätszielen ergeben:  
**Modifiability**, **Usability**, **Performance**, **Testability** und **Reliability**.  
BitFlow soll eine flexible, erweiterbare und robuste Umgebung bieten, in der Benutzer digitale Schaltungen erstellen, simulieren und benutzerdefinierte Bausteine definieren können.

## 2. Taktiken, die BitFlow anwendet

### 2.1 Modifiability-Taktiken
- **Separation of Concerns:** Strikte Trennung von UI, Simulation, Storage und Logik.  
- **Abstrakte Interfaces:** Simulation und Storage sind austauschbar.  
- **Erweiterbare Bausteinbibliothek:** Benutzerdefinierte Bausteine sind erstellbar.  
- **Information Hiding:** Interne Logikdetails sind gekapselt.  

### 2.2 Performance-Taktiken  
- **Batch-Updates:** UI aktualisiert sich gesammelt statt nach jedem Event.  
- **Event-getriebene Simulation:** Nur signifikante Signaländerungen triggern Updates.  
- **Asynchronität:** Simulation läuft getrennt vom UI.  

### 2.3 Usability-Taktiken
- **Sofortiges Feedback:** Drag & Drop, Echtzeitsimulation, farbliche Leitungszustände.  
- **Undo/Redo:** Eigener UndoManager mit Snapshot-Strategie.  
- **Eindeutige Fehlermeldungen:** Fehlermeldungen bei der Validierung von unzulässigen Schaltungen (z.B. zwei Outputs führen zur gleichen Leitung).  
- **Personalisierbare Oberfläche:** Dark-/Light-Mode.
 
### 2.4 Testability-Taktiken
- **Modulare Architektur:** Jede Klasse hat klaren Zweck (Single Responsibility Principle (SRP) aus SOLID).  
- **Mocking über Interfaces:** Speicherung und Simulation können simuliert werden.  
- **Deterministische Simulation:** Gleiche Inputs führen zu gleichen Outputs.  
- **Interne API-Schichten:** Klare Begrenzung zwischen UI-Schicht und Logikschicht.  

### 2.5 Reliability-Taktiken
- **Validierung aller Eingaben:** Schaltungsprüfung vor Simulation.  
- **Fehlerbehandlung:** Ungültige Bausteine blockieren nicht die App.    
- **Simulation getrennt vom UI:** UI bleibt stabil, selbst wenn Logikfehler auftreten.  

## 3. Architekturentscheidungen

### 3.1 Trennung der Kernbereiche
BitFlow folgt einem vierteiligen Architekturmodell:
- **Core:** Schaltung, Bausteine, Simulation.  
- **UI:** React-Frontend, Canvas, Signalviewer.  
- **Storage:** DB/LocalStorage/Import/Export.  
- **Library:** Sammlung vordefinierter und benutzerdefinierter Bausteine.  

### 3.2 Nutzung klarer Abstraktionen
- Component → Basisklasse aller Bausteine  
- CustomComponent → Benutzerdefinierte Bausteine  
- Circuit → Container für Komponenten und Verbindungen  
- Simulaton → Austauschbare Strategie für Echtzeitsimulation  
- Storage → Einheitliche Schnittstelle für Speichern & Laden  

### 3.3 Compiler als eigenständiges Modul
Verantwortlich für:  
- Validierung von Definitionsdateien  
- Erzeugung ausführbarer Logik (CompiledLogic)  
- Fehlermeldungen  

### 3.4 Undo/Redo als separater Service
Verwendet **Zustandssnapshots**, nicht Operations-Listen:  
→ stabil, unabhängig von der Länge von Bearbeitungen.

### 3.5 Library als zentrale Registry
Hält Standardbausteine und benutzerdefinierte Bausteine vor.  
Erweitert die Anwendung ohne Änderungen an bestehenden Modulen.


## 4. Entwurfsmuster

### 4.1 Factory Pattern  
Erzeugt Bausteine aus Bibliothek oder benutzerdefinierten Definitionen.  
→ Ermöglicht Austausch von Bausteintypen.

### 4.2 Strategy Pattern  
Für Simulationen oder Validierungsprozesse.  
→ z. B. Echtzeit-Simulation, Schritt-Simulation, statische Analyse.

### 4.3 Composite Pattern  
Benutzerdefinierte Bausteine bestehen aus eigenen Sub-Schaltungen.  
→ Ermöglicht strukturelle Wiederverwendung.

### 4.4 Observer Pattern  
UI aktualisiert sich, wenn:
- Schaltung sich ändert  
- Simulator neue Werte liefert  

### 4.5 Repository Pattern  
Kapselt:
- Laden & Speichern  
- Versionierung  
- Import/Export  


## 5. Zusammenfassung
Die Architektur von BitFlow kombiniert klare Module, starke Abstraktionen und bewährte Entwurfsmuster.  
Die wichtigsten nichtfunktionalen Anforderungen, **Modifiability, Usability, Performance, Testability, Reliability**, werden durch konkrete Taktiken adressiert.
BitFlow bleibt damit **erweiterbar**, **stabil** und **für Nutzer leicht verständlich**, während Entwickler flexibel neue Features einbauen können.
