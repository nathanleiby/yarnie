import { Project } from "@/components/ProjectList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const STORAGE_KEY = "@yairn/projects";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load projects from storage on mount
  useEffect(() => {
    loadProjects();
  }, []);

  // Save projects to storage whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveProjects(projects);
    }
  }, [projects, isLoading]);

  const loadProjects = async () => {
    try {
      const storedProjects = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedProjects) {
        const parsedProjects = JSON.parse(storedProjects);
        // Convert string dates back to Date objects
        const projectsWithDates = parsedProjects.map((project: any) => ({
          ...project,
          updatedAt: new Date(project.updatedAt),
        }));
        setProjects(projectsWithDates);
      }
    } catch (e) {
      setError("Failed to load projects");
      console.error("Failed to load projects:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProjects = async (projectsToSave: Project[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(projectsToSave));
    } catch (e) {
      setError("Failed to save projects");
      console.error("Failed to save projects:", e);
    }
  };

  const createProject = ({ name }: { name: string }) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name,
      updatedAt: new Date(),
      status: "in_progress",
      pinned: false,
      rowCount: 0,
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = (id: string, updatedProject: Project) => {
    setProjects(
      projects.map((project) => (project.id === id ? updatedProject : project))
    );
  };

  const togglePinProject = (id: string) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? { ...project, pinned: !project.pinned, updatedAt: new Date() }
          : project
      )
    );
  };

  const toggleProjectStatus = (id: string) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? {
              ...project,
              status:
                project.status === "in_progress" ? "finished" : "in_progress",
              updatedAt: new Date(),
            }
          : project
      )
    );
  };

  return {
    projects,
    isLoading,
    error,
    createProject,
    updateProject,
    togglePinProject,
    toggleProjectStatus,
  };
}
