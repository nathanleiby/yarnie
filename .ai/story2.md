# Story 2: Project View with Stitch Counter

## Story

**As a** knitter/crocheter\
**I want** to track my row count for a specific project\
**so that** I don't lose my place while crafting.

## Status

Complete

## Context

The core functionality of the app is to help crafters keep track of their row counts. The Project View needs to be simple and intuitive, with large buttons for easy interaction while crafting. The counter should prevent negative numbers and include a reset function with confirmation to prevent accidental resets.

## Estimation

Story Points: 1 (approximately 10 minutes of AI development)

## Acceptance Criteria

1. - [x] Display current row count in large, clear format
2. - [x] Provide large increment button (+) for adding rows
3. - [x] Include smaller decrement button (-) for correcting mistakes
4. - [x] Add reset functionality with confirmation dialog
5. - [x] Prevent counter from going below zero
6. - [x] Save count state persistently
7. - [x] Update project's updatedAt timestamp when count changes
8. - [x] Show project name and status in the header
9. - [x] Provide visual feedback on button press

## Subtasks

1. - [x] Set up Project View structure
   1. - [x] Create ProjectView component
   2. - [x] Add navigation from project list
   3. - [x] Set up basic layout
2. - [x] Implement counter functionality
   1. - [x] Create Counter component
   2. - [x] Add increment/decrement logic
   3. - [x] Add negative number prevention
   4. - [x] Add reset with confirmation
3. - [x] Add persistence
   1. - [x] Update Project type with count field
   2. - [x] Modify useProjects hook for count management
   3. - [x] Ensure count persists with AsyncStorage
4. - [x] Add styling and UX
   1. - [x] Style counter display
   2. - [x] Style buttons for easy interaction
   3. - [x] Add visual feedback
   4. - [x] Style header with project info

## Constraints

- Must be usable with one hand
- Must prevent accidental count loss
- Must update immediately for good UX
- Must work offline
- Must handle large numbers (up to 9999)

## Dev Notes

- Using React Native's built-in components
- Will need to modify the Project interface
- Will use React Navigation for routing
- Will add unit tests for all functionality

## Progress Notes As Needed

- Completed implementation with TDD approach
- Added Counter component with comprehensive tests
- Integrated with existing project management system
- Added persistent storage for row counts
- Implemented user-friendly UI with clear visual feedback
- All tests passing
