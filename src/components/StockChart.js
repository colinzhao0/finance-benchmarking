import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './StockChart.css';

function StockChart({ data, timeRange }) {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="tooltip-date">{dataPoint.time || dataPoint.date}</p>
          <p className="tooltip-price">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  const xAxisKey = timeRange === '1d' ? 'time' : 'date';

  return (
    <div className="stock-chart">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="0" stroke="#cccccc" />
          <XAxis 
            dataKey={xAxisKey}
            stroke="#666666"
            tick={{ fontSize: 11, fontFamily: 'Arial' }}
          />
          <YAxis 
            stroke="#666666"
            tick={{ fontSize: 11, fontFamily: 'Arial' }}
            domain={['auto', 'auto']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#0000cc" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, fill: '#cc0000' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StockChart;
