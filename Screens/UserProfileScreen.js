import { View, Text, StyleSheet } from "react-native";
import SummaryBar from "../components/SummaryBar";
import GraphSection from "../components/GraphSection";
import { useState } from "react";

function UserProfile() {
    const [selectedView, setSelectedView] = useState('thisWeek')

    const toggleView = (view) => [
        setSelectedView(view)
    ]

    return (
        <View style={styles.root}>
            <View style={styles.summaryContainer}>
                <SummaryBar selectedView={selectedView} onToggleView={toggleView} />
            </View>
            <View style={styles.analysis} >
                <GraphSection selectedView={selectedView} />
            </View>
            <View>
                <Text>KIKI</Text>
            </View>
        </View>
    );
}

export default UserProfile;

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    summaryContainer: {
        flex: 0.15,
        alignItems: 'center'
    },
    analysis: {
        flex: 0.85,

    }
})