import { Router } from 'express';
const router = Router();

import { login, register, verifyEmail, registerProfile, forgotPassword, resetPassword, logout, resendOTP } from '../Controllers/AuthController.js';
import { getUserData, addCredential, getUserCredentials } from '../Controllers/UserController.js';
import { changePassword, updateProfile } from '../Controllers/SettingController.js'
import { updateConfig, getConfigurations, getRanks, createRank, registerAdmin, getAllAccount } from '../Controllers/AdminController.js';
import { checkExistingEntry, getApplicationsForReRanking, submitApplicationEntry, reviewApplications} from '../Controllers/ApplicationController.js';
import { getRankCountPerCollege, getApplicationAnalytics, getNewlyRanked, getApplicationAndFacultyCount } from '../Controllers/AnalyticsController.js'; 

import authorizationMiddleware from '../Middleware/authorizationMiddleware.js';
import { upload, multerErrorHandler } from'../Middleware/uploadMiddleware.js';

const uploadFiles = upload.fields([{ name: 'requirement_1', maxCount: 1}, { name: 'requirement_2', maxCount: 1}, 
    { name: 'requirement_3', maxCount: 1}, { name: 'requirement_4', maxCount: 1 }, { name: 'requirement_5', maxCount: 1}, 
    { name: 'requirement_6', maxCount: 1}, { name: 'requirement_7', maxCount: 1 }, { name: 'requirement_8', maxCount: 1}, 
    { name: 'requirement_9', maxCount: 1}, { name: 'requirement_10', maxCount: 1}, 
]);

// login & logout
router.post('/api/login', login);
router.post('/api/logout', logout);

//registration process
router.post('/api/register', register);
router.post('/api/registeProfile', upload.single('profilePicture'), registerProfile);

//email verification 
router.post('/api/verifyEmail', verifyEmail);
router.post('/api/resendOTP', resendOTP);

//forgot password process
router.post('/api/forgot', forgotPassword);
router.post('/api/resetpassword', resetPassword);

//settings
router.post('/api/updateProfile', upload.single('profilePicture'), updateProfile);
router.post('/api/changepassword', changePassword);

//user
router.get('/api/getProfile', getUserData);
router.post('/api/addCredential', upload.single('file'), addCredential);
router.get('/api/getUserCredentials', getUserCredentials);

//Application for re-ranking
router.get('/api/getEntry', authorizationMiddleware('user'), checkExistingEntry);
router.get('/api/getAllRank', getRanks);

//admin 
router.get('/api/getApplications', authorizationMiddleware('admin'), getApplicationsForReRanking);
router.post('/api/checkApplication', authorizationMiddleware('admin'), reviewApplications);
router.post('/api/createRank', authorizationMiddleware('admin'), createRank);
router.post('/api/updateConfig', authorizationMiddleware('admin'), updateConfig);
router.get('/api/getConfiguration', getConfigurations);
router.post('/api/registerAdmin', authorizationMiddleware('admin'), registerAdmin);
router.get('/api/getAllAccounts', authorizationMiddleware('admin'), getAllAccount)

//analytics
router.get('/api/getApplicationAnalytics', authorizationMiddleware('admin'), getApplicationAnalytics);
router.get('/api/getCountPerCollege', authorizationMiddleware('admin'), getRankCountPerCollege);
router.get('/api/getCountData', authorizationMiddleware('admin'), getApplicationAndFacultyCount);
router.get('/api/getApproved', authorizationMiddleware('admin'), getNewlyRanked);

router.post('/api/submitApplicationEntry',uploadFiles, multerErrorHandler, submitApplicationEntry);

export default router
