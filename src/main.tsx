import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import Form from "./pages/Form";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import Home from "./pages/Home";
import RootLayout from "./RootLayout";
import WorkerProfile from "./components/WorkerProfile";
import Error from "./pages/Error";
import Login from "./pages/Login";
import WorkersList from "./components/WorkersList";
import Contact from "./components/Contact";
import Register from "./pages/Register";
import Faq from "./pages/Faq";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 2, // 2 minutes cache
      retry: 1,
    },
  },
});

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
