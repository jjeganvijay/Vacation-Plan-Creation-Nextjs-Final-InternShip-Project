import connectDB  from "../../../lib/mongodb";
import  Plan  from "../../../models/planModel";
import mongoose from "mongoose";

import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route"; // Adjust path if needed

export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    // Inject the user's email as createdBy
    const newPlan = new Plan({
      ...data,
      createdBy: session.user.email,
    });

    const savedPlan = await newPlan.save();

    return Response.json({ success: true, message: "Plan created", data: savedPlan });
  } catch (error) {
    console.error("POST error:", error);
    return Response.json({ success: false, message: "Failed to create plan" }, { status: 500 });
  }
}
export async function GET() {
  try {
    await connectDB();
    const plans = await Plan.find().sort({ createdAt: -1 });
    return Response.json({ success: true, data: plans });
  } catch (error) {
    return Response.json({ success: false, message: "Failed to fetch plans" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const data = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ success: false, message: "Invalid plan ID" }, { status: 400 });
    }

    const updatedPlan = await Plan.findByIdAndUpdate(id, data, { new: true });

    if (!updatedPlan) {
      return Response.json({ success: false, message: "Plan not found" }, { status: 404 });
    }

    return Response.json({ success: true, message: "Plan updated", data: updatedPlan });
  } catch (error) {
    console.error("PUT error:", error);
    return Response.json({ success: false, message: "Failed to update plan" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ success: false, message: "Invalid plan ID" }, { status: 400 });
    }

    const deletedPlan = await Plan.findByIdAndDelete(id);

    if (!deletedPlan) {
      return Response.json({ success: false, message: "Plan not found" }, { status: 404 });
    }

    return Response.json({ success: true, message: "Plan deleted", data: deletedPlan });
  } catch (error) {
    console.error("DELETE error:", error);
    return Response.json({ success: false, message: "Failed to delete plan" }, { status: 500 });
  }
}