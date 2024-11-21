import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

function BackNavigation({ onPress }) {
    return (
        <Pressable
            onPress={onPress}>
            <View style={styles.buttonContainer}>
                <Text style={styles.title}>Back</Text>
            </View>
        </Pressable>
    )
}

export default BackNavigation;

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 3,
        marginHorizontal: 16,
        marginVertical: 5,

    },
    title: {
        fontSize: 16,
        color: 'white'
    }
})