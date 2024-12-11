import React from "react";
import * as d3 from "d3-shape";
import * as scale from "d3-scale";
import { Svg, Path } from "react-native-svg";
import { extent, max } from "d3-array";

import { View, Text, StyleSheet } from "react-native";
import MainButtons from "../components/MainButtons";
import { GlobalStyles } from "../constants/styles";

const SimpleLineChart = () => {
  // Sample data points
  const data = [
    { x: new Date(2024, 0, 1), y: 50 },
    { x: new Date(2024, 1, 1), y: 80 },
    { x: new Date(2024, 2, 1), y: 65 },
    { x: new Date(2024, 3, 1), y: 95 },
  ];

  // Chart dimensions
  const width = 300;
  const height = 200;
  const margin = { top: 10, right: 10, bottom: 10, left: 10 };

  // Scales
  const xScale = scale
    .scaleTime()
    .domain(extent(data, (d) => d.x))
    .range([margin.left, width - margin.right]);

  const yScale = scale
    .scaleLinear()
    .domain([0, max(data, (d) => d.y)])
    .range([height - margin.bottom, margin.top]);

  // Line generator
  const line = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .curve(d3.curveMonotoneX); // Smooth the curve

  const pathData = line(data);

  return (
    <View style={styles.container}>
      <Svg height={height} width={width}>
        <Path d={pathData} fill="none" stroke="blue" strokeWidth={2} />
      </Svg>
    </View>
  );
};

function LandingScreens({ navigation }) {
  const data = [
    { number: 8, name: "Fun activities" },
    { number: 7, name: "Dog" },
    { number: 16, name: "Food" },
    { number: 23, name: "Car" },
    { number: 42, name: "Rent" },
    { number: 4, name: "Misc" },
  ];

  console.log(data);

  //   const arcs = d3.pie();/

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <MainButtons
          st
          onPress={() => {
            navigation.navigate("UserProfile");
          }}
          name="User Profile"
        />
        <MainButtons
          onPress={() => {
            navigation.navigate("PomodoroChallenge");
          }}
          name="Challenge"
        />
        <MainButtons
          onPress={() => {
            navigation.navigate("TimeTrack");
          }}
          name="TimeTrack"
        />
      </View>
      <View style={{ flex: 1 }}>
        <SimpleLineChart />
      </View>
    </View>
  );
}

export default LandingScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: GlobalStyles.colors.primary500,
  },
  buttonsContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
});
