import { model, Schema } from "mongoose";
import normalize from "normalize-mongoose";

const favoriteSchema = new Schema({
    renterId: {
        type: Schema.Types.ObjectId,
        ref: 'Renter',
        required: true
    },
    propertyId: {
        type: Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    propertyTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    bedrooms: {
        type: String,
        required: true
    },
    bathrooms: {
        type: String,
        required: true
    },
    monthlyPrice: {
        type: String,
        required: true
    },
    availableDate: {
        type: String,
    },
    images: {
        type: [],
        required: true
    },
});

favoriteSchema.plugin(normalize);

export const Favorite = model('Favorite', favoriteSchema);