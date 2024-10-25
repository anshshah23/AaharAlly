import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const OrderDistributionPieChart = ({ data, colors }) => {
  return (
    <div className="h-[50vh] flex flex-col justify-center items-center w-full border border-gray-300 p-4">
      <h3 className="text-center font-semibold mb-2">Order Distribution by Region</h3>
      <PieChart width={1200} height={400}>
        <Pie
          data={data}
          dataKey="totalOrdersInRegion"
          nameKey="region"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label={({ region, totalOrdersInRegion }) => `${region}: ${totalOrdersInRegion}`}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value} orders`} />
        <Legend />
      </PieChart>
    </div>
  );
};

export default OrderDistributionPieChart;
