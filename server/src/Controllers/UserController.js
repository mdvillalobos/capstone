import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import Account from '../Models/Account.js';
import Credentials from '../Models/Credentials.js';
import { uploadFileToCloudinary } from '../Helpers/Cloudinary.js';

export const getUserData = async (req, res) => {
    const { token } = req.cookies;

    if(!token) {
        return res.json(null);
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const userCredentials = await Account.findOne({ email });

        if (userCredentials) {
            const userObject = {
                ...userCredentials.accountinfo.toObject()[0],
                isVerified: userCredentials.isVerified,
                email: email,
                role: userCredentials.role,
                employeeID: userCredentials.employeeID
            };
            return res.json(userObject);
        }

        return res.json(null); 

    } catch (error) {
        console.error(`Fetching User Data Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const addCredential = async (req, res) => {
    const { token } = req.cookies;
    const { category, code } = req.body;

    if(!category || !req.file) {
        return res.json({ error: 'Required all fields!'})
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);

        const [ cloudinaryResponse, userData ] = await Promise.all([
            await uploadFileToCloudinary(req.file.path, 'credentials'),
            await Credentials.findOne({ email: email }),
        ])

        const userFile = {
            category: category,
            filePath: cloudinaryResponse,
            fileName: req.file.originalname,
            code: code
        }

        if(userData) {
            userData.files.push(userFile);
            await userData.save();
            return res.json({ message: 'Education successfully created!'})
        }

        else {
            await Credentials.create({
                email: email,
                files: userFile
            });
            return res.json({ message: 'Education successfully created!'})
        }
    }

    catch (error) {
        console.error(`Creating Education Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const getUserCredentials = async (req, res) => {
    const { token } = req.cookies;
    
    if(!token) { 
        return res.json({ error: 'Access Denied!'});
    }
    
    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const userCredentials = await Credentials.findOne({ email });
        return res.json(userCredentials);
    }

    catch (error) {
        console.error(`Fetching User Credentials Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

