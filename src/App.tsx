import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "pages/HomePage";
import ThreadDetails from "pages/ThreadDetails";
import SignIn from "pages/SignIn";
import "./App.css";
import UserProfile from "pages/UserProfile";
import Navbar from "components/Navbar";
import SignUp from "pages/SignUp";
import ProtectedRoute from "components/ProtectedRoute";

const App: React.FC = () => {
    const AppLayout = () => {
        return (
            <>
                <Navbar />
                <Outlet />
            </>
        );
    };

    const router = createBrowserRouter([
        {
            element: <AppLayout />,
            children: [
                {
                    path: "/",
                    element: (
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/signin",
                    element: <SignIn />,
                },
                {
                    path: "/signup",
                    element: <SignUp />,
                },
                {
                    path: "/thread/:id",
                    element: (
                        <ProtectedRoute>
                            <ThreadDetails />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/profile",
                    element: (
                        <ProtectedRoute>
                            <UserProfile />
                        </ProtectedRoute>
                    ),
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
};

export default App;
