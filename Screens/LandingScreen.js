import { View, Text, StyleSheet } from "react-native";
import MainButtons from "../components/MainButtons"
import { GlobalStyles } from "../constants/styles";

function LandingScreens({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <MainButtons st
                    onPress={() => {
                        navigation.navigate('UserProfile');
                    }}
                    name="User Profile"
                />
                <MainButtons
                    onPress={() => {
                        navigation.navigate('PomodoroChallenge');
                    }}
                    name="Challenge"
                />
                <MainButtons
                    onPress={() => {
                        navigation.navigate('TimeTrack');
                    }}
                    name="TimeTrack"
                />
            </View>
        </View>

    );
}

export default LandingScreens;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: GlobalStyles.colors.primary500
    },
    buttonsContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    }
})