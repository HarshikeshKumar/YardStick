"use client";
import { useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyExpensesChart from "@/components/MonthlyExpensesChart";

export default function HomePage() {
  const [editData, setEditData] = useState(null);

  const handleAdd = async (form) => {
    if (editData) {
      await fetch("/api/transaction", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: editData._id }),
      });
      setEditData(null);
    } else {
      await fetch("/api/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Personal Finance Visualizer</h1>
      <TransactionForm onAdd={handleAdd} initialData={editData} />
      <TransactionList onEdit={setEditData} />
      <MonthlyExpensesChart />
    </main>
  );
}
