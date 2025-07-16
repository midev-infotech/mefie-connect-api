import Joi from "joi";

export const landlordSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
    confirmPassword: Joi.string().required().min(8),
    phoneNumber: Joi.string().required().min(9).max(15)
});

export const renterSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
    confirmPassword: Joi.string().required().min(8),
});

export const signinSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export const resetCodeSchema = Joi.object({
    email: Joi.string().required(),
});

export const resetSchema = Joi.object({
    email: Joi.string().required(),
    newPassword: Joi.string().required().min(8),
    confirmPassword: Joi.string().required().min(8),
    resetCode: Joi.string().required().min(6).max(6)
});

export const phoneSchema = Joi.object({
    phoneNumber: Joi.string().required().pattern(/^\+[1-9]\d{7,14}$/)
});

export const propertySchema = Joi.object({
    propertyTitle: Joi.string().required(),
    propertyType: Joi.string().required(),
    description: Joi.string().required(),
    streetAddress: Joi.string().required(),
    city: Joi.string().required(),
    region: Joi.string().required(),
    gpsAddress: Joi.string().required(),
    country: Joi.string(),
    bedrooms: Joi.string().required(),
    bathrooms: Joi.string().required(),
    squareFeet: Joi.string(),
    yearBuilt: Joi.string(),
    parkingSpace: Joi.string(),
    petPolicy: Joi.string(),
    monthlyPrice: Joi.string().required(),
    deposit: Joi.string().required(),
    leaseTerm: Joi.string(),
    availableDate: Joi.string(),
    // amenities: Joi.array().items(Joi.string())
});

export const updatePropertySchema = Joi.object({
    price: Joi.number(),
    description: Joi.string(),
});