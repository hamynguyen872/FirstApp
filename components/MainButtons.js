import { Pressable, View, Text, StyleSheet } from "react-native";

function MainButtons({ onPress, name = "Default Text" }) {
    return (
        <View style={styles.buttonContainer}>
            <Pressable onPress={onPress} style={styles.button}>
                <Text style={styles.text}>{name}</Text>
            </Pressable>
        </View>

    );
}

export default MainButtons;

const styles = StyleSheet.create({
    buttonContainer: {
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#bf6d72",
        width: 250,
        height: 50,
        backgroundColor: "#c9d8a6"
    },
    button: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    text: {
        color: '#BC8F8F',
        fontSize: 18,
        fontWeight: 'bold',

    }
})