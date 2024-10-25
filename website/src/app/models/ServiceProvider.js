import mongoose from 'mongoose';

const serviceProviderSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        required:true,
    },
    price: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true
    }
});

export const ServiceProvider = mongoose.models.ServiceProvider || mongoose.model('ServiceProvider', serviceProviderSchema);