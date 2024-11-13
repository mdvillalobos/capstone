import dotenv from 'dotenv';
dotenv.config();
import Account from '../Models/Account.js';
import ApplicationForms from '../Models/ApplicationForms.js';

export const getRankCountPerCollege = async (req, res) => {
    try {
        const userAccount = await Account.find();

        const countRankPerCollege = {};
        const countRankTotal = {};

        userAccount.map(account => {
            const collegeName = account.accountinfo[0]?.college;
            const rankName = account.accountinfo[0]?.rank

            if(!countRankTotal[rankName]) {
                countRankTotal[rankName] = 1
            }
            else {
                countRankTotal[rankName]++
            }

            if(collegeName) {
                if (!countRankPerCollege[rankName]) {
                    countRankPerCollege[rankName] = {
                        rankName: rankName,
                        rankCounts: {}
                    };
                }
                if (rankName) {
                    if (!countRankPerCollege[rankName].rankCounts[collegeName]) {
                        countRankPerCollege[rankName].rankCounts[collegeName] = 1;
                    } else {
                        countRankPerCollege[rankName].rankCounts[collegeName]++;
                    }
                }
            }
        })

        const countRankPerCollegeData = Object.values(countRankPerCollege);
        return res.json({ perCollege: countRankPerCollegeData, rankTotal: countRankTotal })
    }

    catch(error) {
        console.log(error);
        return res.json({ error: 'An internal error occurred. Please try again later!' })
    }
}

export const getApplicationAnalytics = async (req, res) => {
    const { academicYear } = req.query;
    try {
        const years = { [academicYear]: 0 };

        for (let i = 1; i <= 4; i++) {
            let [startYear, endYear] = academicYear.split('-').map(Number);
            let year = `${startYear - i}-${endYear - i}`;
            years[year] = 0;
        }

        const applications =  await ApplicationForms.find({ purpose: 'application' });

        applications.forEach(applicationData => {
            if(years[applicationData.academicYear] !== undefined) {
                years[applicationData.academicYear]++;
            }
        })

        return res.json(years)
    } catch (error) {
        console.log(error);
        return res.json({ error: 'An internal error occurred. Please try again later!' })
    }
}

export const getNewlyRanked = async (req, res) => {
    try {
        const approvedApplication = await ApplicationForms.find({ purpose: 'application', applicationStatus: 'Approved'});
        return res.json(approvedApplication);

    } catch (error) {
        console.log(error);
        return res.json({ error: 'An internal error occurred. Please try again later!' })
    }
}


export const getApplicationAndFacultyCount = async (req, res) => {
    try {
        const [ facultyCount, applicationCount] = await Promise.all([
            Account.countDocuments({ 'accountinfo.0.rank': { $ne: null }}),
            ApplicationForms.countDocuments({ purpose: 'application', academicYear: '2024-2025'}),
        ]);

        return res.json({ facultyCount: facultyCount, applicationCount: applicationCount})
    }

    catch (error) {
        console.log(error);
        return res.json({ error: 'An internal error occurred. Please try again later!' })
    }
}
