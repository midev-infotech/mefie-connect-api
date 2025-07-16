import { Favorite } from "../models/favorite_model.js";
import { Property } from "../models/property_model.js";
import { propertySchema } from "../utils/validator.js";

export const getLandlordAllProperty = async (req, res) => {
    try {
        const { userId } = req.user;

        const allProperty = await Property.find({ landlordId: userId });

        if (allProperty.length <= 0) {
            return res.status(401).json({ success: false, message: 'no property found' });
        }

        res.status(200).json(allProperty);

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const getSingleProperty = async (req, res) => {
    try {
        const { propertyId } = req.params;

        const foundProperty = await Property.findById(propertyId);
        if (!foundProperty) {
            return res.status(400).json({ success: false, message: 'property not found' });
        }

        res.status(200).json(foundProperty);

    } catch (error) {
        return res.status(400).json({ success: false, message: 'property not found' });
    }
}

export const postProperty = async (req, res) => {
    try {
        const {
            propertyTitle,
            propertyType,
            description,
            streetAddress,
            city,
            region,
            gpsAddress,
            country,
            bedrooms,
            bathrooms,
            squareFeet,
            yearBuilt,
            parkingSpace,
            petPolicy,
            monthlyPrice,
            deposit,
            leaseTerm,
            availableDate
        } = req.body;

        const { error, value } = propertySchema.validate({
            propertyTitle,
            propertyType,
            description,
            streetAddress,
            city,
            region,
            gpsAddress,
            country,
            bedrooms,
            bathrooms,
            squareFeet,
            yearBuilt,
            parkingSpace,
            petPolicy,
            monthlyPrice,
            deposit,
            leaseTerm,
            availableDate
        });
        
        const landlordId = req.user.userId;
        

        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        if (req.user.role === 'renter') {
            return res.status(401).json({ success: false, message: 'Authourized' });
        }

        let amenities = req.body.amenities;
        if (amenities === undefined) {
            amenities = [];
        }
        else if (typeof(amenities) === 'string') {
            amenities = [amenities];
        }
        
        if (!req.files || req.files.length <= 0) {
            return res.status(400).json({ success: false, message: 'no images uploaded.' });
        }
        const images = req.files.map(file => (file.path));

        const property = new Property({
            landlordId,
            ...value,
            amenities,
            images: images
        })

        const newProperty = await property.save();
        res.status(201).json({ success: true, message: 'property created', property: newProperty });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const updateProperty = async (req, res) => {
    try {
        console.log('body:', req.body)
        const {
            propertyTitle,
            propertyType,
            description,
            streetAddress,
            city,
            region,
            gpsAddress,
            country,
            bedrooms,
            bathrooms,
            squareFeet,
            yearBuilt,
            parkingSpace,
            petPolicy,
            monthlyPrice,
            deposit,
            leaseTerm,
            availableDate
        } = req.body;

        const { error, value } = propertySchema.validate({
            propertyTitle,
            propertyType,
            description,
            streetAddress,
            city,
            region,
            gpsAddress,
            country,
            bedrooms,
            bathrooms,
            squareFeet,
            yearBuilt,
            parkingSpace,
            petPolicy,
            monthlyPrice,
            deposit,
            leaseTerm,
            availableDate
        });
        const { propertyId } = req.params;
        const landlordId = req.user.userId

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        if (req.user.role === 'renter') {
            return res.status(401).json({ success: false, message: 'Authourized' });
        }

        const foundProperty = await Property.findById(propertyId);
        if (!foundProperty) {
            return res.status(401).json({ success: false, message: "property not found" });
        }

        if (String(foundProperty.landlordId) !== landlordId) {
            res.status(401).json({ success: false, message: "unauthorized" });
            return;
        }

        let amenities = req.body.amenities;
        if (amenities === undefined) {
            amenities = [];
        }
        else if (typeof(amenities) === 'string') {
            amenities = [amenities];
        }

        if (!req.files || req.files.length <= 0) {
            return res.status(400).json({ success: false, message: 'no images uploaded.' });
        }
        const images = req.files.map(file => (file.path));

        const updatedProperty = {
            ...value,
            amenities,
            images
        }

        await Property.findByIdAndUpdate(propertyId, updatedProperty);
        const updated = await Property.findById(propertyId);

        res.status(200).json({ success: true,  property: updated, message: 'property updated' });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export const deleteProperty = async (req, res) => {
    try {
        const { propertyId } = req.params;
        const landlordId = req.user.userId;

        if (req.user.role === 'renter') {
            return res.status(401).json({ success: false, message: 'Authourized' });
        }

        const foundProperty = await Property.findById(propertyId);
        if (!foundProperty) {
            return res.status(401).json({ success: false, message: "property not found" });
        }

        if (String(foundProperty.landlordId) !== landlordId) {
            res.status(401).json({ success: false, message: "unauthorized" });
            return;
        }

        await Property.findByIdAndDelete(propertyId);
        
        res.status(200).json({ success: true, message: 'property deleted' });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export const getAllProperty = async (req, res) => {
    try {
        const allProperty = await Property.find();
        res.status(200).json(allProperty);
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export const getPropertyByQuery = async (req, res) => {
    try {
        const { propertyTitle, monthlyPrice, city, propertyType, region, bedrooms, bathrooms } = req.query;

        let query = {};

        if (monthlyPrice) {
            query.monthlyPrice = monthlyPrice;
        }
        else if (propertyType) {
            query.propertyType = propertyType;
        }
        else if (region) {
            query.region = region;
        }
        else if (bedrooms) {
            query.bedrooms = bedrooms;
        }
        else if (bathrooms) {
            query.bathrooms = bathrooms;
        }
        else if (city) {
            query.city = city;
        }
        else if (propertyTitle) {
            query.propertyTitle = propertyTitle;
        }

        const property = await Property.find(query);
        if (property.length <= 0) {
            res.status(400).json({ success: false, message: "property not found" });
            return;
        }

        res.status(201).json(property);

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export const saveFavorite = async (req, res) => {
    try {
        const role = req.user.role;
        const renterId = req.user.userId;
        const propertyId = req.params.propertyId;
    
        if (role !== 'renter') {
            return res.status(400).json({ success: false, message: "unauthorized" });
        }
    
        const foundProperty = await Property.findById(propertyId);
        if (!foundProperty) {
            return res.status(401).json({ success: false, message: "property not found" });
        }
    
        const favorite = new Favorite({
            renterId,
            propertyId,
            propertyTitle: foundProperty.propertyTitle,
            description: foundProperty.description,
            streetAddress: foundProperty.streetAddress,
            city: foundProperty.city,
            region: foundProperty.region,
            bedrooms: foundProperty.bedrooms,
            bathrooms: foundProperty.bathrooms,
            region: foundProperty.region,
            monthlyPrice: foundProperty.monthlyPrice,
            availableDate: foundProperty.availableDate,
            images: foundProperty.images,
        });
    
        await favorite.save();
        res.status(201).json({ success: true, message: "favorite saved" });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export const viewAllFavorite = async (req, res) => {
    try {
        const role = req.user.role;
        const renterId = req.user.userId;

        if (role !== 'renter') {
            return res.status(400).json({ success: false, message: "unauthorized" });
        }

        const allFavorite = await Favorite.find({ renterId });

        if (allFavorite.length <= 0) {
            return res.status(401).json({ success: false, message: 'no favorite found' });
        }

        res.status(200).json(allFavorite);
        
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export const deleteFavorite = async (req, res) => {
    try {
        const { favoriteId } = req.params;
        const renterId = req.user.userId;

        if (req.user.role !== 'renter') {
            return res.status(401).json({ success: false, message: 'unauthourized' });
        }
        console.log('favid:', favoriteId)
        const foundFavorite = await Favorite.findById(favoriteId);
        console.log('fav:', foundFavorite)
        if (!foundFavorite) {
            return res.status(400).json({ success: false, message: "favorite not found" });
        }

        if (String(foundFavorite.renterId) !== renterId) {
            res.status(401).json({ success: false, message: "unauthorized" });
            return;
        }

        await Favorite.findByIdAndDelete(favoriteId);
        
        res.status(200).json({ success: true, message: 'favorite deleted' });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}