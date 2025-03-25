import ProjectList, { Project } from "@/components/ProjectList";
import { View } from "@/components/Themed";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function ProjectsScreen() {
  const [projects, setProjects] = useState<Project[]>([]);

  const handleCreateProject = ({ name }: { name: string }) => {
    const newProject: Project = {
      id: Date.now().toString(), // Simple ID generation for now
      name,
      updatedAt: new Date(),
      status: "in_progress",
      pinned: false,
    };
    setProjects([...projects, newProject]);
  };

  const handlePinProject = (id: string) => {
    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, pinned: !project.pinned } : project
      )
    );
  };

  return (
    <View style={styles.container}>
      <ProjectList
        projects={projects}
        onCreateProject={handleCreateProject}
        onPinProject={handlePinProject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
