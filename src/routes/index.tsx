import { FC } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Homepage from "../pages";
import MovieDetail from "../pages/MovieDetail";

const Router: FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/detail/:id",
      element: <MovieDetail />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
