import Home from "../pages/Home";
import HowItWorks from "../pages/HowItWorks";
import Login from "../features/users/Login";

import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";

import { RouterProvider } from "react-router";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import SignUp from "../features/users/SignUp";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="howitworks" element={<HowItWorks />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    </>,
  ),
);

const App = () => {
  return (
    <>
      <main>
        <RouterProvider router={router}></RouterProvider>
      </main>
    </>
  );
};

export default App;
