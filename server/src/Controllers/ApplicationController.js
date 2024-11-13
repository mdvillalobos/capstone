import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import Account from '../Models/Account.js';
import ApplicationForms from '../Models/ApplicationForms.js';
import { filterAndUploadRequirements } from '../Helpers/Cloudinary.js';
import { sendApplicationResponse } from '../Helpers/SendEmail.js';
 
export const checkExistingEntry = async (req, res) => {
    const { token } = req.cookies;

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const userEntry = await ApplicationForms.findOne({ email: email });
        return res.json(userEntry)
        
    }
    catch (error) {
        console.error(`Fetching User Entry Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const getApplicationsForReRanking = async (req, res) => {
    const { token } = req.cookies;
    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const userData = await Account.findOne({ email: email });

        const approverMapping = {
            'Approver 1': null,
            'Approver 2': 'Approver 1',
            'Approver 3': 'Approver 2',
            'Approver 4': 'Approver 3'
        };

        const previousApprover = approverMapping[userData.approver];
        if(previousApprover !== undefined) {
            const applications = await ApplicationForms.find({ prevApprover: previousApprover, applicationStatus: 'For approval',});
            return res.json(applications)
        }
        
        return res.json(null)


    } catch (error) {
        console.error(`Fetching Applications Error: ${ error.message }`);
        return res.json({ error: 'An internal server error occurred.' });
    }
}

export const submitApplicationEntry = async (req, res) => {
    const { token } = req.cookies;
    const { name, college, department, currentRank, status, academicYear, ApplyingFor, userTrack, requirements } = req.body;

    console.log(name, college, department, currentRank, status, academicYear, ApplyingFor, userTrack, requirements)
    if(!name || !college || !department || !currentRank || !academicYear || !ApplyingFor || !userTrack) {
        return res.json({ error: 'Required all fields.'})
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);

        await ApplicationForms.create({
            name: name,
            email: email,
            college: college,
            department: department,
            currentRank: currentRank,
            userStatus: status,
            academicYear: academicYear,
            applyingFor: ApplyingFor,
            track: userTrack,
            requirements: requirements
        });
        
        return res.json({ message: 'Success'});

    } catch (error) {
        console.log( error );
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const reviewApplications = async (req, res) => {
    const { token } = req.cookies;
    const { formID, decision, remarks, ...checkedReq } = req.body;
    console.log(remarks)

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const [ userInfo, userApplicationForm ] = await Promise.all([
            Account.findOne({ email }),
            ApplicationForms.findById(formID)
        ]);

        userApplicationForm.requirements.forEach((requirement) => {
            requirement.isApproved =  checkedReq[`checkedReq${requirement.requirementNumber}`];
        });

        userApplicationForm.applicationStatus = decision;

        if(decision === 'Approved') {
            userApplicationForm.prevApprover = userInfo.approver
            userApplicationForm.approvedBy = userApplicationForm.approvedBy
                ? `${ userApplicationForm.approvedBy }, ${ userInfo.approver }`
                : userInfo.approver;
            await userApplicationForm.save();
            await Account.updateOne({ email: userApplicationForm.email }, { 'accountinfo.0.rank': userApplicationForm.applyingFor })
            return res.json({ message: 'Succesfully Approved' });
        }

        if (decision === 'Declined') {
            userApplicationForm.declinedBy = userInfo.approver;
            await userApplicationForm.save();
            if(remarks) {
                sendApplicationResponse(userApplicationForm.email, userApplicationForm.applyingFor, remarks)
            }
            return res.json({ message: 'Declined Application' });
        }

        return res.json({ error: 'Invalid decision!' });

    } catch (error) {
        console.error(`Checking Application Error ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

