import { Routes, Route } from "react-router-dom";
import { authProtectedRoutes, unAuthProtectedRoutes } from "./allRoutes";
import { AuthProtected } from "./AuthProtected";

export const Routs = () => {
  return (
    <Routes>
      <Route>
        {unAuthProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<div>{route.component}</div>}
            key={idx}
            exact={true}
          />
        ))}
      </Route>

      {authProtectedRoutes.map((route, idx) => (
        <Route
          key={idx}
          path={route.path}
          exact
          element={
            <AuthProtected>
              <div>{route.component}</div>
            </AuthProtected>
          }
        />
      ))}
    </Routes>
  );
};
