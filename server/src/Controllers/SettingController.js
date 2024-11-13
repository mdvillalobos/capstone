import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import validator from 'validator';
import Account from '../Models/Account.js';
import { uploadFileToCloudinary, DestroyImageInCloudinary } from '../Helpers/Cloudinary.js';
import { hashPassword } from '../Helpers/Auth.js';

export const changePassword = async (req, res) => {
    const { token } = req.cookies;
    const { newPassword, confirmNewPassword } = req.body;
    console.log(newPassword, confirmNewPassword)

    if(!token) {
        return res.json({ error: 'Access denied!'});
    }

    if(!newPassword || !confirmNewPassword) {
        return res.json({ error: 'Required all fields!'});
    }

    if(newPassword !== confirmNewPassword) {
        return res.json({ error: "Password don't match!" });
    }

    if(!validator.isStrongPassword(newPassword)) {
        return res.json({ error: 'Password is too weak.'});
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);

        const hashedPassword = await hashPassword(newPassword);

        await Account.updateOne({ email: email}, { password: hashedPassword });

        return res.json({ message: 'Password updated successfully.' });
   
    } catch (error) {
        console.error(`Change Password Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const updateProfile = async (req, res) => {
    const { token } = req.cookies;
    const { lastName, firstName, middleName, contact, college, department, status } = req.body;

    if(!token) {
        return res.json({ error: 'Access denied!'});
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET); 
        const userData = await Account.findOne({ email: email });

        if(!userData) {
            return res.json({ error: 'User data not found!' });
        }

        if(req.file) {
            const [ deleteReponse, uploadResponse ] = await Promise.all([
                DestroyImageInCloudinary(userData.accountinfo[0].profilePicture, 'ProfilePictures'),
                uploadFileToCloudinary(req.file.path, 'ProfilePictures'),
            ])
            userData.accountinfo[0].profilePicture = uploadResponse;
        }

        userData.accountinfo[0].lastName = lastName;
        userData.accountinfo[0].firstName = firstName;
        userData.accountinfo[0].middleName = middleName;
        userData.accountinfo[0].contact = contact;
        userData.accountinfo[0].college = college;
        userData.accountinfo[0].department = department;
        userData.accountinfo[0].status = status;
        await userData.save();
        return res.json({ message: 'Successfully updated user name.' });
        
    } catch (error) {
        console.error(`Update User Details Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

/* export const updateProfilePicture = async (req, res) => {
    const { token } = req.cookies;
    const { id } = req.body;

    if(!token) {
        return res.json({ error: 'Access denied!'});
    }

    try {
        const { email} = jwt.verify(token, process.env.JWT_SECRET);
        const uploadedPicture = req.file ? req.file.path : null;

        const userData = await Account.findOne({ email, 'accountinfo._id': id});
        const accountInfo = userData.accountinfo.id(id);

        if (accountInfo.profilePicture) {
            await DestroyImageInCloudinary(accountInfo.profilePicture, 'ProfilePictures');
        }
        accountInfo.profilePicture = uploadedPicture ? await uploadFileToCloudinary(uploadedPicture, 'ProfilePictures') : null;
        await userData.save();
        return res.json({ message: 'Profile Picture Successfully Changed' });
    }

    catch(error) {
        console.error(`Update Profile Picture Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
} */