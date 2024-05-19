import { Login, Signup } from "../Pages";


const unAuthProtectedRoutes = [
    { path: "/login", component: <Login /> },
    { path: "/signup", component: <Signup /> },
  ]
  


  
export { unAuthProtectedRoutes };