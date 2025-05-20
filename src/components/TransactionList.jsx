"use client";
import { useEffect, useState } from "react";

export default function TransactionList({ onEdit }) {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const res = await fetch("/api/transaction");
    const data = await res.json();
    setTransactions(data);
  };

  const deleteTransaction = async (id) => {
    await fetch(`/api/transaction?id=${id}`, { method: "DELETE" });
    fetchTransactions();
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Transactions</h2>
      <ul className="space-y-2">
        {transactions.map((tx) => (
          <li
            key={tx._id}
            className="border p-2 flex justify-between items-center"
          >
            <div>
              <p>
                {tx.description} - ₹{tx.amount}
              </p>
              <small>{new Date(tx.date).toDateString()}</small>
            </div>
            <div className="space-x-2">
              <button onClick={() => onEdit(tx)} className="text-blue-600">
                Edit
              </button>
              <button
                onClick={() => deleteTransaction(tx._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
