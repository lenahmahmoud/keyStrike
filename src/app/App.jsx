import Home from "../pages/Home";
import HowItWorks from "../pages/HowItWorks";
import Login from "../features/users/Login";
import SignUp from "../features/users/SignUp";
import DashBoard from "../features/history/DashBoard";
import Test from "../features/test/Test";
import Result from "../features/results/Result";

import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import HistoryLayout from "../layouts/HistoryLayout";

import { RouterProvider } from "react-router";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="howitworks" element={<HowItWorks />} />
        <Route path="test" element={<Test></Test>}></Route>
        <Route path="result" element={<Result></Result>}></Route>
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
      <Route >
     <Route element={<HistoryLayout></HistoryLayout>}>
       <Route path="dashboard" element={<DashBoard></DashBoard>}></Route>
     </Route>
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
