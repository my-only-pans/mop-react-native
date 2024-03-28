import { StyleSheet } from "react-native";

export const fontSizes = {
  xs: 10,
  sm: 14,
  base: 16,
  md: 20,
  lg: 28,
  xl: 32,
};

export const textStyles = StyleSheet.create({
  h1: {
    fontSize: fontSizes.xl,
    fontWeight: "bold",
  },
  h2: {
    fontSize: fontSizes.xl,
    fontWeight: "normal",
  },
  h3: {
    fontSize: fontSizes.lg,
    fontWeight: "bold",
  },
  h4: {
    fontSize: fontSizes.md,
    fontWeight: "bold",
  },
  h5: {
    fontSize: fontSizes.base,
    fontWeight: "bold",
  },
  p: {
    fontSize: fontSizes.base,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
    textAlign: "left",
  },
  subHeader: {
    fontSize: 15,
    marginBottom: 48,
    marginTop: 10,
    textAlign: "left",
  },
});
