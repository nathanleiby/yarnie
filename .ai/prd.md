# **Product Requirements Document (PRD)**

## **Goal**

Create a simple phone-based app for counting stiches when making yarn based projects.
The app should run on an iPhone and work fully offline.

---

## **Features and Subtasks**

### **Feature 1: Project list view**

**Goal:** Display a list of projects. Allow simple sorting and creation interactions.

#### **Subtasks:**

1. **List of Projects**

   - Show a list of projects
   - By default sort by recency (first by "updated", then by "created")

2. **List of Projects: Interations**

   - Allow pinning a project to the top of the list
   - Allow marking a project's status ('finished' or 'in progress')
   - Clicking on a project should enter

3. **Create Project:**

   - Have a single large button to create a new project
   - The only required project property is a name

4. **Create placeholder for 'Project' view.**

   - You should enter this view when you click on an existing project
   - You should enter this view after creating a new project

---

### **Feature 2: Project View**

**Goal:** Create a very simple view with a single large number that indicates the 'current row' and some buttons to increment/decrement/reset.

#### **Subtasks:**

1. **Basic View:**

   -

2. **Increment/Decrement Row:**

   - A very large plus (+) icon lets you add a row
   - A small minus (-) icon lets you remove a row
   - A small reset icon lets you reset to 0 (this requires a confirmation dialog 'are you sure?' interaction)
   - You cannot have negative rows.

3. **Mobile device Support**

   - Setup the project so we can ship it to an android device.
   - Setup the project so we can ship it to an iphone.

---

## **Testing Strategy**

**Goal:** Implement sanity-check-level automated testing to ensure core functionality works as expected.

#### **Subtasks:**

1. **Unit Tests:**

   - Use **Jest** to test individual components and functions.
   - Focus on core functionality (e.g., page loads, links work).

2. **Integration Tests:**

   - Test interactions between components (e.g., map rendering, blog post rendering).
   - Use mocks for external dependencies (e.g., GPX file parsing).

3. **End-to-End (E2E) Tests:**
   - Use **Jest** or **Cypress** to test user flows (e.g., navigating, clicking buttons).
   - Ensure tests run automatically in CI/CD pipelines.

---

## **Tech Stack**

- **Frontend:**
  - **React**
  - **React Native** for hardware support (iphone)
- **Hosting:**
  - **GitHub Pages** should be used to support a simple web based mode.
- **Testing:**
  - **Jest** for unit and integration tests.
  - **Cypress** (optional) for E2E tests.

---

## **Timeline**

**Priority:**

1. **Phase 1: List View**

   - Implement map integration, route metrics, and photos.
   - Simulate a fake GPX route for testing.

2. **Phase 2: Project View**

   - Set up Markdown rendering with syntax highlighting and LaTeX support.
   - Create a simple blog layout.

3. **Phase 3: Device support**

---

## **Performance and Accessibility**

- **Performance:**
  - All interactions should occur in <30ms
- **Accessibility:**
  - Ensure compliance with WCAG standards (e.g., keyboard navigation, ARIA labels).
  - No dark mode required.
