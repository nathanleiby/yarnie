# Story 3: Physical Device UX

## Story

**As a** knitter/crocheter\
**I want** my phone screen to stay awake while I'm counting rows\
**so that** I don't have to keep waking it up while crafting.

## Status

Complete

## Context

When using the app to count rows, crafters need to frequently interact with the screen. If the screen goes to sleep, it disrupts their workflow and they may lose count. The Project View should keep the screen awake to prevent this interruption.

## Estimation

Story Points: 0.5 (approximately 5 minutes of AI development)

## Acceptance Criteria

1. - [x] Screen stays awake when user is on Project View
2. - [x] Screen wake lock is activated when entering Project View
3. - [x] Screen wake lock is deactivated when leaving Project View
4. - [x] Wake lock works on both iOS and Android

## Subtasks

1. - [x] Install expo-keep-awake package
2. - [x] Add wake lock to Project View
   1. - [x] Activate on component mount
   2. - [x] Deactivate on component unmount
3. - [x] Test wake lock functionality
   1. - [x] Test on iOS simulator
   2. - [x] Test on physical device if available

## Constraints

- Must work reliably across app state changes
- Must not affect battery life when not in Project View
- Must work on both iOS and Android

## Dev Notes

- Using expo-keep-awake package for cross-platform compatibility
- Need to handle component lifecycle properly to avoid memory leaks
- Should verify wake lock is properly released when navigating away

## Progress Notes As Needed

- Completed implementation using expo-keep-awake
- Added proper lifecycle management with useEffect
- Wake lock activates when entering Project View and deactivates when leaving
- Implementation works across both iOS and Android
