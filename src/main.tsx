import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./views/Login.tsx";
import NotFound from "./views/NotFound.tsx";
import Produits from "./views/Produits.tsx";
import AppRoot from "./views/AppRoot.tsx";
import AppProduit from "./views/AppProduits/AppProduits.tsx";
import AppSMS from "./views/Sms/AppSMS.tsx";
import AppFacturations from "./views/AppFacturation/AppFacturations.tsx";
import AppRapportFactures from "./views/Rapport/Rapport.tsx";
import Apropos from "./views/Apropos/AppApropos.tsx";
import Contact from "./views/Apropos/Contact.tsx";
import CreateAccount from "./views/CreateAccount.tsx";
import ValidateAccount from "./views/ValidateAccount.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>, errorElement: <NotFound/>
    },
    {
        path: '/login',
        element: <Login/>,
        errorElement: <NotFound/>
    }, {
        path: '/create-account',
        element: <CreateAccount/>,
        errorElement: <NotFound/>
    },
    {
        path: '/validate-account',
        element: <ValidateAccount/>,
        errorElement: <NotFound/>
    },
    {
        path: "/produits",
        element: <Produits/>
    },
    {
        path: "/app/home",
        element: <AppRoot/>
    },
    {
        path: "/app/produit",
        element: <AppProduit/>
    }
    ,
    {
        path: "/app/sms",
        element: <AppSMS/>
    },
    {
        path: "/app/facturation",
        element: <AppFacturations/>,
        errorElement: <NotFound/>
    },
    {
        path: "/apropos",
        element: <Apropos/>,
        errorElement: <NotFound/>
    },
    {
        path: "/contact",
        element: <Contact/>,
        errorElement: <NotFound/>
    },
    {
        path: "/app/rapport",
        element: <AppRapportFactures/>,
        errorElement: <NotFound/>
    }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);