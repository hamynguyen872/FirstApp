import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import LandingScreens from './Screens/LandingScreen';
import UserProfile from './Screens/UserProfileScreen';
import PomodoroChallenge from './Screens/PomodoroChallengeScreen';
import TimeTrack from './Screens/TimeTrackScreen';
import AddTime from './Screens/AddTimeScreen';
import RecordTime from './Screens/RecordTimeScreen';
import BackNavigation from './components/backNavigation';
import { GlobalStyles } from './constants/styles';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function TimeOverview() {
  return <BottomTabs.Navigator screenOptions={({ navigation }) => ({
    headerStyle: { backgroundColor: GlobalStyles.colors.primary400 },
    headerTintColor: 'white',
    headerLeft: ({ tintColor }) => (
      <BackNavigation
        onPress={() => {
          navigation.navigate('Main')
        }}
      />
    )
  })}

  >
    <BottomTabs.Screen
      name='AddTime'
      component={AddTime}
    />
    <BottomTabs.Screen
      name='RecordTime'
      component={RecordTime}
    />
  </BottomTabs.Navigator>

}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer
      >
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary400 }
        }} >
          <Stack.Screen
            name="Main"
            component={LandingScreens}
            options={{
              headerTitleStyle: {
                fontSize: 18,
                fontWeight: '500',
                color: 'white',
              }
            }}
          />
          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={{
              headerTitleStyle: {
                fontSize: 16,
                fontWeight: '600',
                color: 'white',
              }
            }}
          />
          <Stack.Screen
            name="TimeTrack"
            component={TimeOverview}
            options={{ headerShown: false }}

          />
          <Stack.Screen
            name="PomodoroChallenge"
            component={PomodoroChallenge}
            options={{
              headerTitleStyle: {
                fontSize: 16,
                fontWeight: '600',
                color: 'white',
              }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});