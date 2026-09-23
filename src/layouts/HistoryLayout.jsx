import { Outlet } from "react-router";

import Navbar from "../components/layout/Navbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/settings/settingsSlics";

const HistoryLayout = () => {
  const theme = useSelector(selectTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <>
      <main className="font-bold bg-light-bg dark:bg-dark min-h-screen">
        <Navbar />
        <Outlet />
      </main>
    </>
  );
};

export default HistoryLayout;
