// pages/api/user/create.ts

import { NextRequest, NextResponse } from "next/server";
import { User } from "../../models/User";
import { mongoConnect } from "../../utils/feature";

mongoConnect();
export async function POST(req: NextRequest) {
  const { email } = await req.json();

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const newUser = new User({ email });
    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
