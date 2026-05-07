import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/db";

const fallbackOrders = [
  { _id: "demo-1", studentName: "Aarav Sharma", service: "Leave Note", status: "In Progress", paymentStatus: "Paid", deadline: "2026-05-09" },
  { _id: "demo-2", studentName: "Mia Patel", service: "Assignment Polish", status: "Review", paymentStatus: "Pending", deadline: "2026-05-08" },
  { _id: "demo-3", studentName: "Noah Khan", service: "Project Documentation", status: "Completed", paymentStatus: "Paid", deadline: "2026-05-12" }
];

/** Fetches the latest orders from MongoDB, with demo data when no database is configured. */
export async function GET() {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ orders: fallbackOrders });
  }

  const database = await getDatabase();
  const orders = await database.collection("orders").find({}).sort({ deadline: 1 }).limit(50).toArray();
  return NextResponse.json({ orders });
}

/** Updates an order status toggle for the founder dashboard. */
export async function PATCH(request: Request) {
  try {
    const { orderId, status } = await request.json();
    if (!orderId || !["In Progress", "Review", "Completed"].includes(status)) {
      return NextResponse.json({ error: "Valid orderId and status are required." }, { status: 400 });
    }

    if (!process.env.MONGODB_URI || orderId.startsWith("demo-")) {
      return NextResponse.json({ orderId, status });
    }

    const database = await getDatabase();
    await database.collection("orders").updateOne({ _id: new ObjectId(orderId) }, { $set: { status } });
    return NextResponse.json({ orderId, status });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update order.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
