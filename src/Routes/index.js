import { Routes, Route } from "react-router-dom";
import { unAuthProtectedRoutes } from "./allRoutes";

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
    </Routes>
  );
};
