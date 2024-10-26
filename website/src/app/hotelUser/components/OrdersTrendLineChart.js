import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const OrdersTrendLineChart = ({ data, color }) => (
  <div className="w-full h-[400px] p-4 flex flex-col justify-center items-center border border-gray-200">
    <h3 className="text-center font-semibold mb-4">Orders Trend by Region</h3>
    <LineChart width={1200} height={300} data={data}>
      <XAxis dataKey="region" />
      <YAxis />
      <Tooltip formatter={(value) => `${value} orders`} />
      <Legend />
      <Line type="monotone" dataKey="totalOrdersInRegion" stroke={color} />
    </LineChart>
  </div>
);

export default OrdersTrendLineChart;
