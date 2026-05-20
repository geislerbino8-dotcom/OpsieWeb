import { model, Schema } from "mongoose";

const ProductSchema = new Schema({
    name: { type: String, required: true },
    logo: { type: String, required: true},
    image: { type: String, required: true },
    tagline: { type: String, required: true},
    description: { type: String, required: true },
    category: { type: String, required: true },
    features: { type: Object, required: true},
    benefits: { type: Object, required: false}, 
    contents: { type: Object, required: true},
    videoAd: { type: String, required: false},
    photos: { type: Array, required: false },
    analytics: { type: Array, required: false},
    industries: { type: Array, required: false},
    themeColor: { type: String, required: false}


});

export const ProductModel =  model('Products', ProductSchema);