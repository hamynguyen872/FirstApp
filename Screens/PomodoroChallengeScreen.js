import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";

import IntroBar from "../components/IntroBar";
import TimerButton from "../components/TimerButton";
import Timer from "../components/timer";


function PomodoroChallenge() {
    return (
        <View style={styles.container}>
            <View style={styles.introContainer}>
                <IntroBar />
            </View>
            <View style={styles.buttonContainer}>
                <Timer />
            </View>
        </View>)
}

export default PomodoroChallenge;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    introContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    buttonContainer: {
        flex: 4,
        justifyContent: 'center',
    }

})