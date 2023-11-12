import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./views/Login.tsx";
import NotFound from "./views/NotFound.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>, errorElement:<NotFound/>
    },
    {
        path:'/login',
        element:<Login/>
    }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);