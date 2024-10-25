"use client";
import React, { useEffect, useState } from 'react';
import OrderDistributionPieChart from './components/OrderDistributionPieChart';
import CategoryOrdersBarChart from './components/CategoryOrdersBarChart';
import OrdersTrendLineChart from './components/OrdersTrendLineChart';
import FileAdd from './components/FileAdd';

const COLORS = [
  '#FF0000', // Red
  '#FFA500', // Orange
  '#008000', // Green
  '#4B0082',
  '#FF69B4',
  '#FF1493',
  '#FFD700',
  '#FF6347',
  '#0000FF',
  '#808080',
  '#FF00FF',
  '#FF8C00',
  '#800080',
  '#00FFFF',
  '#A52A2A',
  '#000000',
  '#008080',
];


const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/Chart');
        if (!response.ok) throw new Error('Failed to fetch data');

        const result = await response.json();
        setData(result.data || []);
        setTotalOrders(result.totalOrders || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 space-y-8 mx-auto my-10">
      <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>
      <p className="text-center">Total Orders: {totalOrders}</p>

      <OrderDistributionPieChart data={data} colors={COLORS} />
      <OrdersTrendLineChart data={data} color={COLORS[0]} />

      {data.map((regionData) => (
        regionData.categories ? (
          <CategoryOrdersBarChart key={regionData.region} regionData={regionData} color={COLORS[1]} />
        ) : (
          <p key={regionData.region}>No category data for {regionData.region}</p>
        )
      ))}
      <FileAdd />

    </div>
  );
};

export default AdminDashboard;
