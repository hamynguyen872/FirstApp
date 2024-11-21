import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

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
        borderColor: GlobalStyles.colors.primary300,
        width: 250,
        height: 50,
        backgroundColor: GlobalStyles.colors.primary400
    },
    button: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    text: {
        color: GlobalStyles.colors.primaryText,
        fontSize: 18,
        fontWeight: 'bold',

    }
})