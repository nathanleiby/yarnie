import { useFocusEffect } from "@react-navigation/native";
import { Link } from "expo-router";
import React, { useCallback, useEffect, useRef } from "react";
import {
  Animated,
  FlatList,
  LayoutAnimation,
  Platform,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { Text } from "./Themed";

/**
 * Represents a knitting/crocheting project in the application
 */
interface Project {
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
  /** Current row count */
  rowCount: number;
}

/**
 * Props for the ProjectList component
 */
interface ProjectListProps {
  projects: Project[];
  onToggleStatus: (id: string) => void;
  onTogglePin: (id: string) => void;
  error?: string | null;
  refreshProjects: () => Promise<void>;
}

// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

/**
 * Custom spring layout animation configuration for smoother transitions
 */
const CustomLayoutSpring = {
  duration: Platform.OS === "web" ? 200 : 400,
  create:
    Platform.OS === "web"
      ? {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        }
      : {
          type: LayoutAnimation.Types.spring,
          property: LayoutAnimation.Properties.scaleXY,
          springDamping: 0.7,
        },
  update:
    Platform.OS === "web"
      ? {
          type: LayoutAnimation.Types.easeInEaseOut,
        }
      : {
          type: LayoutAnimation.Types.spring,
          springDamping: 0.7,
        },
};

/**
 * ProjectList component displays a list of knitting/crocheting projects and allows for:
 * - Viewing project status
 * - Pinning projects to the top
 * - Creating new projects
 *
 * Projects are sorted by:
 * 1. Pinned status (pinned projects first)
 * 2. Status (in_progress projects first)
 * 3. Last updated time (most recent first)
 *
 * @param props - {@link ProjectListProps}
 * @returns React component
 */
export default function ProjectList({
  projects,
  onToggleStatus,
  onTogglePin,
  error,
  refreshProjects,
}: ProjectListProps) {
  // Store animation values in a ref to persist between renders
  const animationValuesRef = useRef<{ [key: string]: Animated.Value }>({});

  // Initialize or update animation values when projects change
  useEffect(() => {
    // Add new projects
    projects.forEach((project) => {
      if (!animationValuesRef.current[project.id]) {
        animationValuesRef.current[project.id] = new Animated.Value(1);
      }
    });

    // Clean up old projects
    Object.keys(animationValuesRef.current).forEach((id) => {
      if (!projects.find((p) => p.id === id)) {
        delete animationValuesRef.current[id];
      }
    });
  }, [projects]);

  // Sort projects by pinned status, in_progress status, and updatedAt
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    if (a.status !== b.status) return a.status === "in_progress" ? -1 : 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  const handleItemUpdate = (id: string, callback: () => void) => {
    const fadeAnim = animationValuesRef.current[id];
    if (!fadeAnim) return;

    // Configure layout animation for position changes
    LayoutAnimation.configureNext(CustomLayoutSpring);

    if (Platform.OS === "web") {
      // Simpler animation for web
      callback();
    } else {
      // Full animation sequence for native
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.6,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      callback();
    }
  };

  // Refresh projects when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const refresh = async () => {
        try {
          if (isActive) {
            await refreshProjects();
          }
        } catch (e) {
          console.error("Failed to refresh projects:", e);
        }
      };

      refresh();

      return () => {
        isActive = false;
      };
    }, [refreshProjects])
  );

  const renderProject = ({ item }: { item: Project }) => {
    const fadeAnim = animationValuesRef.current[item.id];
    if (!fadeAnim) return null;

    const animationStyle =
      Platform.OS === "web"
        ? {}
        : {
            opacity: fadeAnim,
            transform: [
              {
                scale: fadeAnim.interpolate({
                  inputRange: [0.6, 1],
                  outputRange: [0.97, 1],
                }),
              },
            ],
          };

    return (
      <Animated.View
        key={item.id}
        style={[
          styles.projectItem,
          item.pinned && styles.projectItemPinned,
          animationStyle,
        ]}
        testID="project-item"
      >
        <View style={styles.projectMain}>
          <Link href={`/${item.id}`} asChild>
            <TouchableOpacity style={styles.projectNameContainer}>
              <Text style={styles.projectName}>{item.name}</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() =>
              handleItemUpdate(item.id, () => onToggleStatus(item.id))
            }
            style={[
              styles.statusButton,
              item.status === "in_progress"
                ? styles.statusInProgress
                : styles.statusFinished,
            ]}
          >
            <Text style={styles.statusText}>
              {item.status === "in_progress" ? "In Progress" : "Finished"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              handleItemUpdate(item.id, () => onTogglePin(item.id))
            }
            style={[styles.pinButton, item.pinned && styles.pinButtonActive]}
          >
            <Text>{item.pinned ? "📌" : "📍"}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={sortedProjects}
        renderItem={renderProject}
        keyExtractor={(item) => item.id}
      />
      <Link href="/new" asChild>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Project</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  projectItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#fff",
    marginVertical: 4,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  projectItemPinned: {
    backgroundColor: "#FFFAF0",
    borderLeftWidth: 3,
    borderLeftColor: "#FFB74D",
  },
  projectMain: {
    flex: 1,
    paddingRight: 12,
  },
  projectNameContainer: {
    flex: 1,
  },
  projectName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
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
  errorText: {
    color: "red",
    textAlign: "center",
    margin: 16,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
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
  addButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    margin: 16,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
