import { Outlet } from "react-router";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
const RootLayout = () => {
  return (
    <main className="bg-dark min-h-screen font-bold">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </main>
  );
};

export default RootLayout;
