import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CounterProps {
  /** The current count value */
  count?: number;
  /** Callback function when count changes */
  onChange: (newCount: number) => void;
}

const Counter: React.FC<CounterProps> = ({ count = 0, onChange }) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleIncrement = () => {
    onChange(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      onChange(count - 1);
    }
  };

  const handleReset = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    onChange(0);
    setShowResetConfirm(false);
  };

  const cancelReset = () => {
    setShowResetConfirm(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.count} testID="count-display">
        {count.toLocaleString()}
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.smallButton]}
          onPress={handleDecrement}
          testID="decrement-button"
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.largeButton]}
          onPress={handleIncrement}
          testID="increment-button"
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.resetButton]}
        onPress={handleReset}
        testID="reset-button"
      >
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showResetConfirm}
        onRequestClose={cancelReset}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reset Counter?</Text>
            <Text style={styles.modalText}>
              This will reset the counter to zero. This action cannot be undone.
            </Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalButton} onPress={cancelReset}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.modalButtonDanger]}
                onPress={confirmReset}
              >
                <Text
                  style={[styles.modalButtonText, styles.modalButtonTextDanger]}
                >
                  Reset
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  count: {
    fontSize: 72,
    fontWeight: "bold",
    marginBottom: 40,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  smallButton: {
    width: 60,
    height: 60,
  },
  largeButton: {
    width: 120,
    height: 120,
  },
  resetButton: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    padding: 10,
    minWidth: 100,
    alignItems: "center",
  },
  modalButtonDanger: {
    backgroundColor: "#FF3B30",
    borderRadius: 8,
  },
  modalButtonText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
  modalButtonTextDanger: {
    color: "white",
  },
});

export default Counter;
