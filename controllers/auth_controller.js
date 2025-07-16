import jwt from "jsonwebtoken"
import { Landlord } from "../models/landlord_model.js";
import { doHash, hashValidation } from "../utils/hashing.js";
import { transport } from "../utils/mailer.js";
import { landlordSchema, renterSchema, resetCodeSchema, resetSchema, signinSchema } from "../utils/validator.js";
import { Renter } from "../models/renter_model.js";
import { landlordSignupMessage, renterSignupMessage } from "../utils/email_html.js";

export const signupLandlord = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword, phoneNumber } = req.body;

    try {
        const { error, value } = landlordSchema.validate({ firstName, lastName, email, password, confirmPassword, phoneNumber });

        if (error) {
            return res.status(401).json({ success: false, message: error.details[0].message });
        }

        const existingLandlord = await Landlord.findOne({ email });
        const existingRenter = await Renter.findOne({ email });

        if (existingLandlord || existingRenter) {
            return res.status(401).json({ success: false, message: "email has already been used" });
        }

        if (password !== confirmPassword) {
            return res.status(401).json({ success: false, message: "passwords do not match" });
        }

        const hashedPassword = await doHash(password, 12);

        let info = await transport.sendMail({
            from: process.env.SENDER_EMAIL_ADDRESS,
            to: email,
            subject: "MeFieConnect Account",
            html: landlordSignupMessage
        });

        if (info.accepted[0] !== email) {
            return res.status(400).json({ success: false, message: 'email not valid' });
        }

        const landlord = new Landlord({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber,
        });

        await landlord.save();
        res.status(201).json({ success: true, message: 'account created successfully!' })

    } catch (error) {
        res.status(400).json({
            success: false, message: error.message,
        });
    }
}

export const signupRenter = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    try {
        const { error, value } = renterSchema.validate({ firstName, lastName, email, password, confirmPassword });

        if (error) {
            return res.status(401).json({ success: false, message: error.details[0].message });
        }

        const existingLandlord = await Landlord.findOne({ email });
        const existingRenter = await Renter.findOne({ email });

        if (existingLandlord || existingRenter) {
            return res.status(401).json({ success: false, message: "email has already been used" });
        }

        if (password !== confirmPassword) {
            return res.status(401).json({ success: false, message: "passwords do not match" });
        }

        const hashedPassword = await doHash(password, 12);

        let info = await transport.sendMail({
            from: process.env.SENDER_EMAIL_ADDRESS,
            to: email,
            subject: "MeFieConnect Account",
            html: renterSignupMessage
        });

        if (info.accepted[0] !== email) {
            return res.status(400).json({ success: false, message: 'email not valid' });
        }

        const renter = new Renter({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            // phoneNumber,
        });

        await renter.save();
        res.status(201).json({ success: true, message: 'account created successfully!' })

    } catch (error) {
        res.status(400).json({
            success: false, message: error.message,
        });
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { error, value } = signinSchema.validate({ email, password });
        if (error) {
            return res.status(401).json({ success: false, message: error.details[0].message });
        }

        let existingUser = await Landlord.findOne({ email });
        if (!existingUser) {
            existingUser = await Renter.findOne({ email });
            if (!existingUser) {
                return res.status(401).json({ success: false, message: "invalid credentials!" });
            }
        }

        const result = await hashValidation(password, existingUser.password);
        if (!result) {
            return res.status(401).json({ success: false, message: "invalid credentials!" });
        }

        const token = jwt.sign(
            {
                userId: existingUser._id,
                email: existingUser.email,
                verified: existingUser.verified,
                role: existingUser.role
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: '8hr'
            }
        );

        res.cookie(
            'Authorization', 'Bearer ' + token,
            {expires: new Date(Date.now() + 8 * 3600000)}
        )
        .status(200).json({
            success: true,
            token,
            username: existingUser.firstName,
            role: existingUser.role,
            message: 'login successful'
        })


    } catch (error) {
        res.status(400).json({
            success: false, message: error.message,
        });
    }
}

export const signout = async (req, res) => {
    res
    .clearCookie('Authorization')
    .status(200)
    .json({ success: true, message: 'signout successful' });
}

export const resetPassword = async (req, res) => {
    const { email, newPassword, confirmPassword, resetCode } = req.body;

    try {
        const { error, value } = resetSchema.validate({ email, newPassword, confirmPassword, resetCode });

        if (error) {
            return res
            .status(401)
            .json({ success: false, message: error.details[0].message });
        }

        let existingUser = await Landlord.findOne({ email });
        if (!existingUser) {
            existingUser = await Renter.findOne({ email });
            if (!existingUser) {
                return res.status(401).json({ success: false, message: "email does not exist!" });
            }
        }

        if (newPassword !== confirmPassword) {
            return res.status(401).json({ success: false, message: "passwords do not match" });
        }

        const hashedResetCode = existingUser.resetCode
        const isResetCode = await hashValidation(resetCode, hashedResetCode);
        const isExpired = Date.now() - existingUser.resetValidation > 5*60*1000;

        if (!isResetCode) {
            return res.status(401).json({ success: false, message: "invalid reset-code" });
        }

        if (isExpired) {
            return res.status(401).json({ success: false, message: "expired reset-code" });
        }

        const hashedPassword = await doHash(newPassword, 12);
        existingUser.password = hashedPassword;
        existingUser.resetCode = undefined;
        existingUser.resetValidation = undefined;
        await existingUser.save();

        return res.status(201).json({ success: true, message: "password reset successful" });

    } catch (error) {
        res.status(400).json({
            success: false, message: error.message,
        });
    }
}

export const generateResetCode = async (req, res) => {
    try {
        const { email } = req.body;
        const { error, value } = resetCodeSchema.validate({ email });

        if (error) {
            return res.status(400).json({ success: false, message: error.message });
        }

        let existingUser = await Landlord.findOne({email});

        if (!existingUser) {
            existingUser = await Renter.findOne({email});
        }

        if (!existingUser) {
            return res.status(401).json({ success: false, message: "user does not exists!" });
        }

        const code = Math.floor(Math.random() * 10000).toString().padStart(6, '0');
        const hashedCode = await doHash(code, 12);

        existingUser.resetCode = hashedCode;
        existingUser.resetValidation = Date.now();
        
        transport.sendMail({
            from: process.env.SENDER_EMAIL_ADDRESS,
            to: email,
            subject: 'Password Reset',
            html:  `
                    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; color: #333; border-radius: 8px; max-width: 600px; margin: auto;">
                    
                    <h1 style="text-align: center; color: #e67e22; margin-bottom: 30px;">🏠 MeFieConnect</h1>

                    <h2 style="color: #2c3e50;">Reset Code: ${code}</h2>
                </div>
                `
        });

        await existingUser.save();
        res.status(201).json({ success: true, message: 'reset-code sent to email' });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}