import mongoose from "mongoose";
const foodSchema = new mongoose.Schema({ //require 20 document for each category of food => total 20*10 = 200
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    meal_type: {
        type: String,
        required: true
    }
})
export const food = mongoose.models.food || mongoose.model('food', foodSchema)