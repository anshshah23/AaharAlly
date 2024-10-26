import mongoose from 'mongoose';

const serviceProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    rating:{
        type:Number,
        required:true
    }
});

export const ServiceProvider = mongoose.models.ServiceProvider || mongoose.model('ServiceProvider', serviceProviderSchema);