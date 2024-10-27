import { User } from "../../models/User";
import { mongoConnect } from "../../utils/feature";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await mongoConnect();

  const { email, foodId, like } = await req.json();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (like) {
      if (!user.favoriteFoods.includes(foodId)) {
        user.favoriteFoods.push(foodId);
      } else {
        return NextResponse.json(
          { message: "Food already in favorites" },
          { status: 409 }
        );
      }
    } else {
      if (user.favoriteFoods.includes(foodId)) {
        user.favoriteFoods.pull(foodId);
      } else {
        return NextResponse.json(
          { message: "Food not found in favorites" },
          { status: 404 }
        );
      }
    }
    await user.save();

    return NextResponse.json(
      {
        message: like
          ? "Food added to favorites"
          : "Food removed from favorites",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
