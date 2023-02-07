import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./modules";

const Account = lazy(() => import("@atms/components/account/account"));
const Profile = lazy(() => import("./components/profile/profile"));

export const routes = [
  {
    path: "/account",
    component: Account,
  },
  {
    path: "/profile/:username",
    component: Profile,
  },
];

export const AppRouter = () => (
    <Router>
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map((route, key) => {
            return (
                <Route path={route.path} key={key} element={<route.component />} />
            );
          })}
        </Routes>
      </Suspense>
    </Router>
);
