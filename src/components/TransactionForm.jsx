"use client";
import { useState } from "react";

export default function TransactionForm({ onAdd, initialData = null }) {
  const [form, setForm] = useState(
    initialData || {
      amount: "",
      description: "",
      date: "",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.description || !form.date) {
      alert("Please fill all fields");
      return;
    }
    onAdd(form);
    setForm({ amount: "", description: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-2">
      <input
        className="border p-2 w-full"
        placeholder="Amount"
        type="number"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        type="submit"
      >
        Save
      </button>
    </form>
  );
}
