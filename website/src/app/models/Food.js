import mongoose from "mongoose";
const foodSchema = new mongoose.Schema({ //require 20 document for each category of food => total 20*10 = 200
    item_name:{
        type:String,
        required:true,
    },
    item_url:{
        type:String,
        required:true,
    },
    item_rating:{
        type:Number,
        required:true,
    },
    item_price:{
        type:Number,
        required:true,
    },
    item_desc:{
        type:String,
        required:true
    }
})
export const food = mongoose.models.food || mongoose.model('food',foodSchema)