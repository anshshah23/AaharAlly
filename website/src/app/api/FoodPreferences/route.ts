import { NextRequest, NextResponse } from "next/server";
import { mongoConnect } from "../../utils/feature";
import FoodPreference from "../../models/FoodPreferenceSchema";

type AgeRangeEntry = {
  "Age Range": string;
  "Number of People": number;
  food_category: string;
};

const parseAgeRange = (
  ageRange: string
): { minAge: number; maxAge: number } => {
  if (ageRange.includes("<")) {
    const maxAge = parseInt(ageRange.match(/\d+/)?.[0] || "0", 10);
    return { minAge: 0, maxAge };
  } else if (ageRange.includes("+")) {
    const minAge = parseInt(ageRange.match(/\d+/)?.[0] || "0", 10);
    return { minAge, maxAge: Infinity };
  } else {
    const [minAge, maxAge] = (ageRange.match(/\d+/g) || []).map(Number);
    return { minAge, maxAge };
  }
};

mongoConnect();

export async function POST(req: NextRequest) {
  try {
    const data: AgeRangeEntry[] = await req.json();

    for (const entry of data) {
      const { minAge, maxAge } = parseAgeRange(entry["Age Range"]);

      const existingCategory = await FoodPreference.findOne({
        food_category: entry.food_category,
      });

      if (existingCategory) {
        const updatedMinAge = Math.min(existingCategory.minAge, minAge);
        const updatedMaxAge = Math.max(existingCategory.maxAge, maxAge);

        existingCategory.minAge = updatedMinAge;
        existingCategory.maxAge = updatedMaxAge;

        await existingCategory.save();
      } else {
        // Create a new entry if the category does not exist
        await FoodPreference.create({
          food_category: entry.food_category,
          minAge,
          maxAge,
        });
      }
    }

    return NextResponse.json(
      { message: "Data saved successfully.", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while saving data.", success: false },
      { status: 500 }
    );
  }
}
