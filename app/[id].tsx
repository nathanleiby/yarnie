import Counter from "@/components/Counter";
import { Text } from "@/components/Themed";
import { useProjects } from "@/hooks/useProjects";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function ProjectScreen() {
  const { id } = useLocalSearchParams();
  const { projects, isLoading, error, updateProject } = useProjects();

  const project = projects.find((p) => p.id === id);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading project...</Text>
      </View>
    );
  }

  if (error || !project) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error || "Project not found"}</Text>
      </View>
    );
  }

  const handleCountChange = (newCount: number) => {
    updateProject(project.id, {
      ...project,
      rowCount: newCount,
      updatedAt: new Date(),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{project.name}</Text>
        <Text style={styles.status}>
          {project.status === "in_progress" ? "In Progress" : "Finished"}
        </Text>
      </View>
      <Counter count={project.rowCount} onChange={handleCountChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  status: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  error: {
    color: "#FF3B30",
    textAlign: "center",
  },
});
