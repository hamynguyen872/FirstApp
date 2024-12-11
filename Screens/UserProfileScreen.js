import { View, Text, StyleSheet } from "react-native";
import TimeTrackerChart from "../components/TimeTrackerChart"; // Import the integrated component

function UserProfile() {
    return (
        <View style={styles.root}>
            <TimeTrackerChart />

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
    }
});
