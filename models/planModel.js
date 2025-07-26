// app/models/planModel.js
import mongoose from 'mongoose';

const planSchema = new mongoose.Schema(
   {
    title: { type: String, required: true, trim: true },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String },
    createdBy: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);


const vac = mongoose.models.vac || mongoose.model('vac', planSchema);

export default vac;
