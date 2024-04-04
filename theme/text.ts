import { StyleSheet } from "react-native";
import colors from "./colors";

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
    fontFamily: "Poppins-Bold", // Black weight
    color: colors.headline,
  },
  h2: {
    fontSize: fontSizes.xl,
    fontWeight: "normal",
    fontFamily: "Poppins-Regular", // Normal weight
  },
  h3: {
    fontSize: fontSizes.lg,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold", // Bold weight
  },
  h4: {
    fontSize: fontSizes.lg,
    fontWeight: "normal",
  },
  h5: {
    fontSize: fontSizes.md,
    fontWeight: "bold",
    fontFamily: "Poppins-SemiBold", // Semi-bold weight
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
    fontFamily: "Poppins-Medium", // Medium weight
  },
  h6: {
    fontSize: fontSizes.base,
    fontWeight: "normal",
    fontFamily: "Poppins-Light", // Light weight
  },
  body: {
    fontSize: fontSizes.base,
    fontWeight: "normal",
    fontFamily: "Poppins-Regular", // Normal weight
  },
  italic: {
    fontSize: fontSizes.base,
    fontWeight: "normal",
    fontFamily: "Poppins-Italic", // Italic style
  },
  boldItalic: {
    fontSize: fontSizes.base,
    fontWeight: "bold",
    fontFamily: "Poppins-BoldItalic", // Bold Italic style
  },
});

export default textStyles;
