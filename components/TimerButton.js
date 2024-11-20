import { Pressable, View, Text, StyleSheet } from "react-native";

import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from "../constants/styles";

function TimerButton({ name, icon, onPress }) {
    return (
        <Pressable onPress={onPress}
            style={({ pressed }) => pressed && styles.pressed}>
            <View style={styles.container}>
                <Text>{name}</Text>
                <Ionicons name={icon} size={50} color={GlobalStyles.colors.primary500} />
            </View>
        </Pressable >

    )
}

export default TimerButton;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    pressed: {
        backgroundColor: GlobalStyles.colors.primary400
    }
}
)