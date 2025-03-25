import { fireEvent, render } from "@testing-library/react-native";
import ProjectList from "../ProjectList";

describe("ProjectList", () => {
  it("should display an empty list message when no projects exist", () => {
    const { getByText } = render(<ProjectList />);
    expect(getByText("No projects yet")).toBeTruthy();
  });

  it("should display a list of projects", () => {
    const projects = [
      {
        id: "1",
        name: "Scarf",
        updatedAt: new Date(),
        status: "in_progress",
        pinned: false,
      },
      {
        id: "2",
        name: "Hat",
        updatedAt: new Date(),
        status: "finished",
        pinned: false,
      },
    ];
    const { getByText } = render(<ProjectList projects={projects} />);
    expect(getByText("Scarf")).toBeTruthy();
    expect(getByText("Hat")).toBeTruthy();
  });

  it("should sort projects by recency", () => {
    const olderDate = new Date("2024-03-20");
    const newerDate = new Date("2024-03-25");
    const projects = [
      {
        id: "1",
        name: "Older Project",
        updatedAt: olderDate,
        status: "in_progress",
        pinned: false,
      },
      {
        id: "2",
        name: "Newer Project",
        updatedAt: newerDate,
        status: "in_progress",
        pinned: false,
      },
    ];
    const { getByTestId } = render(<ProjectList projects={projects} />);
    expect(getByTestId("project-name-2")).toHaveTextContent("Newer Project");
    expect(getByTestId("project-name-1")).toHaveTextContent("Older Project");
  });

  it("should allow pinning a project to the top", () => {
    const projects = [
      {
        id: "1",
        name: "Project 1",
        updatedAt: new Date(),
        status: "in_progress",
        pinned: false,
      },
      {
        id: "2",
        name: "Project 2",
        updatedAt: new Date(),
        status: "in_progress",
        pinned: false,
      },
    ];
    const mockOnPinProject = jest.fn();
    const { getByTestId } = render(
      <ProjectList projects={projects} onPinProject={mockOnPinProject} />
    );
    const pinButton = getByTestId("pin-button-1");
    fireEvent.press(pinButton);
    expect(mockOnPinProject).toHaveBeenCalledWith("1");
  });

  it("should display project status", () => {
    const projects = [
      {
        id: "1",
        name: "In Progress",
        updatedAt: new Date(),
        status: "in_progress",
        pinned: false,
      },
      {
        id: "2",
        name: "Finished",
        updatedAt: new Date(),
        status: "finished",
        pinned: false,
      },
    ];
    const { getByTestId } = render(<ProjectList projects={projects} />);
    expect(getByTestId("status-1")).toHaveTextContent("In Progress");
    expect(getByTestId("status-2")).toHaveTextContent("Finished");
  });

  it("should allow creating a new project", () => {
    const onCreateProject = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <ProjectList onCreateProject={onCreateProject} />
    );
    const newProjectButton = getByText("New Project");
    fireEvent.press(newProjectButton);
    const nameInput = getByPlaceholderText("Project name");
    fireEvent.changeText(nameInput, "New Scarf");
    const createButton = getByText("Create");
    fireEvent.press(createButton);
    expect(onCreateProject).toHaveBeenCalledWith({ name: "New Scarf" });
  });
});
