// pages/api/user/addFavoriteFood.ts

import { User } from "../../models/User";
import { mongoConnect } from "../../utils/feature";
import { NextRequest, NextResponse } from "next/server";

mongoConnect();
export async function POST(req: NextRequest) {
  const { email, foodId } = await req.json();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.favoriteFoods.push(foodId);
    await user.save();

    return NextResponse.json(
      { message: "Favorite foods added", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
