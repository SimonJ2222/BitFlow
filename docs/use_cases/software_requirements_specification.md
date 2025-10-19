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
#### 3.3.1 _functional use case 1_
TODO

### 3.2 Usability
TODO

### 3.3 Reliability
TODO

### 3.4 Perfomance
TODO

### 3.5 Supportability
TODO

### 3.6 Design Constraints
TODO

### 3.7 On-line User Documentation and Help System Requirements
TODO

### 3.8 Purchased Components
TODO

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
