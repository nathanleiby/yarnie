import { Text } from "@/components/Themed";
import { useProjects } from "@/hooks/useProjects";
import { Stack, router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function NewProjectScreen() {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { createProject, refreshProjects } = useProjects();

  const handleCreate = async () => {
    if (!name.trim()) {
      setError("Project name is required");
      return;
    }

    try {
      const newProject = await createProject({ name: name.trim() });
      await refreshProjects();
      router.replace(`/${newProject.id}`);
    } catch (e) {
      setError("Failed to create project");
      console.error(e);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "New Project",
        }}
      />
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.label}>Project Name *</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(text) => {
              setName(text);
              setError(null);
            }}
            placeholder="Enter project name"
            autoFocus
          />
          {error && <Text style={styles.error}>{error}</Text>}
          <TouchableOpacity
            style={[styles.button, !name.trim() && styles.buttonDisabled]}
            onPress={handleCreate}
            disabled={!name.trim()}
          >
            <Text style={styles.buttonText}>Create Project</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  form: {
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    color: "#FF3B30",
  },
});
