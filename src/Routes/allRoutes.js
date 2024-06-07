import { Login, Signup, Dashboard, ResetPassword } from "../Pages";

const unAuthProtectedRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/signup", component: <Signup /> },
  { path: "/password-reset", component: <ResetPassword /> },
];

const authProtectedRoutes = [{ path: "/dashboard", component: <Dashboard /> }];

export { unAuthProtectedRoutes, authProtectedRoutes };
