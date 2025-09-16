// src/pages/Inventory.jsx
import { useState } from "react";

export default function Inventory() {
  const [inventory, setInventory] = useState([
    { id: "001", category: "A4 Paper", qtyPresent: 20, qtyUsed: 5, status: "In Stock", cost: 5.0 },
    { id: "002", category: "Printing Ink", qtyPresent: 2, qtyUsed: 1, status: "Low Stock", cost: 50.0 },
  ]);

  const [newItem, setNewItem] = useState({
    id: "",
    category: "",
    qtyPresent: "",
    qtyUsed: "",
    cost: "",
  });

  const [currency, setCurrency] = useState("₦");

  const formatCurrency = (value) => `${currency}${value.toFixed(2)}`;

  // Calculate total expenses
  const totalExpenses = inventory.reduce((sum, item) => sum + item.cost * item.qtyPresent, 0);

  // Handle input changes
  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  // Add new item
  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.id || !newItem.category) return;

    const status = newItem.qtyPresent <= 2 ? "Low Stock" : "In Stock";
    setInventory([
      ...inventory,
      {
        ...newItem,
        qtyPresent: parseInt(newItem.qtyPresent),
        qtyUsed: parseInt(newItem.qtyUsed),
        cost: parseFloat(newItem.cost),
        status,
      },
    ]);

    setNewItem({ id: "", category: "", qtyPresent: "", qtyUsed: "", cost: "" });
  };

  // Delete item
  const deleteItem = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Currency Selector */}
      <div className="flex justify-end mb-2">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="border rounded-lg p-2"
        >
          <option value="₦">₦ (Naira)</option>
          <option value="$">$ (USD)</option>
          <option value="€">€ (Euro)</option>
        </select>
      </div>

      {/* Inventory List Card */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-playfair text-purple-900 mb-4">
          Inventory List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-purple-50 text-purple-800">
                <th className="py-3 px-4 text-left">Item</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Qty Present</th>
                <th className="py-3 px-4 text-left">Qty Used</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Cost</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="py-3 px-4">{item.id}</td>
                  <td className="py-3 px-4">{item.category}</td>
                  <td className="py-3 px-4">{item.qtyPresent}</td>
                  <td className="py-3 px-4">{item.qtyUsed}</td>
                  <td className="py-3 px-4">
                    {item.status === "In Stock" ? (
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                        {item.status}
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs">
                        {item.status}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">{formatCurrency(item.cost)}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => deleteItem(item.id)}
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

        {/* Total Expenses */}
        <div className="flex justify-end mt-4">
          <p className="text-purple-900 font-semibold">
            Total Expenses:{" "}
            <span className="ml-2">{formatCurrency(totalExpenses)}</span>
          </p>
        </div>
      </div>

      {/* Add New Item Form */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-playfair text-purple-900 mb-4">
          Add New Item
        </h2>
        <form onSubmit={addItem} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="id"
            placeholder="Item ID"
            value={newItem.id}
            onChange={handleChange}
            className="p-2 border rounded-lg"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newItem.category}
            onChange={handleChange}
            className="p-2 border rounded-lg"
          />
          <input
            type="number"
            name="qtyPresent"
            placeholder="Qty Present"
            value={newItem.qtyPresent}
            onChange={handleChange}
            className="p-2 border rounded-lg"
          />
          <input
            type="number"
            name="qtyUsed"
            placeholder="Qty Used"
            value={newItem.qtyUsed}
            onChange={handleChange}
            className="p-2 border rounded-lg"
          />
          <input
            type="number"
            step="0.01"
            name="cost"
            placeholder="Cost"
            value={newItem.cost}
            onChange={handleChange}
            className="p-2 border rounded-lg"
          />
          <button
            type="submit"
            className="col-span-1 sm:col-span-2 py-2 px-4 bg-purple-700 text-white rounded-lg hover:bg-purple-800"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}
