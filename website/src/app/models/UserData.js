import mongoose from 'mongoose';

const userDataSchema = new mongoose.Schema({
    age: {
        type: Number,
        required: true,
    },
    food_item: {
        type: String,
        required: true,
    },
    meal_category: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    }
});

export const userData = mongoose.models.userData || mongoose.model('userData', userDataSchema);
