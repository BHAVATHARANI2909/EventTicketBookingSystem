import { HashRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/login";
import RegisterPage from "../Pages/RegisterPage";
import HomePage from "../dashboard/home";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import AdminDashboard from "./AdminDashboard";
import AdminLoginPage from "./Adminlogin";
import RequestBloodDashboard from "./RequestBlood";

function App() {

    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/dashboard" element={<HomePage />} />
                    <Route path="/admin" element={<AdminLoginPage />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/request-blood" element={<RequestBloodDashboard />} />
                </Routes>
            </HashRouter>
        </>
    );
}

export default App;
