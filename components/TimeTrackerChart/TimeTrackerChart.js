import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import { scaleBand, scaleLinear } from 'd3-scale';
import { Svg, Rect, Text, Line } from "react-native-svg";
import { max } from "d3-array";

import SummaryBar from "../SummaryBar";
import { GlobalStyles } from "../../constants/styles";

const TOGGL_TOKEN = "131347cb9549e57dfe86bc01b3fab3e4";

function TimeTrackerChart() {
    const [timeData, setTimeData] = useState([]);
    const [selectedView, setSelectedView] = useState("thisWeek");
    const [loading, setLoading] = useState(true);
    const [summaryData, setSummaryData] = useState({ totalHours: 0, productivity: "N/A" });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const now = new Date();
                const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - ((now.getDay() + 6) % 7));

                const thisWeekDate = startOfWeek.toISOString().split('T')[0];

                const adjustedToday = new Date();
                adjustedToday.setDate(adjustedToday.getDate() + 1);
                const todayDateInclusive = adjustedToday.toISOString().split('T')[0];

                const startDate = selectedView === "thisWeek" ? thisWeekDate : "2024-01-01";
                const endDate = todayDateInclusive;
                console.log("End date is: ", endDate)

                const response = await axios.get(
                    "https://api.track.toggl.com/api/v9/me/time_entries",
                    {
                        auth: {
                            username: TOGGL_TOKEN,
                            password: "api_token"
                        },
                        params: { start_date: startDate, end_date: endDate },
                    }
                );

                const timeEntries = response.data;

                const days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
                const aggregatedData = timeEntries.reduce((acc, entry) => {
                    if (entry.start && entry.duration > 0) {
                        const dateObject = new Date(entry.start);
                        const dayOfWeek = (dateObject.getDay() + 6) % 7
                        const day = days[dayOfWeek];

                        const hours = entry.duration / 3600;
                        acc[day] = (acc[day] || 0) + hours;
                    }
                    return acc;
                }, {});

                const filledAggregatedData = days.reduce((acc, day) => {
                    acc[day] = aggregatedData[day] || 0;
                    return acc;
                }, {});

                const chartData = days.map(day => ({
                    day,
                    hours: filledAggregatedData[day],
                }));

                // console.log("Raw Time Entries:", timeEntries);
                console.log("Aggregated Data:",);
                console.log("Chart Data:", chartData);
                setTimeData(chartData);

                const totalHours = chartData.reduce((sum, entry) => sum + entry.hours, 0);
                const productivity = Math.min(100, (totalHours / 40) * 100).toFixed(2);

                setSummaryData({ totalHours: totalHours.toFixed(1), productivity });
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedView]);

    const { width } = Dimensions.get("window");

    const BarChart = ({ data }) => {
        const chartWidth = width - 40;
        const chartHeight = 300;

        const margin = { top: 20, right: 20, bottom: 60, left: 40 };

        const xScale = scaleBand()
            .domain(data.map((d) => d.day))
            .range([margin.left, chartWidth - margin.right])
            .padding(0.2);
        // aggregatedData
        const yScale = scaleLinear()
            .domain([0, max(data, (d) => d.hours)])
            .range([chartHeight - margin.bottom, margin.top]);

        return (
            <Svg width={chartWidth} height={chartHeight}>
                {/* horizontal grid lines for y-axis */}
                {yScale.ticks(5).map((tick) => (
                    <Line
                        key={`grid-${tick}`}
                        x1={margin.left}
                        x2={chartWidth - margin.right}
                        y1={yScale(tick)}
                        y2={yScale(tick)}
                        stroke="#e0e0e0"
                        strokeWidth={1}
                    />
                ))}
                {data.map((item, index) => (
                    <Rect
                        key={`bar-${index}`}
                        x={xScale(item.day)}
                        y={yScale(item.hours)}
                        width={xScale.bandwidth()}
                        height={chartHeight - margin.bottom - yScale(item.hours)}
                        fill="pink"
                    />
                ))}

                {/* label */}
                {data.map((item, index) => (
                    <Text
                        key={`label-${index}`}
                        x={xScale(item.day) + xScale.bandwidth() / 2}
                        y={chartHeight - margin.bottom + 15}
                        fontSize="12"
                        fill="white"
                        textAnchor="middle"
                    >
                        {item.day}
                    </Text>
                ))}
                {yScale.ticks(5).map((tick, index) => (
                    <Text
                        key={`y-label-${index}`}
                        x={margin.left - 10}
                        y={yScale(tick)}
                        fontSize="12"
                        fill="white"
                        textAnchor="end"
                        alignmentBaseline="middle"
                    >
                        {tick}
                    </Text>
                ))}
            </Svg>
        );
    };

    return (
        <View style={styles.screenContainer}>
            <SummaryBar
                selectedView={selectedView}
                onToggleView={setSelectedView}
                summaryData={summaryData}
            />
            {loading ? (
                <ActivityIndicator size="large" color="white" />
            ) : (
                <View style={styles.graphContainer}>
                    <BarChart data={timeData} />
                </View>
            )}
        </View>
    );
}

export default TimeTrackerChart;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: GlobalStyles.colors.primary500,
    },
    graphContainer: {
        marginTop: 20,
    },
});
