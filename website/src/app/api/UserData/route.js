import * as XLSX from 'xlsx';
import { mongoConnect } from '../../utils/feature';
import { NextResponse } from 'next/server';
import { userData } from '../../models/UserData';
import path from "path"
import fs from "fs"

export async function POST(req) {
    try {
        const data = await req.formData();
        const file = data.get('file');

        if (!file) {
            return NextResponse.json({ message: 'No file uploaded.', success: false }, { status: 400 });
        }

        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: 'buffer' });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        await mongoConnect();
        const userdata = [];

        for (const row of jsonData) {
            const { age, food_item, meal_category, region } = row;
            if (meal_category && age && food_item && region) {
                userdata.push({
                    food_item,
                    age,
                    meal_category,
                    region
                });
            } else {
                return NextResponse.json({ message: `Fields Missing in the row - ${JSON.stringify(row)}`, success: false }, { status: 404 });
            }
        }
        
        try {
            await userData.insertMany(userdata);
            return NextResponse.json({ message: "Users Data Added Successfully", success: true }, { status: 201 });
        } catch (err) {
            return NextResponse.json({ message: `Error saving data: ${err.message}`, success: false }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ message: `Error processing request: ${error.message}`, success: false }, { status: 500 });
    }
}

import { parse } from 'json2csv';
export async function GET() {
    try {
        await mongoConnect();
        const data = await userData.find({}).lean();
        const csv = parse(data);
        const mlFolderPath = path.join(process.cwd(), '..', 'ML'); 
        const filePath = path.join(mlFolderPath, 'MOCK_DATA.csv');

        fs.mkdirSync(mlFolderPath, { recursive: true });
        fs.writeFileSync(filePath, csv);
        return NextResponse.json({ message: "File Given to Model successfully" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: `Error processing request: ${err.message}`, success: false }, { status: 500 });
    }
}
