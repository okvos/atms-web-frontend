
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {NavBar} from "./modules";

const SignIn = lazy(() => import("./components/account/sign-in"));
const Profile = lazy(() => import("./components/profile/Profile"));


export const routes = [
  {
    path: "/sign-in",
    component: SignIn
  },
  {
    path: "/profile/:username",
    component: Profile
  }
];

export const AppRouter = () => (
    <Router>

      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map((route, key) => {
            return <Route path={route.path} key={key} element={<route.component />} />
          })}
        </Routes>
      </Suspense>
    </Router>
);
