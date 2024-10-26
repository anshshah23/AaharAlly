import mongoose, { Document, Schema, Types } from "mongoose";

interface IUser extends Document {
  email: string;
  favoriteFoods: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true },
  favoriteFoods: [{ type: Schema.Types.ObjectId, ref: "food" }],
});

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
