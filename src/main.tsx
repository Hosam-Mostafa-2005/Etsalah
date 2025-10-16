import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import Form from "./pages/Form.tsx";
import MyOrders from "./pages/MyOrders.tsx";
import Profile from "./pages/Profile.tsx";
import Services from "./pages/Services.tsx";
import Home from "./pages/Home.tsx";
import RootLayout from "./RootLayout.tsx";
import WorkerProfile from "./components/WorkerProfile.tsx";
import Error from "./pages/Error.tsx";
import Login from "./pages/Login.tsx";
import WorkersList from "./components/WorkersList.tsx";
import Contact from "./components/Contact.tsx";
import Register from "./pages/Register.tsx";
import Faq from "./pages/Faq.tsx";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "workers/:id", element: <WorkerProfile /> },
      { path: "form", element: <Form /> },
      { path: "myorders", element: <MyOrders /> },
      { path: "profile", element: <Profile /> },
      { path: "services", element: <Services /> },
      { path: "services/:category", element: <WorkersList /> },
      { path: "contact", element: <Contact /> },
      { path: "faq", element: <Faq /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(rootElement as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
