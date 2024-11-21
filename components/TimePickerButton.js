import { View, Pressable, Text, StyleSheet } from "react-native"
import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

function TimePickerButton({ onPress, title, showPicker, testId, value, onChange, mode }) {
    return (
        <Pressable
            onPress={onPress}
        >
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{title}</Text>
                </View>
                {showPicker && (
                    <DateTimePicker
                        testID={testId}
                        value={value}
                        mode={mode}
                        display="default"
                        onChange={onChange}

                    />
                )}
            </View>
        </Pressable>
    )
}

export default TimePickerButton;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        paddingHorizontal: 17,
        marginVertical: 3,
        alignItems: 'flex-start',
        justifyContent: 'center',


    },
    textContainer: {
        marginLeft: 8
    },
    text: {
        marginBottom: 10,
        fontSize: 15
    }

})