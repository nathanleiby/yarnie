import Counter from "@/components/Counter";
import { Text } from "@/components/Themed";
import { useProjects } from "@/hooks/useProjects";
import { MaterialIcons } from "@expo/vector-icons";
import * as KeepAwake from "expo-keep-awake";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function ProjectScreen() {
  const { id } = useLocalSearchParams();
  const { projects, isLoading, error, updateProject } = useProjects();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");

  // Enable screen wake lock when component mounts
  useEffect(() => {
    KeepAwake.activateKeepAwake();
    // Disable screen wake lock when component unmounts
    return () => {
      KeepAwake.deactivateKeepAwake();
    };
  }, []);

  // Ensure id is a string
  const projectId = Array.isArray(id) ? id[0] : id;
  const project = projects.find((p) => p.id === projectId);

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

  const handleStartEditing = () => {
    setNewName(project.name);
    setIsEditing(true);
  };

  const handleSaveProjectName = () => {
    if (newName.trim() !== "") {
      updateProject(project.id, {
        ...project,
        name: newName.trim(),
        updatedAt: new Date(),
      });
      setIsEditing(false);
    }
  };

  const handleCountChange = (newCount: number) => {
    updateProject(project.id, {
      ...project,
      rowCount: newCount,
      updatedAt: new Date(),
    });
  };

  const handleToggleStatus = () => {
    updateProject(project.id, {
      ...project,
      status: project.status === "in_progress" ? "finished" : "in_progress",
      updatedAt: new Date(),
    });
  };

  const handleTogglePin = () => {
    updateProject(project.id, {
      ...project,
      pinned: !project.pinned,
      updatedAt: new Date(),
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: project.name,
          headerRight: () => (
            <TouchableOpacity
              onPress={handleStartEditing}
              style={styles.editButton}
            >
              <MaterialIcons name="edit" size={24} color="#007AFF" />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        {isEditing ? (
          <View style={styles.editNameContainer}>
            <TextInput
              style={styles.nameInput}
              value={newName}
              onChangeText={setNewName}
              autoFocus
              selectTextOnFocus
              onBlur={handleSaveProjectName}
              onSubmitEditing={handleSaveProjectName}
            />
            <TouchableOpacity
              onPress={handleSaveProjectName}
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.header}>
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={handleToggleStatus}
              style={[
                styles.statusButton,
                project.status === "in_progress"
                  ? styles.statusInProgress
                  : styles.statusFinished,
              ]}
            >
              <Text style={styles.statusText}>
                {project.status === "in_progress" ? "In Progress" : "Finished"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleTogglePin}
              style={[
                styles.pinButton,
                project.pinned && styles.pinButtonActive,
              ]}
            >
              <Text>{project.pinned ? "📌" : "📍"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Counter count={project.rowCount ?? 0} onChange={handleCountChange} />
      </View>
    </>
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
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  editButton: {
    padding: 8,
    marginRight: 8,
  },
  editNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  nameInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  statusButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  statusInProgress: {
    backgroundColor: "#E3F2FD",
    borderColor: "#2196F3",
  },
  statusFinished: {
    backgroundColor: "#E8F5E9",
    borderColor: "#4CAF50",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  pinButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  pinButtonActive: {
    backgroundColor: "#FFE0B2",
  },
  error: {
    color: "#FF3B30",
    textAlign: "center",
  },
});
