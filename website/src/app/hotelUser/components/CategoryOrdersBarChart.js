import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const CategoryOrdersBarChart = ({ regionData, color }) => (
  <div className="w-full h-[400px] p-4 mb-8 flex flex-col items-center justify-center border border-gray-200">
    <h3 className="text-center font-semibold mb-4">{`Order Distribution in ${regionData.region}`}</h3>
    <BarChart width={1200} height={300} data={regionData.categories}>
      <XAxis dataKey="meal_category" />
      <YAxis />
      <Tooltip formatter={(value) => `${value} orders`} />
      <Legend />
      <Bar dataKey="categoryCount" fill={color} />
    </BarChart>
  </div>
);

export default CategoryOrdersBarChart;
