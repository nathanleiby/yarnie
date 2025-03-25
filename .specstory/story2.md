# Story 2: Project View with Stitch Counter

## Story

**As a** knitter/crocheter\
**I want** to track my row count for a specific project\
**so that** I don't lose my place while crafting.

## Status

In Progress

## Context

The core functionality of the app is to help crafters keep track of their row counts. The Project View needs to be simple and intuitive, with large buttons for easy interaction while crafting. The counter should prevent negative numbers and include a reset function with confirmation to prevent accidental resets.

## Estimation

Story Points: 1 (approximately 10 minutes of AI development)

## Acceptance Criteria

1. - [ ] Display current row count in large, clear format
2. - [ ] Provide large increment button (+) for adding rows
3. - [ ] Include smaller decrement button (-) for correcting mistakes
4. - [ ] Add reset functionality with confirmation dialog
5. - [ ] Prevent counter from going below zero
6. - [ ] Save count state persistently
7. - [ ] Update project's updatedAt timestamp when count changes
8. - [ ] Show project name and status in the header
9. - [ ] Provide visual feedback on button press

## Subtasks

1. - [ ] Set up Project View structure
   1. - [ ] Create ProjectView component
   2. - [ ] Add navigation from project list
   3. - [ ] Set up basic layout
2. - [ ] Implement counter functionality
   1. - [ ] Create Counter component
   2. - [ ] Add increment/decrement logic
   3. - [ ] Add negative number prevention
   4. - [ ] Add reset with confirmation
3. - [ ] Add persistence
   1. - [ ] Update Project type with count field
   2. - [ ] Modify useProjects hook for count management
   3. - [ ] Ensure count persists with AsyncStorage
4. - [ ] Add styling and UX
   1. - [ ] Style counter display
   2. - [ ] Style buttons for easy interaction
   3. - [ ] Add visual feedback
   4. - [ ] Style header with project info

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

- Starting implementation with TDD approach
- Will need to update existing tests when modifying Project interface
