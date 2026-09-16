import { Outlet } from "react-router";
import Navbar from "../components/layout/Navbar";
const AuthLayout = () => {
  return (
    <>
   <main className="font-bold bg-dark min-h-screen">  
     <Navbar></Navbar>
      <Outlet></Outlet>
   </main>
    </>
  );
};

export default AuthLayout;
