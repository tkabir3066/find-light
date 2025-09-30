import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home_Layout from "./components/layout/Home_Layout.jsx";
import ErrorPage from "./components/error/ErrorPage.jsx";
import Auth_layout from "./components/layout/Auth_Layout.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import Login_Page from "./components/pages/Login_Page.jsx";
import Register_Page from "./components/pages/Register_Page.jsx";
import ForgotPassword_Page from "./components/pages/ForgotPassword_Page.jsx";
import Profile_Page from "./components/pages/Profile_Page.jsx";
import CategoryBasedContents from "./components/pages/CategoryBasedContents.jsx";
import ContentDetailsPage_Layout from "./components/layout/ContentDetailsPage_Layout.jsx";
import ContentDetails from "./components/pages/ContentDetails.jsx";
import SubscriptionPage_layout from "./components/layout/SubscriptionPage_Layout.jsx";
import Subscription_Page from "./components/pages/Subscription_Page.jsx";
import PrivateRoute from "./components/routes/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home_Layout></Home_Layout>,
    children: [
      {
        path:"/",
        element: <CategoryBasedContents></CategoryBasedContents>
      }
    ],
  },
  {
    path:"*",
    element: <ErrorPage></ErrorPage>
  },
  {
    path: "/auth",
    element: <Auth_layout></Auth_layout>,
    children: [
      {
        path:"/auth/login",
        element: <Login_Page></Login_Page>
      },
      {
        path:"/auth/register",
        element: <Register_Page></Register_Page>
      },
      {
        path:"/auth/login/forgot-password",
        element: <ForgotPassword_Page></ForgotPassword_Page>
      },
      {
        path:"/auth/profile",
        element: <Profile_Page></Profile_Page>
      }
      

    ],
  },
  {
    path: "/details",
    element: <PrivateRoute>
                <ContentDetailsPage_Layout></ContentDetailsPage_Layout>
              </PrivateRoute>,
    children: [
       {
    path: "/details/content/:id",
    element: <PrivateRoute>
                <ContentDetails></ContentDetails>
             </PrivateRoute>

  },
    ]
  },
  {
    path:"/subscription",
    element: <SubscriptionPage_layout></SubscriptionPage_layout>,
    children: [
      {
        path:"/subscription",
        element: <Subscription_Page></Subscription_Page>
      }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
