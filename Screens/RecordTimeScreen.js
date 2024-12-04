import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";

function RecordTime() {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [isRecording, setIsRecording] = useState(false);

    const TOGGL_API_URL = "https://api.track.toggl.com/api/v9";
    const TOGGL_WORKSPACE_ID = "<your_workspace_id>";
    const TOGGL_AUTH_HEADER = {
        auth: {
            username: "<your_email>",
            password: "<your_api_token>",
        },
    };

    const handleStart = () => {
        const now = new Date();
        setStartTime(now);
        setIsRecording(true);
        Alert.alert("Recording Started", `Start time: ${now.toISOString()}`);
    };

    const handlePause = async () => {
        if (!isRecording) {
            Alert.alert("No Active Recording", "Please start recording first.");
            return;
        }

        const now = new Date();
        setEndTime(now);
        setIsRecording(false);

        const duration = Math.floor((now - startTime) / 1000); // Duration in seconds

        // Prepare the data for the API call
        const timeEntryData = {
            created_with: "React Native App",
            description: "Recorded Time Entry",
            tags: [],
            billable: false,
            workspace_id: TOGGL_WORKSPACE_ID,
            start: startTime.toISOString(),
            duration: duration,
        };

        try {
            // Send the recorded time entry to Toggl
            const response = await axios.post(
                `${TOGGL_API_URL}/workspaces/${TOGGL_WORKSPACE_ID}/time_entries`,
                timeEntryData,
                TOGGL_AUTH_HEADER
            );

            Alert.alert(
                "Recording Paused",
                `Time entry saved. Start: ${startTime.toISOString()}, End: ${now.toISOString()}`
            );
        } catch (error) {
            console.error("Error saving time entry:", error);
            Alert.alert("Error", "Failed to save the time entry to Toggl.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Record Time</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title={isRecording ? "Recording..." : "Start Recording"}
                    onPress={handleStart}
                    color={isRecording ? "grey" : "green"}
                    disabled={isRecording}
                />
                <Button
                    title="Pause Recording"
                    onPress={handlePause}
                    color="red"
                    disabled={!isRecording}
                />
            </View>
            {startTime && <Text>Start Time: {startTime.toISOString()}</Text>}
            {endTime && <Text>End Time: {endTime.toISOString()}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginBottom: 20,
    },
});

export default RecordTime;
