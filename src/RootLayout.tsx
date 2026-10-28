import { Outlet, ScrollRestoration } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Toast } from "./components/Toast";
import { useCurrentUser } from "./hooks/useQueries";

const RootLayout = () => {
  // Automatically restore user profile session on mount
  useCurrentUser();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <Toast />
      <header className="sticky top-0 z-40">
        <NavBar />
      </header>

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
      <ScrollRestoration />
    </div>
  );
};

export default RootLayout;
