import { userData } from "@/app/models/UserData";
import { food } from "../../models/Food";
import { mongoConnect } from "../../utils/feature";
import { NextResponse } from 'next/server';


export async function GET(req) {
    const url = new URL(req.url);
    const age = url.searchParams.get('age');
    const id = url.searchParams.get('id');
    const region = url.searchParams.get('region');
    const category = url.searchParams.get('category');
    const meal_type = url.searchParams.get('meal_type')
    try {
        await mongoConnect();
        if (id) {
            const data = await food.findById({ _id: id })
            return NextResponse.json({ data, success: true }, { status: 200 });
        }

        if (age || region || category) {
            //fetch 10 food_item that comes under the food_category liked by this age grp people (if filter contains age)
            //fetch 10 food_item of each category selected by the user (if filter contains category)
            //region pending 

            // if (age) {
            //     conditions.age_preference = age;
            // }
            const conditions = {};
            let categoriesArray = [];
            if (meal_type) {
                conditions.meal_type = meal_type;
            }
            if (region) {
                const consumptionData = await userData.aggregate([
                    {
                        $match: { region }
                    },
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
                        return (prev.categoryCount > current.categoryCount) ? prev : current;
                    });

                    categoriesArray.push(mostConsumedCategory.meal_category);
                }
            }
            if (category) {
                const incomingCategoriesArray = category.split(',').map(item => item.trim());
                categoriesArray = [...new Set([...categoriesArray, ...incomingCategoriesArray])]; // Merge and remove duplicates
            }

            if (categoriesArray.length > 0) {
                conditions.category = { $in: categoriesArray };
            }

            const data = await food.find(conditions)
            return NextResponse.json({ data, success: true }, { status: 200 });
        }
        else {
            const data = await food.aggregate([{ $sample: { size: 20 } }]);
            return NextResponse.json({ data, success: true }, { status: 200 });
        }
    }
    catch (err) {
        return NextResponse.json({ message: `Error processing request: ${err.message}`, success: false }, { status: 500 });
    }
}