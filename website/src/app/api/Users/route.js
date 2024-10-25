import { food } from "../../models/Food";
import { mongoConnect } from "../../utils/feature";
import { NextResponse } from 'next/server';


export async function GET(req) {
    const url = new URL(req.url);
    const age = url.searchParams.get('age');
    const region = url.searchParams.get('region');
    const food_category = url.searchParams.get('category');
    try {
        await mongoConnect();
        // if (age || region || food_category) {
        //     //fetch 10 food_item that comes under the food_category liked by this age grp people (if filter contains age)
        //     //fetch 10 food_item of each category selected by the user (if filter contains category)
        //     //region pending 
        // }
        // else {
        //     //display 5 food item of each category and return to client
        //     //on client side : collect data and randomlly show it on UI
        // }
        const data = await food.find();
        return NextResponse.json({data, success: true }, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ message: `Error processing request: ${err.message}`, success: false }, { status: 500 });
    }
}