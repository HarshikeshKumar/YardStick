"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyExpensesChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch("/api/transaction");
      const txs = await res.json();

      const grouped = {};
      txs.forEach(({ amount, date }) => {
        const month = new Date(date).toLocaleString("default", {
          month: "short",
        });
        grouped[month] = (grouped[month] || 0) + amount;
      });

      const chartData = Object.entries(grouped).map(([month, total]) => ({
        month,
        total,
      }));

      setData(chartData);
    };
    fetchTransactions();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
