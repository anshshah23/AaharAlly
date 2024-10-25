import mongoose from 'mongoose';

const ageDataSchema = new mongoose.Schema({
    age_range:{
        type:Number,
        required:true,
    },
    no_of_people:{
        type:Number,
        required:true,
    },
    food_category: {
        type: String,
        required: true,
    }
});

export const Cluster = mongoose.models.Cluster || mongoose.model('Cluster', ageDataSchema);