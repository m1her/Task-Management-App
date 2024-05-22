import { Login, Signup } from "../Pages";
import { Dashboard } from "../Pages/Dashboard";


const unAuthProtectedRoutes = [
    { path: "/login", component: <Login /> },
    { path: "/signup", component: <Signup /> },
    { path: "/dashboard", component: <Dashboard /> },
  ]
  


  
export { unAuthProtectedRoutes };