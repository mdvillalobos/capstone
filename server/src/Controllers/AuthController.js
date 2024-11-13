import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
import validator from 'validator';
import Account from '../Models/Account.js';
import EmailVerification from '../Models/VerificationToken.js';
import { sendEmailVerification } from '../Helpers/SendEmail.js';
import { hashPassword, compareHashed } from '../Helpers/Auth.js';
import { uploadFileToCloudinary } from '../Helpers/Cloudinary.js'

export const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.json({ error: 'Required all fields!' });
    }

    try {
        const user = await Account.findOne({ email: email });
    
        if(!user || !await compareHashed(password, user.password)) {
            return res.json({ error: 'Incorrect Email or Password.' });
        }

        if(user.isVerified === false) {
            sendEmailVerification(user.email)
        }

        const loginToken = jwt.sign({ email: email, role: user.role }, process.env.JWT_SECRET);
        return res.cookie('token', loginToken, { httpOnly: true, secure: true, sameSite:'None' }).json({ message: 'Login Successfully', data: user.accountinfo, isVerified: user.isVerified });

    } catch (error) {
        console.error(`Login Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const register = async (req, res) => {
    const { employeeID, email, password, confirm, role } = req.body;

    if(!employeeID || !email || !password) {
        return res.json({ error: 'Required all fields!' });
    }

    if(!validator.isEmail(email)) {
        return res.json({ error: 'Email is not valid!' });
    }

    if(!validator.isStrongPassword(password)) {
        return res.json({ error: 'The Password must contain one uppercase, one lowercase, one number, one special character and with length of 8-16' });
    }

    if(password !== confirm) {
        return res.json({ error: "Password don't matched"})
    }

    try {
        var userRole = ''
        if(!role) {
            userRole = 'user'
        }
        else {
            userRole = role
        }
 
        const [ account, isEmailExist, hashedPassword ] = await Promise.all([
            Account.findOne({ employeeID: employeeID }),
            Account.findOne({ email }),
            hashPassword( password )
        ]);

        if(account) {
            return res.json({ error: 'Employee ID already exist!'})
        }
        
        if(isEmailExist) {
            return res.json({ error: 'Email already exist!' });
        }

        const userAccount = await Account.create({
            employeeID,  
            email, 
            password: hashedPassword
        });

        sendEmailVerification(userAccount.email);
        const verificationToken = jwt.sign({ email: email, role: userRole }, process.env.JWT_SECRET);
        return res.cookie('token', verificationToken, { httpOnly: true, secure: true, sameSite: 'none' }).json({ message: 'Registered Successfully' }); 

    } catch (error) {
        console.log(error);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const verifyEmail = async (req,res) => {
    const { token } = req.cookies;
    const { otp } = req.body;

    if(!otp) {
        return res.json({ error: 'Required all fields!' });
    }

    if(!token) {
        return res.json({ error: 'Access denied.'});
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);

        const [ userAccount, userOTP ] = await Promise.all([
            Account.findOne({ email: email }),
            EmailVerification.findOne({ owner: email }).lean()
        ]) 
 
        if(!userOTP) {
            return res.json({ error: 'Please resend your One-Time-Pin' });
        }

        const isOTPCorrect = await compareHashed(otp, userOTP.Otp);

        if(!isOTPCorrect) {
            return res.json({ error: 'Incorrect One-Time-Pin!' });
        }

        userAccount.isVerified = true;
        await Promise.all([
            userAccount.save(),
            EmailVerification.deleteOne({ owner: email })
        ])
        return res.json({ message: 'OTP verified successfully.' });

    } catch (error) {
        console.error(`Email Verification Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const registerProfile = async (req, res) => {
    const { token } = req.cookies;
    const {  firstName, lastName, middleName, contact, sex, track, rank, college, department, status } = req.body;

    if(!firstName || !lastName || !contact || !sex || !track || !rank || !college || !department || !status) {
        return res.json({ error: 'Required all fields!' });
    }

    if(!token) {
        return res.json({ error: 'Access denied!' });
    }

    try {
        const { email, role } = jwt.verify(token, process.env.JWT_SECRET);
        const profilePicture = req.file ? req.file.path  : null;
        var cloudinaryResponse = '';

        if(profilePicture) {
            cloudinaryResponse =  await uploadFileToCloudinary(profilePicture, 'ProfilePictures')
        }
        const userInfo = {
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            contact: contact,
            sex: sex,
            status: status,
            track: track,
            rank: rank,
            college: college,
            department: department,
            profilePicture: cloudinaryResponse
        };

        await Account.findOneAndUpdate({ email }, { $push: { accountinfo: userInfo } }, { new: true, runValidators: true });
        
        res.clearCookie('verificationToken', { path: '/', sameSite: 'None', secure: true });
        const loginToken = jwt.sign({ email: email, role: role }, process.env.JWT_SECRET);
        return res.cookie('token', loginToken, { httpOnly: true, secure: true, sameSite: 'none' }).json({ message: 'Profile Registered Successfully', });
 
    } catch (error) {
        console.error(`Profile Registration Error ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}


export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const emailRegex = /^[a-zA-Z]+@(students\.)?national-u\.edu\.ph$/;
    if (!email || !emailRegex.test(email)) {
        return res.json({ error: 'Please enter a valid email' });
    }

    try {
        const user = await Account.findOne({ email })
        
        if(!user) {
            return res.json({ error: "Email doesn't exist!" });
        }
        
        sendEmailVerification(email);
        const verificationToken = jwt.sign({ email: email }, process.env.JWT_SECRET);
        return res.cookie('token', verificationToken, { httpOnly: true, secure: true, sameSite: 'none' }).json({ message: 'Email is valid' });
        
    } catch (error) {
        console.error(`Forgot Password Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const resetPassword = async (req, res) => {
    const { password , confirmPassword } = req.body
    const { token } = req.cookies;

    if(!password || !confirmPassword) {
        return res.json({ error: 'Required all fields!' });
    }

    if(!validator.isStrongPassword(password)) {
        return res.json({ error: 'The Password must contain one uppercase, one lowercase, one number, one special character and with length of 8-16' });
    }

   
    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);

        const hashedPassword = await hashPassword(password);

        await Account.updateOne({ email: email }, { password: hashedPassword });

        res.clearCookie('verificationToken', { path: '/', sameSite: 'none', secure: true });

        return res.json({ success: true, message: 'User password reset successfully' });

    } catch (error) {
        console.error(`Reset Password Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const resendOTP = (req, res) => {
    const { token } = req.cookies;

    if(!token) {
        return res.json({ error: 'Access denied!' });
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        sendEmailVerification(email);

        return res.json({ message: 'OTP sent successfully!' });
        
    } catch (error) {
        console.error(`Resend One Time Pin Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });;
    }
}

export const logout = (req, res) => {
    res.clearCookie('token', { path: '/', sameSite: 'none', secure: true });
    return res.json({ message: 'Logged out successfully' })
}
