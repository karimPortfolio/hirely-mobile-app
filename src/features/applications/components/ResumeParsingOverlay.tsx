import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

interface ResumeParsingOverlayProps {
  parsingResume: boolean;
  cancelParsing: () => void;
  isDark?: boolean;
}

export const ResumeParsingOverlay: React.FC<ResumeParsingOverlayProps> = ({
  parsingResume,
  cancelParsing,
  isDark = false,
}) => {
  if (!parsingResume) return null;

  return (
    <View
      style={[
        styles.overlay,
        {
          backgroundColor: isDark
            ? "rgba(24, 24, 27, 0.85)"
            : "rgba(255, 255, 255, 0.85)",
        },
      ]}
    >
      <View style={styles.headerRow}>
        <ActivityIndicator
          size="small"
          color={isDark ? "#E4E4E7" : "#374151"}
        />
        <Text
          style={[styles.titleText, { color: isDark ? "#F4F4F5" : "#374151" }]}
        >
          Generating information from resume...
        </Text>
      </View>

      <Text
        style={[styles.subtitleText, { color: isDark ? "#A1A1AA" : "#6B7280" }]}
      >
        Please wait, this will only take a moment.
      </Text>

      <TouchableOpacity
        onPress={cancelParsing}
        activeOpacity={0.7}
        style={[styles.button, { borderColor: isDark ? "#3F3F46" : "#D1D5DB" }]}
      >
        <Text
          style={[styles.buttonText, { color: isDark ? "#F4F4F5" : "#374151" }]}
        >
          Cancel parsing
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill, // absolute inset-0
    zIndex: 10,
    borderRadius: 8,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleText: {
    fontSize: 14,
    fontWeight: "500",
  },
  subtitleText: {
    fontSize: 12,
  },
  button: {
    marginTop: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
