import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import App from "./App.tsx";
import Login from "./views/Login.tsx";
import CreateAccount from "./views/CreateAccount.tsx";
import ValidateAccount from "./views/ValidateAccount.tsx";
import Produits from "./views/Produits.tsx";
import AppRoot from "./views/AppRoot.tsx";
import AppProduits from "./views/AppProduits/AppProduits.tsx";
import AppSMS from "./views/Sms/AppSMS.tsx";
import AppFacturations from "./views/AppFacturation/AppFacturations.tsx";
import Apropos from "./views/Apropos/AppApropos.tsx";
import Contact from "./views/Apropos/Contact.tsx";
import AppRapportFactures from "./views/Rapport/Rapport.tsx";
import NotFound from "./views/NotFound.tsx";


const AppRouter = () => (
    <Router>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/create-account" element={<CreateAccount/>}/>
            <Route path="/validate-account" element={<ValidateAccount/>}/>
            <Route path="/produits" element={<Produits/>}/>
            <Route path="/app/home" element={<AppRoot/>}/>
            <Route path="/app/produit" element={<AppProduits/>}/>
            <Route path="/app/sms" element={<AppSMS/>}/>
            <Route path="/app/facturation" element={<AppFacturations/>}/>
            <Route path="/apropos" element={<Apropos/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/app/rapport" element={<AppRapportFactures/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </Router>
);

ReactDOM.render(
    <React.StrictMode>
        <AppRouter/>
    </React.StrictMode>,
    document.getElementById('root')
);