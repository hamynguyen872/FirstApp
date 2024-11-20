import { View, Text, StyleSheet } from "react-native";

function IntroBar() {
    return <View style={styles.container}>
        <Text style={styles.description}>Boost your focus and productivity with the Pomodoro Method—your
            ultimate tool for mastering time. Work in 25-minute bursts,
            take short breaks, and watch distractions fade away.
            It’s not just time management; it’s a game-changer for staying sharp, energized, and unstoppable.
            Say goodbye to procrastination and power through your tasks with ease! </Text>
    </View>
}

export default IntroBar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D97DB9'
    },
    description: {
        fontSize: 14,
        color: 'white',
        margin: 10,
        // textAlign: 'justif'
    }
})