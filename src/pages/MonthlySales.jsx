// src/components/MonthlySales.jsx
import { useMemo, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useSales } from "../context/SalesContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function MonthlySales() {
  const { sales } = useSales();
  const chartRef = useRef();

  // ✅ Compute monthly totals
  const monthlyTotals = useMemo(() => {
    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];
    const totals = months.map((m) => ({ month: m, sales: 0 }));

    sales.forEach((sale) => {
      if (!sale.date) return;
      const monthIndex = new Date(sale.date).getMonth();
      totals[monthIndex].sales += sale.amount;
    });

    return totals;
  }, [sales]);

  // ✅ Download chart as PDF
  const downloadPDF = async () => {
    const chartElement = chartRef.current;
    if (!chartElement) return;

    const canvas = await html2canvas(chartElement);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "mm", "a4");
    pdf.setFontSize(16);
    pdf.text("Monthly Sales Overview", 14, 20);
    pdf.addImage(imgData, "PNG", 10, 30, 270, 120);
    pdf.save("monthly-sales.pdf");
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md p-6 mt-6"
      ref={chartRef}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-playfair text-purple-900">
          Monthly Sales Overview
        </h2>
        <button
          onClick={downloadPDF}
          className="py-2 px-4 bg-purple-700 text-white rounded-lg hover:bg-purple-800"
        >
          Download PDF
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyTotals} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="sales"
            fill="#7e3af2"
            radius={[6, 6, 0, 0]}
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
