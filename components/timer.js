import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Timer = () => {
    const initialTime = 25 * 60; // 25 minutes in seconds
    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false); // To track if timer is running
    const [firstRender, setFirstRender] = useState(true); // To track the first render or reset

    useEffect(() => {
        let interval;

        if (isRunning) {
            // If isRunning is true, start the timer
            interval = setInterval(() => {
                setTime(prevTime => prevTime > 0 ? prevTime - 1 : 0);
            }, 1000);
        } else if (!isRunning && time !== initialTime && time !== 0) {
            // If isRunning is false, clear the interval (pause the timer)
            clearInterval(interval);
        }

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [isRunning]);

    const handleStartPause = () => {
        if (firstRender) setFirstRender(false); // After the first "Start," set firstRender to false
        setIsRunning(prevState => !prevState); // Toggle between running and paused
    };

    const handleRestart = () => {
        setTime(initialTime);
        setIsRunning(false); // Reset to initial state
        setFirstRender(true); // Allow "Start" to appear again
    };

    return (
        <View style={styles.container}>
            <View style={styles.timeContainer}>
                <Text style={styles.timerText}>{Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}</Text>
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={handleStartPause} style={styles.button}>
                    <Text>{firstRender ? 'Start' : isRunning ? 'Pause' : 'Play'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleRestart} style={styles.button}>
                    <Text>Restart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Timer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 50
    },
    timerText: {
        fontSize: 48,
    },
    buttonsContainer: {
        flexDirection: 'row',
        width: '75%',
        justifyContent: 'space-between'

    },
    button: {
        flex: 1,
        marginHorizontal: 25,
        paddingVertical: 10,
        backgroundColor: '#c9d8a6',
        borderRadius: 8,
        alignItems: 'center',
    },
    timeContainer: {
        borderBottomWidth: 2,
        borderBottomColor: '#D97DB9',
        marginBottom: 50,

    }
});
