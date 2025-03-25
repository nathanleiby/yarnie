interface Project {
  id: string;
  name: string;
  status: "in_progress" | "finished";
  pinned: boolean;
  rowCount: number;
  updatedAt: Date;
}

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const STORAGE_KEY = "@yairn/projects";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const storedProjects = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedProjects) {
        const parsedProjects = JSON.parse(storedProjects).map((p: any) => ({
          ...p,
          updatedAt: new Date(p.updatedAt),
        }));
        setProjects(parsedProjects);
      }
    } catch (e) {
      setError("Failed to load projects");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Load projects from storage on mount
  useEffect(() => {
    loadProjects();
  }, []);

  const saveProjects = async (updatedProjects: Project[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
      setProjects(updatedProjects);
    } catch (e) {
      setError("Failed to save projects");
      console.error(e);
    }
  };

  const createProject = async ({ name }: { name: string }) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name,
      status: "in_progress",
      pinned: false,
      rowCount: 0,
      updatedAt: new Date(),
    };

    const updatedProjects = [...projects, newProject];
    await saveProjects(updatedProjects);
    return newProject;
  };

  const updateProject = async (id: string, updatedProject: Project) => {
    const updatedProjects = projects.map((p) =>
      p.id === id ? updatedProject : p
    );
    await saveProjects(updatedProjects);
  };

  const togglePinProject = async (id: string) => {
    const project = projects.find((p) => p.id === id);
    if (project) {
      const updatedProject = {
        ...project,
        pinned: !project.pinned,
        updatedAt: new Date(),
      };
      await updateProject(id, updatedProject);
    }
  };

  const toggleProjectStatus = async (id: string) => {
    const project = projects.find((p) => p.id === id);
    if (project) {
      const newStatus =
        project.status === "in_progress"
          ? ("finished" as const)
          : ("in_progress" as const);
      const updatedProject = {
        ...project,
        status: newStatus,
        updatedAt: new Date(),
      };
      await updateProject(id, updatedProject);
    }
  };

  return {
    projects,
    isLoading,
    error,
    createProject,
    updateProject,
    togglePinProject,
    toggleProjectStatus,
    refreshProjects: loadProjects,
  };
}
