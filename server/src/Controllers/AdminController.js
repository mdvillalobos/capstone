import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Account from '../Models/Account.js';
import Ranks from '../Models/Ranks.js';
import Configuration from '../Models/Config.js';
import { hashPassword, compareHashed } from '../Helpers/Auth.js';
dotenv.config();

export const updateConfig = async (req, res) => {
    const { token } = req.cookies;
    const { password, id, academicYear, isPageOpen } = req.body;

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET)
        const userData = await Account.findOne({ email });
        const isPasswordCorrect = await compareHashed(password, userData.password);

        if(!isPasswordCorrect) {
            return res.json({ error: 'Incorrect password!'});
        }

        if(id) {
            await Configuration.updateOne({ _id: id}, { $set: { academicYear: academicYear, isPageOpen: isPageOpen}});
            return res.json({ meesage: 'Configuration Successfully Updated'})
        }
        else {
            await Configuration.create({ academicYear: academicYear, isPageOpen, isPageOpen });
            return res.json({ message: 'Configuration Successfully Added.'})
        }
    }
    catch(error) {
        console.error(`Updating System Configuration Error ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!'});

    }
}

export const getConfigurations = async (req, res) => {
    try {
        const configuration = await Configuration.find();
        return res.json(configuration)
    } catch (error) {
        console.error(`Fetching Configuration Error ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!'});
    }
}

export const getRanks = async (req, res) => {
    const { token } = req.cookies;

    if(!token) {
        return res.json(null);
    }

    try {
        const rankData = await Ranks.find();
        if(!rankData) {
            return res.json({ error: 'Ranks are currently empty.' });
        }  
        
        return res.json(rankData)

    } catch (error) {
        console.error(`Fetching Rank Requirement Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const createRank = async (req, res) => {
    const { rankName, track, requirements } = req.body;

    if(!rankName || !track) {
        return res.json({ error: 'Required all fields!' });
    }

    try {
        const isRankExisting = await Ranks.findOne({ rankName: rankName, track: track });

        if(isRankExisting) { 
            return res.json({ error: `Rank is already existed from ${track}` }) 
        } 

        await Ranks.create({ 
            rankName: rankName, 
            track: track, 
            requirements: requirements 
        }) 

        return res.json({ message: 'Rank successfully created.' });


    } catch (error) {
        console.error(`Creation Of Rank Error: ${ error.message }`);  
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
} 

export const registerAdmin = async (req, res) => {
    const { token } = req.cookies;
    const { employeeID, email, firstName, lastName, middleName, sex, contact, password, role, adminPassword } = req.body;

    try {
        const { userEmail } = jwt.verify(token, process.env.JWT_SECRET);

        const [ Id, isEmailExisted, hashUserPassword, adminAccount ] = await Promise.all([
            await Account.findOne({ employeeID: employeeID}),
            await Account.findOne({ email: email }),
            await hashPassword(password),
            await Account.findOne({ userEmail })
        ]);

        if(Id) {
            return res.json({ error: 'Employee ID already exist!'});
        }

        if(isEmailExisted) {
            return res.json({ error: 'Email already exist!'})
        }

        if(!await compareHashed(adminPassword, adminAccount.password)) {
            return res.json({ error: 'Incorrect admin password. '});
        }

        await Account.create({ 
            employeeID: employeeID,
            email: email,
            role: role,
            password: hashUserPassword,
            isVerified: true,
            accountinfo: {
                firstName,
                lastName,
                middleName,
                contact,
                sex,
                status: null,
                track: null,
                rank: null,
                college: null,
                department: null,
            }
        })

        return res.json({ message: 'Admin succesfully created.'})
    }

    catch(error) {
        console.error(`Registering Admin Error: ${ error.message }`);
        return res.json({ error: 'An internal server error occurred.' });
    }
}

export const getAllAccount = async (req, res) => {
    try {
        const Accounts = await Account.find().select('employeeID email role accountinfo.lastName accountinfo.firstName')
        return res.json(Accounts)
    }
    catch (error) {
        console.error(`Fetching Accounts Error: ${ error.message }`);
        return res.json({ error: 'An internal server error occurred.' });
    }
}