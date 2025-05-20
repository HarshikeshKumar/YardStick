

import { connectDB } from "@/lib/mongodb";
import { Transaction } from "@/models/transactionModel";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json(transactions);
  } else if (req.method === "POST") {
    const { amount, description, date } = req.body;
    const transaction = new Transaction({ amount, description, date });
    await transaction.save();
    res.status(201).json(transaction);
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    await Transaction.findByIdAndDelete(id);
    res.status(204).end();
  } else if (req.method === "PUT") {
    const { id, amount, description, date } = req.body;
    const updated = await Transaction.findByIdAndUpdate(id, {
      amount,
      description,
      date,
    });
    res.status(200).json(updated);
  } else {
    res.status(405).end();
  }
}
