import ProjectList from "@/components/ProjectList";
import { View } from "@/components/Themed";
import { useProjects } from "@/hooks/useProjects";
import { StyleSheet } from "react-native";

export default function ProjectsScreen() {
  const {
    projects,
    isLoading,
    error,
    createProject,
    togglePinProject,
    toggleProjectStatus,
  } = useProjects();

  return (
    <View style={styles.container}>
      <ProjectList
        projects={projects}
        isLoading={isLoading}
        error={error}
        onCreateProject={createProject}
        onPinProject={togglePinProject}
        onToggleStatus={toggleProjectStatus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
