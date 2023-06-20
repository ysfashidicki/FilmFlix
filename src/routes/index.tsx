import { FC } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Homepage from "../pages";
import MovieDetail from "../pages/MovieDetail";
import Favorites from "../pages/Favorites";

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
    {
      path: "/favorites",
      element: <Favorites />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
