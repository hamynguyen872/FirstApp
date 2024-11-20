import { Text, View, SafeAreaView, Button } from "react-native";
import React, { useState } from "react";

import DateTimePicker from '@react-native-community/datetimepicker';


function AddTime() {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    return (<View>
        <Text>This is a add screen</Text>
        <SafeAreaView>
            <Button onPress={showDatepicker} title="Show date picker!" />
            <Button onPress={showTimepicker} title="From" />
            <Button onPress={showTimepicker} title="To" />
            <Text>selected: {date.toLocaleString()}</Text>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
        </SafeAreaView>
    </View>)
}

export default AddTime;