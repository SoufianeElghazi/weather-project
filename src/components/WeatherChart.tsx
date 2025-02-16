import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { HistoricalData } from '../types/weather';

interface WeatherChartProps {
  data: HistoricalData[];
  metric: keyof HistoricalData;
  color: string;
}

const WeatherChart: React.FC<WeatherChartProps> = ({ data, metric, color }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(timestamp) => format(new Date(timestamp * 1000), 'MMM dd')}
        />
        <YAxis />
        <Tooltip
          labelFormatter={(timestamp) => format(new Date(timestamp * 1000), 'MMM dd, yyyy HH:mm')}
        />
        <Area
          type="monotone"
          dataKey={metric}
          stroke={color}
          fill={color}
          fillOpacity={0.2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default WeatherChart;