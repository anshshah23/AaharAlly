import mongoose from "mongoose";

const FoodPreferenceSchema = new mongoose.Schema({
  food_category: {
    type: String,
    required: true,
  },
  minAge: {
    type: Number,
    required: true,
  },
  maxAge: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.FoodPreference ||
  mongoose.model("FoodPreference", FoodPreferenceSchema);
