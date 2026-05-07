"use client";

import { useEffect, useState } from "react";

type Order = { _id: string; studentName: string; service: string; status: string; paymentStatus: string; deadline: string };
const statuses = ["In Progress", "Review", "Completed"];

/** Displays active client orders with payment state, deadlines, and status toggles. */
export function FounderDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /** Loads current orders from the database-backed API route. */
  async function loadOrders() {
    const response = await fetch("/api/orders");
    const data = await response.json();
    setOrders(data.orders ?? []);
    setIsLoading(false);
  }

  /** Optimistically updates the status toggle and persists it through the API. */
  async function updateStatus(orderId: string, status: string) {
    setOrders((current) => current.map((order) => order._id === orderId ? { ...order, status } : order));
    await fetch("/api/orders", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId, status }) });
  }

  useEffect(() => { loadOrders(); }, []);

  return (
    <section className="glass-card p-6">
      <p className="text-sm uppercase tracking-[0.3em] text-electric">Client & Order Dashboard</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">Live fulfillment queue</h2>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="text-slate-400"><tr><th className="p-3">Student</th><th>Service</th><th>Payment</th><th>Deadline</th><th>Status</th></tr></thead>
          <tbody>
            {isLoading ? <tr><td className="p-3 text-slate-300" colSpan={5}>Loading orders...</td></tr> : orders.map((order) => (
              <tr key={order._id} className="border-t border-white/10">
                <td className="p-3 font-semibold text-white">{order.studentName}</td>
                <td>{order.service}</td>
                <td><span className={order.paymentStatus === "Paid" ? "text-emerald-300" : "text-amber-300"}>{order.paymentStatus}</span></td>
                <td>{order.deadline}</td>
                <td><select className="focus-ring rounded-xl border border-white/10 bg-ink p-2" value={order.status} onChange={(event) => updateStatus(order._id, event.target.value)}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
