import { Text, View, SafeAreaView, Button, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";

import DateTimePicker from '@react-native-community/datetimepicker';
import TimePickerButton from "../components/TimePickerButton";
import Input from "../components/Input";
import { GlobalStyles } from "../constants/styles";


function AddTime() {
    // set up state for input
    const [desValue, setDesValue] = useState('')

    // set up state for each button
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());

    // onChange for each button 
    const [showStartPicker, setStartPicker] = useState(true);
    const [showEndPicker, setEndPicker] = useState(true);
    const [showDatePicker, setDatePicker] = useState(true);

    const onChangeStart = (event, selectedDate) => {
        setStartPicker(true);
        if (selectedDate) {
            setStartTime(selectedDate)
        }
    }

    const onChangeEnd = (event, selectedDate) => {
        setEndPicker(true);
        if (selectedDate) {
            setEndTime(selectedDate)
        }
    }

    const onChangeDate = (event, selectedDate) => {
        setDatePicker(true);
        if (selectedDate) {
            setSelectedDate(selectedDate)
        }
    }

    function inputChangedHandler(enteredValue) {
        setDesValue(enteredValue);
    }


    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Log your study time!</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <View style={styles.dateContainer}>
                    <TimePickerButton
                        title='Date'
                        showPicker={showDatePicker}
                        onPress={() => setDatePicker(true)}
                        testId="datePicker"
                        value={selectedDate}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                        accentColor='red'

                    />
                </View>
                <View style={styles.timeContainer}>
                    <TimePickerButton
                        title='Start Time'
                        showPicker={showStartPicker}
                        onPress={() => setStartPicker(true)}
                        testId="startPicker"
                        value={startTime}
                        mode="time"
                        display="default"
                        onChange={onChangeStart}
                    />
                    <TimePickerButton
                        title='End Time'
                        showPicker={showEndPicker}
                        onPress={() => setEndPicker(true)}
                        testId="endPicker"
                        value={endTime}
                        mode="time"
                        display="default"
                        onChange={onChangeEnd}
                    />
                </View>
                <Input
                    label={'Description'}
                    textConfig={
                        {
                            value: desValue,
                            onChangeText: inputChangedHandler,
                            placeholder: 'What have you studied?'
                        }
                    }
                />
            </View>
        </View>)
}

export default AddTime;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20

    },
    textContainer: {
        marginVertical: 20
    },
    buttonsContainer: {
        marginTop: 30
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    dateContainer: {
        alignItems: 'flex-start',
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: GlobalStyles.colors.accent600
    }

})