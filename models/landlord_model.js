import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const landlordSchema = new Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    vericationCode: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'landlord'
    },
    resetCode: String,
    resetValidation: Number,
});

landlordSchema.plugin(normalize);

export const Landlord = model('Landlord', landlordSchema);