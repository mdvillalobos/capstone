import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../context/userContext.jsx";
import axios from "axios";

//auth
import Login from './view/Auth/Login.jsx';
import Registration from './view/Auth/Register.jsx';
import ProfileRegistration from './view/Auth/ProfileRegistration.jsx';
import EmailVerification from './view/Auth/EmailVerification.jsx';
import ForgotPassword from './view/Auth/ForgotPassword.jsx';
import VerifyOTP from './view/Auth/VerifyOtp.jsx';
import ResetPassword from './view/Auth/ResetPassword.jsx';

//user
import Home from './view/User/Home.jsx';
import ApplicationForReRanking from './view/User/ApplicationForReRanking.jsx';
import ApplicationForm from './view/User/ApplicationForm.jsx';
import Setting from './view/User/Settings.jsx';
import ViewSubmittedForm from "./view/User/ViewSubmittedForm.jsx";

//admin 
import Dashboard from './view/Admin/Dashboard.jsx';
import AdminApplication from './view/Admin/Application.jsx';
import ViewApplication from './view/Admin/ViewApplication.jsx';
import AdminSettings from './view/Admin/Settings.jsx';
import AccountManagement from "./view/Admin/AccountManagement.jsx";

//Error page
import ErrorPage from './view/Error/ErrorPage.jsx';
import Restriction from './view/Error/Restriction.jsx';
import useProtectRoutes from './hooks/Helpers/useProtectRoutes.jsx';

//images 
import { Helmet } from 'react-helmet';
import NotFound from './assets/images/NotFound.webp';
import NoData from './assets/images/NoData.webp';
import NuLogo from './assets/images/NU_shield.webp';
import maleProfile from './assets/images/male.webp';
import femaleProfile from './assets/images/female.webp';
import Done from './assets/images/done.webp'

import useInactivityLogout from "./hooks/Helpers/useInactivityLogout.jsx";
import useLogout from "./hooks/AuthHooks/useLogout.jsx";


/* axios.defaults.baseURL = 'http://localhost:3001';  */
axios.defaults.baseURL = 'https://nufso.onrender.com';
axios.defaults.withCredentials = true;

function App() {
  const { PageRouteProtection, AuthPageProtection } = useProtectRoutes();
  const { Logout } = useLogout();
  const { user } = useContext(UserContext)

  useInactivityLogout(Logout, 300000, user !== null && user?.role !== undefined)

  return (
    <>
      <Helmet>
        <link rel="preload" href={NotFound} as="image" />
        <link rel="preload" href={Done} as="image" />
        <link rel="preload" href={NoData} as="image" />
        <link rel="preload" href={NuLogo} as="image" />
        <link rel="preload" href={maleProfile} as="image" />
        <link rel="preload" href={femaleProfile} as="image" />
      </Helmet>

      <Routes>
        <Route exact path='/profileregistration' element={<ProfileRegistration />} />
        <Route exact path='/emailverification' element={ <EmailVerification/> }/>
        {/* authentication */}
        <Route element={<AuthPageProtection/>}>
          <Route exact path="/" element={ <Login/> }/>
          <Route exact path="/login" element={ <Login/> }/>
          <Route exact path="/register" element={ <Registration/> }/>
          <Route exact path="/registration" element={ <Registration/> }/>
    
          {/* forgot password */}
          <Route exact path='/forgotpassword' element={ <ForgotPassword/> }/>
          <Route exact path='/verifyotp' element={ <VerifyOTP/> }/>
          <Route exact path='/resetpassword' element={ <ResetPassword/> }/>
        </Route>
    
        {/* User */}
        <Route element={<PageRouteProtection providedRole={'user'}/>}>
          <Route exact path="/home" element={ <Home/> }/>
          <Route exact path="/application" element={ <ApplicationForReRanking /> }/>
          <Route exact path="/settings" element={ <Setting/> }/>
    
          {/* Application forms */}
          <Route exact path='/application/form' element={ <ApplicationForm/> }/>
          <Route exact path='/myform' element={<ViewSubmittedForm/>} />
        </Route>
        
        {/* admin */}
        <Route element={<PageRouteProtection providedRole={'admin'}/>}>
          <Route exact path="/admin/" element={ <Dashboard/> }/>
          <Route exact path="/admin/dashboard" element={ <Dashboard/> }/>
          <Route exact path="/admin/application" element={ <AdminApplication/> }/>
          <Route exact path='/admin/application/view' element={ <ViewApplication/> }/>

          <Route exact path='/admin/settings' element={ <AdminSettings/> } />
          <Route exact path='/admin/accountmanagement' element={ <AccountManagement />}/>
        </Route>
    
        {/* Error Page */}
        <Route path='*' element={<ErrorPage/>}/>
        <Route path='/restriction'element ={<Restriction/>}/>
      </Routes>
    </>
  )
}

export default App
