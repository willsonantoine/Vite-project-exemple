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

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>, errorElement: <NotFound/>
    },
    {
        path: '/login',
        element: <Login/>
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
    }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);