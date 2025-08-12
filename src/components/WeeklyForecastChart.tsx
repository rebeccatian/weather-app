import { useMemo } from 'react';
import { AgCharts } from 'ag-charts-react';

import type { AgChartProps } from 'ag-charts-react';
import type { WeeklyForecastItem } from '../hooks/useTransformWeeklyData';

const WeeklyForecastChart = ({ data } : { data: WeeklyForecastItem[]}) => {
    console.log("WeeklyForecastChart Data:", data);
    console.log("First data item:", data[0]);
    console.log("Data item keys:", data[0] ? Object.keys(data[0]) : 'No data');
    
    // Chart Options: Control & configure the chart
    const chartOptions = useMemo(() => ({
        // Data: Data to be displayed in the chart
        data: data,
        // Series: Defines which chart type and data to use
        series: [
            { type: 'area', xKey: 'time', yKey: 'temperature_max', yName: 'Max Temperature', fill: '#4A4A4A' },
            { type: 'area', xKey: 'time', yKey: 'temperature_min', yName: 'Min Temperature', fill: '#D1D5DB' },
            { type: 'line', xKey: 'time', yKey: 'precipitation_probability_max', yName: 'Precipitation %', stroke: 'white', fill: 'white', marker: { fill: 'white' } },

        ],
        background: {
            visible: false
        },
        theme: 'ag-default-dark'
    } as AgChartProps['options']), [data]);

    return (
        <AgCharts options={chartOptions} />
    )
};

export default WeeklyForecastChart;