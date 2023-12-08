import mongoose from "mongoose";

mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI!);

const codeSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

export const codeModel =
  mongoose.models.codes || mongoose.model("codes", codeSchema);
