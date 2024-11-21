import { View, Text } from "react-native";


function GraphSection({ selectedView }) {
    return (
        <View>
            {selectedView === 'thisWeek' ? (
                <View>
                    <Text>THIS WEEK GRAPHS CHANGE TO FLAT lIST</Text>
                </View>
            ) : (
                <View>
                    <Text> ALL TIME GRAPHS</Text>
                </View>
            )}
        </View>
    );
}

export default GraphSection;

// create a scrollable 