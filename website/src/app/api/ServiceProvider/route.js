import * as XLSX from 'xlsx';
import { mongoConnect } from '../../utils/feature';
import { ServiceProvider } from '../../models/ServiceProvider';
import { NextResponse } from 'next/server';


export async function POST(req) {
    try {
        const data = await req.formData();
        const file = data.get('file');

        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: 'buffer' });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        await mongoConnect();
        const serviceProviders = [];

        for (const row of jsonData) {
            const { item, item_image, item_price, item_desc, item_category } = row;
            if (item && item_image && item_price && item_desc && item_category) {
                serviceProviders.push({
                    name: item,
                    image: item_image,
                    price: item_price,
                    description: item_desc,
                    category: item_category,
                    rating: Math.floor(Math.random() * 5) + 1,
                });
            } else {
                return NextResponse.json({ message: `Fields Missing in the row - ${JSON.stringify(row)}`, success: false }, { status: 404 });
            }
        }

        try {
            await ServiceProvider.insertMany(serviceProviders);
            return NextResponse.json({ message: "Product Added Successfully", success: true }, { status: 201 });
        } catch (err) {
            return NextResponse.json({ message: `Error saving data: ${err.message}`, success: false }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ message: `Error processing request: ${error.message}`, success: false }, { status: 500 });
    }
}