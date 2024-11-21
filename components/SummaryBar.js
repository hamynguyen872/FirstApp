import { View, Text, Pressable, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

function SummaryBar({ selectedView, onToggleView }) {
    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <View style={styles.toggleButtons}>
                    <Pressable
                        onPress={() => onToggleView('thisWeek')}
                        style={[styles.button, selectedView === 'thisWeek' && styles.activeButton]}
                    >
                        <Text style={[styles.buttonText, selectedView === 'thisWeek' && styles.activeText]}>This Week</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => onToggleView('allTime')}
                        style={[styles.button, selectedView === 'allTime' && styles.activeButton]}
                    >
                        <Text style={[styles.buttonText, selectedView === 'allTime' && styles.activeText]}>All Time</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.summary}>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryValue}>48h</Text>
                    <Text style={styles.summaryLabel}>You've spent</Text>
                </View>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryValue}>95%</Text>
                    <Text style={styles.summaryLabel}>Productivity Score</Text>
                </View>
            </View>
        </View>
    );
}

export default SummaryBar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 20,
        backgroundColor: GlobalStyles.colors.primary500,


    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,

    },
    toggleButtons: {
        flexDirection: 'row',
        borderRadius: 9,
        overflow: 'hidden',
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        backgroundColor: GlobalStyles.colors.primary400
    },
    activeButton: {
        backgroundColor: GlobalStyles.colors.primary300,
    },
    buttonText: {
        fontSize: 12,
        color: 'white',
    },
    activeText: {
        color: 'white'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 8,
        marginBottom: 10
    },
    summaryItem: {
        alignItems: 'center',
    },
    summaryValue: {
        fontSize: 23,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primaryText
    },
    summaryLabel: {
        fontSize: 15,
        color: 'white',
    },
});
