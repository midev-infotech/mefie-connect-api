import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const renterSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // phoneNumber: {
    //     type: String,
    //     required: true
    // },
    role: {
        type: String,
        default: 'renter'
    },
    resetCode: String,
    resetValidation: Number,
});

renterSchema.plugin(normalize);

export const Renter = model('Renter', renterSchema);