import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import { authRouter } from './routers/auth_router.js';
import { propertyRouter } from './routers/property_router.js';

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;
const mongouri = process.env.MONGO_URI;

app.use('/api/rent', authRouter);
app.use('/api/rent/property', propertyRouter)

mongoose.connect(mongouri)
.then(() => {
    console.log("Database is connected");
    app.listen(port, () => {
        console.log(`Server is live on ${port}`);
    });
})
.catch(() => {
    console.log("Database not connected");
});