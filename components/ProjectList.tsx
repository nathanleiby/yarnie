import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

/**
 * Represents a knitting/crocheting project in the application
 */
export interface Project {
  /** Unique identifier for the project */
  id: string;
  /** Name of the project */
  name: string;
  /** Last time the project was updated */
  updatedAt: Date;
  /** Current status of the project */
  status: "in_progress" | "finished";
  /** Whether the project is pinned to the top of the list */
  pinned: boolean;
}

/**
 * Props for the ProjectList component
 */
interface ProjectListProps {
  /** Array of projects to display. Defaults to empty array if not provided */
  projects?: Project[];
  /** Callback function when a project is pinned/unpinned */
  onPinProject?: (id: string) => void;
  /** Callback function when a new project is created */
  onCreateProject?: (project: { name: string }) => void;
}

/**
 * ProjectList component displays a list of knitting/crocheting projects and allows for:
 * - Viewing project status
 * - Pinning projects to the top
 * - Creating new projects
 *
 * Projects are sorted by:
 * 1. Pinned status (pinned projects first)
 * 2. Last updated time (most recent first)
 *
 * @param props - {@link ProjectListProps}
 * @returns React component
 */
const ProjectList: React.FC<ProjectListProps> = ({
  projects = [],
  onPinProject,
  onCreateProject,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const sortedProjects = [...projects].sort((a, b) => {
    // First sort by pinned status
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    // Then by recency
    return b.updatedAt.getTime() - a.updatedAt.getTime();
  });

  const handleCreateProject = () => {
    if (newProjectName.trim() && onCreateProject) {
      onCreateProject({ name: newProjectName.trim() });
      setNewProjectName("");
      setIsCreating(false);
    }
  };

  if (projects.length === 0) {
    return (
      <View style={styles.container}>
        {isCreating ? (
          <View style={styles.createForm}>
            <TextInput
              style={styles.input}
              value={newProjectName}
              onChangeText={setNewProjectName}
              placeholder="Project name"
            />
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateProject}
            >
              <Text>Create</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text>No projects yet</Text>
            <TouchableOpacity
              style={styles.newButton}
              onPress={() => setIsCreating(true)}
            >
              <Text>New Project</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedProjects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.projectItem} testID="project-item">
            <Text testID={`project-name-${item.id}`}>{item.name}</Text>
            <Text testID={`status-${item.id}`}>
              {item.status === "in_progress" ? "In Progress" : "Finished"}
            </Text>
            <TouchableOpacity
              testID={`pin-button-${item.id}`}
              onPress={() => onPinProject?.(item.id)}
            >
              <Text>{item.pinned ? "📌" : "📍"}</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {isCreating ? (
        <View style={styles.createForm}>
          <TextInput
            style={styles.input}
            value={newProjectName}
            onChangeText={setNewProjectName}
            placeholder="Project name"
          />
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateProject}
          >
            <Text>Create</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.newButton}
          onPress={() => setIsCreating(true)}
        >
          <Text>New Project</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  projectItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  createForm: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  createButton: {
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 4,
  },
  newButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 16,
  },
});

export default ProjectList;
