import { Outlet } from "react-router";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/settings/settingsSlics";
const RootLayout = () => {
  
  const theme = useSelector(selectTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <main className="bg-light-bg dark:bg-dark min-h-screen font-bold">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default RootLayout;
