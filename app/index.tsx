import ProjectList from "@/components/ProjectList";
import { useProjects } from "@/hooks/useProjects";
import { Stack } from "expo-router";
import React from "react";

export default function Index() {
  const { projects, isLoading, error, updateProject, refreshProjects } =
    useProjects();

  const handleToggleStatus = (id: string) => {
    const project = projects.find((p) => p.id === id);
    if (project) {
      updateProject(id, {
        ...project,
        status: project.status === "in_progress" ? "finished" : "in_progress",
        updatedAt: new Date(),
      });
    }
  };

  const handleTogglePin = (id: string) => {
    const project = projects.find((p) => p.id === id);
    if (project) {
      updateProject(id, {
        ...project,
        pinned: !project.pinned,
        updatedAt: new Date(),
      });
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Projects",
        }}
      />
      <ProjectList
        projects={projects}
        onToggleStatus={handleToggleStatus}
        onTogglePin={handleTogglePin}
        error={error}
        refreshProjects={refreshProjects}
      />
    </>
  );
}
