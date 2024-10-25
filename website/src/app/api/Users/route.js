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
        if(meal_type){
            const data = await food.find({meal_type})
            return NextResponse.json({ data, success: true }, { status: 200 });
        }
        if (age || region || category) {
            //fetch 10 food_item that comes under the food_category liked by this age grp people (if filter contains age)
            //fetch 10 food_item of each category selected by the user (if filter contains category)
            //region pending 

            // if (age) {
            //     conditions.age_preference = age;
            // }
            const conditions = {}
            if (region) {
                const regionsArray = region.split(',').map(item => item.trim()); // Trim whitespace
                conditions.region = { $in: regionsArray }; // Use $in for filtering by multiple regions
            }
    
            // Check if category is provided and split it into an array
            if (category) {
                const categoriesArray = category.split(',').map(item => item.trim()); // Trim whitespace
                conditions.category = { $in: categoriesArray }; // Use $in for filtering by multiple categories
            }
    
            // Aggregation pipeline
            const data = await food.aggregate([
                { $match: conditions }, // Match conditions
                { $limit: 10 } // Limit to 10 results
            ]);
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