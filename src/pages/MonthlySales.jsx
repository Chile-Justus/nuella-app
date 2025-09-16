// src/pages/MonthlySales.jsx
import React, { useState, useRef } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSales } from "../context/SalesContext";
import html2canvas from "html2canvas";

const MonthlySales = () => {
  const { sales } = useSales();
  const [currency, setCurrency] = useState("NGN");
  const chartRef = useRef(null);

  // Group sales by month
  const monthlyTotals = sales.reduce((acc, sale) => {
    const date = sale.date ? new Date(sale.date) : new Date();
    const month = date.toLocaleString("default", { month: "short" });
    if (!acc[month]) acc[month] = 0;
    acc[month] += parseFloat(sale.amount || 0);
    return acc;
  }, {});

  // Chart data
  const monthOrder = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];
  const salesData = monthOrder
    .filter((m) => monthlyTotals[m])
    .map((month) => ({
      month,
      amount: monthlyTotals[month],
    }));

  // Total sales
  const totalSales = salesData.reduce((sum, entry) => sum + entry.amount, 0);

  // Currency formatter
  const formatCurrency = (value) => {
    switch (currency) {
      case "NGN":
        return `₦${value}`;
      case "USD":
        return `$${(value / 1600).toFixed(2)}`;
      case "EUR":
        return `€${(value / 1700).toFixed(2)}`;
      default:
        return value;
    }
  };

  // Download chart as PNG
  const downloadChart = async () => {
    if (!chartRef.current) return;
    const canvas = await html2canvas(chartRef.current);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "monthly_sales_chart.png";
    link.click();
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg relative">
      {/* Header and Currency Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-2xl font-bold text-purple-900">Monthly Sales</h2>

        <div className="mt-2 sm:mt-0 sm:absolute sm:top-6 sm:right-6">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="border p-2 rounded bg-white shadow text-sm"
          >
            <option value="NGN">₦ NGN</option>
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
          </select>
        </div>
      </div>

      {/* Chart (wrapped for export) */}
      <div ref={chartRef}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={salesData}>
            <CartesianGrid stroke="#eee" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Bar
              dataKey="amount"
              fill="#6b21a8"
              barSize={40}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary & Download */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <p className="text-lg font-semibold text-purple-900">
          Total Monthly Sales:{" "}
          <span className="ml-2">
            {formatCurrency(totalSales.toFixed(2))}
          </span>
        </p>
        <button
          onClick={downloadChart}
          className="mt-4 sm:mt-0 px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800"
        >
          Download Chart
        </button>
      </div>
    </div>
  );
};

export default MonthlySales;
