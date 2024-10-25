import { NextResponse } from 'next/server';
import { userData } from '../../models/UserData';
import { mongoConnect } from '@/app/utils/feature';

export async function GET() {
    try {
        await mongoConnect();
        const result = await userData.aggregate([
            // Step 1: Group by region and meal_category to count orders for each category in each region
            {
                $group: {
                    _id: { region: '$region', meal_category: '$meal_category' },
                    categoryCount: { $sum: 1 }
                }
            },
            // Step 2: Group by region to calculate total orders per region
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
            // Step 3: Calculate percentage of each meal category within the region
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

        // Step 4: Calculate total number of orders across all regions
        const totalOrders = await userData.countDocuments();
        return NextResponse.json({ 
            data: result, 
            totalOrders: totalOrders, 
            success: true 
        }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ message: `Error processing request: ${err.message}`, success: false }, { status: 500 });
    }
}