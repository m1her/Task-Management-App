import { Login, Signup, Dashboard, ResetPassword } from "../Pages";

const unAuthProtectedRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/signup", component: <Signup /> },
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/password-reset", component: <ResetPassword /> },
];

export { unAuthProtectedRoutes };
