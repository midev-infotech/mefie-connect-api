import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const propertySchema = new Schema({
    landlordId: {
        type: Schema.Types.ObjectId,
        ref: 'Landlord',
        required: true
    },
    propertyTitle: {
        type: String,
        required: true
    },
    propertyType: {
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
    gpsAddress: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: 'Ghana'
    },
    bedrooms: {
        type: String,
        required: true
    },
    bathrooms: {
        type: String,
        required: true
    },
    squareFeet: {
        type: String,
    },
    yearBuilt: {
        type: String,
    },
    parkingSpace: {
        type: String,
    },
    petPolicy: {
        type: String,
    },
    monthlyPrice: {
        type: String,
        required: true
    },
    deposit: {
        type: String,
        required: true
    },
    leaseTerm: {
        type: String,
    },
    availableDate: {
        type: String,
    },
    amenities: {
        type: [String],
        default: []
        // enum: ['Wifi', 'Parking', 'Gym', 'Pool', 'Security', 'Generator', 'Air conditioning', 'Dishwasher']
    },
    images: {
        type: [],
        required: true
    },
    
});

propertySchema.plugin(normalize);

export const Property = model('Property', propertySchema);