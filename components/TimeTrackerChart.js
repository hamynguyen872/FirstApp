import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import { scaleBand } from 'd3-scale';

import { format } from "date-fns";
import { BarChart, YAxis, XAxis, Grid } from "react-native-svg-charts";
import SummaryBar from "./SummaryBar";
import { GlobalStyles } from "../constants/styles";

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
                // Start of this week (Sunday)
                const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());

                // Just the date (YYYY-MM-DD), no time
                const thisWeekDate = startOfWeek.toISOString().split('T')[0];
                const todayDate = new Date().toISOString().split('T')[0];

                const startDate = selectedView === "thisWeek" ? thisWeekDate : "2024-01-01";
                const endDate = todayDate;


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


                console.log('About to print data')
                const timeEntries = response.data;
                console.log(timeEntries)

                console.log('Clean data ')

                const aggregatedData = timeEntries.reduce((acc, entry) => {
                    if (entry.start && entry.duration > 0) {
                        // We still use date-fns to format the date from the entry's start time
                        const date = format(new Date(entry.start), "yyyy-MM-dd");
                        const hours = entry.duration / 3600;
                        acc[date] = (acc[date] || 0) + hours;
                    }
                    return acc;
                }, {});

                console.log('clean data 2')

                const chartData = Object.keys(aggregatedData).map(date => ({
                    date,
                    hours: aggregatedData[date],
                }));
                console.log('clean data 3')

                setTimeData(chartData);
                console.log(chartData)

                const totalHours = chartData.reduce((sum, entry) => sum + entry.hours, 0);
                console.log('clean data 5')

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

    const hoursData = timeData.map(item => item.hours);
    const labels = timeData.map(item => item.date);

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
                    <YAxis
                        data={hoursData}
                        contentInset={{ top: 10, bottom: 10 }}
                        svg={{ fontSize: 12, fill: "white" }}
                        numberOfTicks={5}
                    />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <BarChart
                            style={{ flex: 1 }}
                            data={hoursData}
                            svg={{ fill: "skyblue" }}
                            contentInset={{ top: 10, bottom: 10 }}
                            spacingInner={0.4}
                        >
                            <Grid />
                        </BarChart>
                        <XAxis
                            style={{ marginHorizontal: -10, height: 20 }}
                            data={labels}
                            formatLabel={(value, index) => labels[index]}
                            scale={scaleBand}
                            svg={{ fontSize: 15, fill: "white", textAnchor: "middle" }}
                        />
                    </View>
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
        flex: 1,
        flexDirection: "row",
        height: 500,
        marginTop: 5,
        borderColor: 'white',
        borderWidth: 3,
        paddingLeft: 10,
        paddingBottom: 20

    }
});
