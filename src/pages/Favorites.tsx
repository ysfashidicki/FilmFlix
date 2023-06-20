import { FC, useEffect, useState } from "react";
import Swal from "sweetalert2";

import Layout from "../components/Layout";
import { Card } from "../components/Card";
import { MovieTypeCard } from "../utils/types/movie";

interface FavoritesType extends MovieTypeCard {
  id: number;
}

const Favorites: FC = () => {
  const [movies, setMovies] = useState<FavoritesType[]>([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setMovies(favorites);
  }, []);

  const handleRemoveFromFavorites = (title: string, poster_path: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "The movie will be removed from your favorites!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedFavorites = movies.filter(
          (movie) => movie.title !== title || movie.poster_path !== poster_path
        );
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setMovies(updatedFavorites);
        Swal.fire({
          title: "Deleted!",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <Layout>
      <div className="w-full h-auto py-4">
        <p className="text-6xl font-semibold text-center mb-8">
          Favorites Movies
        </p>
        <div className="flex items-center mx-auto justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 sm:gap-4">
            {movies.map((movie) => (
              <Card
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                buttonText="Delete from Favorites"
                onButtonClick={() =>
                  handleRemoveFromFavorites(movie.title, movie.poster_path)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Favorites;
