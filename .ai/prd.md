# Yarnie - Stitch Counter PRD

## Overview

Yarnie is a mobile application designed to help knitters and crocheters keep track of their stitches and rows in yarn-based projects. The app focuses on simplicity and offline functionality, making it perfect for crafters to use anywhere.

## Problem Statement

Knitters and crocheters often:

- Lose track of their current row count
- Need a simple way to count stitches
- Want to manage multiple projects
- Need to work offline
- Prefer using their phone over physical counters

## Goals

1. Create a simple, intuitive stitch counting app
2. Provide full offline functionality
3. Support multiple ongoing projects
4. Deliver a smooth mobile experience on iPhone

## Non-Goals

- Social features
- Pattern library
- Online synchronization
- Complex project management features

## User Personas

### Casual Crafter

- Works on 1-2 projects at a time
- Needs basic row counting
- Values simplicity

### Dedicated Knitter

- Manages multiple projects
- Needs reliable project tracking
- Wants quick access to recent projects

## Features

### MVP (Minimum Viable Product)

#### Project List View

- Display list of projects
- Sort by recency (updated/created)
- Pin projects to top
- Mark project status (finished/in progress)
- Create new projects
- Project name as only required field

#### Project View

- Large, clear display of current row count
- Large increment button (+)
- Small decrement button (-)
- Reset functionality with confirmation
- Prevent negative row counts

### Technical Requirements

#### Mobile Development

- React Native for iOS support
- Offline-first architecture
- Local storage for project data
- Simple, responsive UI

#### Web Support

- GitHub Pages deployment
- Basic web functionality
- Responsive design

## Success Metrics

1. App stability
2. User interaction speed (<30ms)
3. Offline reliability
4. Project data persistence
5. User satisfaction with UI

## Timeline

Phase 1 (MVP) - 1 month

- Week 1: Project List View
- Week 2: Project View
- Week 3: Device Support and Testing
- Week 4: Polish and Bug Fixes

## Testing Strategy

### Unit Tests

- Jest for component testing
- Core functionality coverage
- State management tests

### Integration Tests

- Project creation flow
- Counter functionality
- Data persistence

### Device Testing

- iOS simulator testing
- Physical device testing
- Performance testing

## Risks and Mitigation

1. Performance

   - Optimize render cycles
   - Minimize state updates
   - Regular performance testing

2. Data Loss

   - Robust local storage
   - Auto-save functionality
   - Undo/redo support

3. User Experience
   - Large, touch-friendly buttons
   - Clear visual feedback
   - Intuitive navigation

## Tech Stack

- Frontend: React Native
- State Management: Local state
- Storage: AsyncStorage
- Testing: Jest
- Web Support: GitHub Pages

---

_This PRD is a living document and will be updated as the project evolves._
