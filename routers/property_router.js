import { Router } from "express";
import { deleteFavorite, deleteProperty, getAllProperty, getLandlordAllProperty, getPropertyByQuery, getSingleProperty, postProperty, saveFavorite, updateProperty, viewAllFavorite } from "../controllers/property_controller.js";
import { identifier } from "../utils/identification.js";
import { upload } from "../utils/image_uploads.js";

export const propertyRouter = Router();

propertyRouter.get('/all', getAllProperty);
propertyRouter.get('/search', getPropertyByQuery);
propertyRouter.get('/:propertyId', getSingleProperty);
propertyRouter.get('/landlord/properties', identifier, getLandlordAllProperty);
propertyRouter.post('/create', identifier, upload.array('images', 5), postProperty);
propertyRouter.post('/update/:propertyId', identifier, upload.array('images', 5), updateProperty);
propertyRouter.post('/delete/:propertyId', identifier, deleteProperty);
propertyRouter.get('/favorite/all', identifier, viewAllFavorite);
propertyRouter.post('/favorite/:propertyId', identifier, saveFavorite);
propertyRouter.post('/favorite/delete/:favoriteId', identifier, deleteFavorite);