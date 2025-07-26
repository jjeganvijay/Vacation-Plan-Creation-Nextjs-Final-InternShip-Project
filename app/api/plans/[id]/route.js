import connectDB from "../../../../utils/db"; // ✅ ensure correct path
import Plan from "../../../../models/planModel";
import { NextResponse } from "next/server";
// ✅ GET one plan
export async function GET(req, { params }) {
  try {
    await connectDB();
    const plan = await Plan.findById(params.id);
    if (!plan) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }
    return NextResponse.json(plan);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching plan" }, { status: 500 });
  }
}

// ✅ UPDATE a plan
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();
    const updated = await Plan.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Error updating plan" }, { status: 500 });
  }
}

// ✅ DELETE a plan
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const deleted = await Plan.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Plan deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting plan" }, { status: 500 });
  }
}