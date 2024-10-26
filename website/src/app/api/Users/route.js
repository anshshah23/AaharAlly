import { userData } from "@/app/models/UserData";
import { food } from "../../models/Food";
import FoodPreference from "../../models/FoodPreferenceSchema";
import { mongoConnect } from "../../utils/feature";
import { NextResponse } from "next/server";

export async function GET(req) {
    const url = new URL(req.url);
    const ageParam = url.searchParams.get('age');
    const id = url.searchParams.get('id');
    const region = url.searchParams.get('region');
    const categoryParam = url.searchParams.get('category');
    const meal_type = url.searchParams.get('meal_type');

    try {
        await mongoConnect();

        // Find specific item by ID
        if (id) {
            const data = await food.findById({ _id: id });
            return NextResponse.json({ data, success: true }, { status: 200 });
        }

        const conditions = {};
        let categoriesArray = [];

        // Filter by meal type
        if (meal_type) {
            conditions.meal_type = meal_type;
        }

        // If age is provided, find the category that matches the age range
        if (ageParam) {
            const age = parseInt(ageParam, 10);
            const ageBasedCategory = await FoodPreference.findOne({
                minAge: { $lte: age },
                maxAge: { $gte: age }
            }).select("food_category");

            if (ageBasedCategory) {
                categoriesArray.push(ageBasedCategory.food_category);
            }
        }

        // If region is provided, calculate most consumed categories in the region
        if (region) {
            const consumptionData = await userData.aggregate([
                { $match: { region } },
                {
                    $group: {
                        _id: { region: '$region', meal_category: '$meal_category' },
                        categoryCount: { $sum: 1 }
                    }
                },
                {
                    $group: {
                        _id: '$_id.region',
                        totalOrdersInRegion: { $sum: '$categoryCount' },
                        categories: {
                            $push: {
                                meal_category: '$_id.meal_category',
                                categoryCount: '$categoryCount'
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        region: '$_id',
                        totalOrdersInRegion: 1,
                        categories: {
                            $map: {
                                input: '$categories',
                                as: 'category',
                                in: {
                                    meal_category: '$$category.meal_category',
                                    categoryCount: '$$category.categoryCount',
                                    percentage: {
                                        $multiply: [
                                            { $divide: ['$$category.categoryCount', '$totalOrdersInRegion'] },
                                            100
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            ]);

            if (consumptionData.length > 0) {
                const mostConsumedCategory = consumptionData[0].categories.reduce((prev, current) => {
                    return prev.categoryCount > current.categoryCount ? prev : current;
                });
                categoriesArray.push(mostConsumedCategory.meal_category);
            }
        }

        // If a specific category is provided in query, add it to the categoriesArray
        if (categoryParam) {
            const incomingCategoriesArray = categoryParam.split(',').map(item => item.trim());
            categoriesArray = [...new Set([...categoriesArray, ...incomingCategoriesArray])];
        }

        // If we have categories to filter by, add them to the conditions
        if (categoriesArray.length > 0) {
            conditions.category = { $in: categoriesArray };
        }

        // Find and return data based on final conditions
        const data = await food.find(conditions);
        return NextResponse.json({ data, success: true }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: `Error processing request: ${err.message}`, success: false }, { status: 500 });
    }
}