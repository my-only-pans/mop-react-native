import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import colors from "../../../../theme/colors";

interface Props {};

const routes = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/privacy/terms", label: "Terms and Conditions" },
    { href: "/privacy/community", label: "Community Guidelines" },
    { href: "/privacy/termsprivacy", label: "Terms and Privacy" },
];

const PrivacyMenu = (props: Props) => {
    const {} = props;

    return (
        <View style={styles.container}>
        {routes.map(({ href, label }) => (
            <Link key={href} href={href} style={styles.link}>
            <Text style={styles.linkText}>{label}</Text>
            </Link>
        ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingVertical: 10,
    },
    link: {
        marginHorizontal: 10, 
    },
    linkText: {
        color: colors.primary, 
        fontSize: 28, 
    },
});

export default PrivacyMenu;
