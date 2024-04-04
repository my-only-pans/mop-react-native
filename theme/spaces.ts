import { Platform, StyleSheet } from "react-native";

const spaceStyles = StyleSheet.create( {
    container: {
        flex: 1,
        marginTop: Platform.OS === "web" ? 80 : 0,
        alignItems: "center",
        padding: 20,
        width: "100%",
        maxWidth: 900,
        marginHorizontal: "auto",
    },
    content: {
        maxWidth: 900,
        width: "100%",
    },
    headerContainer: {
        alignItems: "flex-start",
        flexDirection: 'row',
        justifyContent: "space-between",
        marginBottom: 14,
    },
    row: {
        flexDirection: Platform.OS !== "web" ? "column" : "row",
        gap: 20,
    },
    column: {
        flexGrow: 1,
        flexShrink: 0,
        gap: 20,
    },
    btn: {
        flex: 1,
        marginHorizontal: 5,
        textAlign: "center",
        backgroundColor: "#FAAE2B",
        width: "100%",
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
      },
      btnText: {
        textAlign: "center",
        color: "#00332C",
        fontSize: 16,
      },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
    },
});

export default spaceStyles;