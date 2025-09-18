// src/pages/SalesTracker.jsx
import { useState, useEffect } from "react";
import { useSales } from "../context/SalesContext";

export default function SalesTracker() {
  const { sales, addSale, deleteSale } = useSales();

  const [newSale, setNewSale] = useState({
    date: "",
    customer: "",
    product: "",
    description: "",
    quantity: "",
    amount: "",
  });

  const [currency, setCurrency] = useState("NGN"); // ✅ currency state

  const currencySymbols = {
    USD: "$",
    NGN: "₦",
    EUR: "€",
    GBP: "£",
  };



  // ✅ Save sales to localStorage whenever sales change
  useEffect(() => {
    localStorage.setItem("salesData", JSON.stringify(sales));
  }, [sales]);

  // Calculate total sales
  const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0);

  // Handle input changes
  const handleChange = (e) => {
    setNewSale({ ...newSale, [e.target.name]: e.target.value });
  };

  // Add new sale
  const handleAddSale = (e) => {
    e.preventDefault();
    if (!newSale.date || !newSale.customer || !newSale.product) return;

    const saleData = {
      ...newSale,
      id: Date.now(), // ✅ unique id for delete & persistence
      quantity: parseInt(newSale.quantity),
      amount: parseFloat(newSale.amount),
    };

    addSale(saleData);

    setNewSale({
      date: "",
      customer: "",
      product: "",
      description: "",
      quantity: "",
      amount: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Sales Tracker Card */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-playfair text-purple-900">
            Sales Tracker
          </h2>

          {/* ✅ Currency Selector */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="p-2 border rounded-lg text-sm"
          >
            <option value="NGN">₦ NGN</option>
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
            <option value="GBP">£ GBP</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-purple-50 text-purple-800">
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Customer's Name</th>
                <th className="py-3 px-4 text-left">Product</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id} className="border-t">
                  <td className="py-3 px-4">{sale.date}</td>
                  <td className="py-3 px-4">{sale.customer}</td>
                  <td className="py-3 px-4">{sale.product}</td>
                  <td className="py-3 px-4">{sale.description}</td>
                  <td className="py-3 px-4">{sale.quantity}</td>
                  <td className="py-3 px-4">
                    {currencySymbols[currency]}
                    {sale.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => deleteSale(sale.id)}
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Sales */}
        <div className="flex justify-end mt-4">
          <p className="text-purple-900 font-semibold">
            Total Sales/Profit:{" "}
            <span className="ml-2">
              {currencySymbols[currency]}
              {totalSales.toFixed(2)}
            </span>
          </p>
        </div>
      </div>

      {/* Add New Sale Form */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-playfair text-purple-900 mb-4">
          Add New Sale
        </h2>
        <form
          onSubmit={handleAddSale}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <input
            type="date"
            name="date"
            value={newSale.date}
            onChange={handleChange}
            className="p-2 border rounded-lg"
          />
          <input
            type="text"
            name="customer"
            placeholder="Customer's Name"
            value={newSale.customer}
            onChange={handleChange}
            className="p-2 border rounded-lg"
          />
          <input
            type="text"
            name="product"
            placeholder="Product"
            value={newSale.product}
            onChange={handleChange}
            className="p-2 border rounded-lg"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newSale.description}
            onChange={handleChange}
            className="p-2 border rounded-lg"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newSale.quantity}
            onChange={handleChange}
            className="p-2 border rounded-lg"
          />
          <input
            type="number"
            step="0.01"
            name="amount"
            placeholder="Amount"
            value={newSale.amount}
            onChange={handleChange}
            className="p-2 border rounded-lg"
          />
          <button
            type="submit"
            className="col-span-1 sm:col-span-2 py-2 px-4 bg-purple-700 text-white rounded-lg hover:bg-purple-800"
          >
            Add Sale
          </button>
        </form>
      </div>
    </div>
  );
}
