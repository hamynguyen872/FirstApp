import { TextInput, View, StyleSheet, Text } from "react-native";

function Input({ label, textConfig }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{label}</Text>
            <TextInput style={styles.input} {...textConfig} />
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 25,
        marginTop: 10
    },
    input: {
        padding: 6,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'grey',
        marginTop: 10,
        padding: 12,
        marginLeft: 3

    },
    text: {
        textAlign: 'left',
        fontSize: 15
    }
})