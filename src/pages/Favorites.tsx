import { FC, useEffect, useState } from "react";
import Swal from "sweetalert2";

import Layout from "../components/Layout";
import { Card } from "../components/Card";
import { MovieTypeCard } from "../utils/types/movie";

interface FavoritesType extends MovieTypeCard {
  id: number;
}

const Favorites: FC = () => {
  const [favorites, setFavorites] = useState<FavoritesType[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
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
        const updatedFavorites = favorites.filter(
          (movie) => movie.title !== title || movie.poster_path !== poster_path
        );
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
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
        {favorites.length === 0 ? (
          <p className="text-6xl font-semibold text-center mb-8 hidden">
            Favorites Movies
          </p>
        ) : (
          <p className="text-6xl font-semibold text-center mb-8 block">
            Favorites Movies
          </p>
        )}
        {favorites.length === 0 ? (
          <div
            className="flex p-7 sm:p-20 flex-col gap-10 h-full bg-[url(/film1.jpg)] bg-center bg-cover"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.5)),url(/film1.jpg)`,
            }}
          >
            <div className="h-screen text-5xl font-medium flex justify-center text-gray-500">
              <p>Your favorites list is empty</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center mx-auto justify-center">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 sm:gap-4">
              {favorites.map((movie) => (
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
        )}
      </div>
    </Layout>
  );
};

export default Favorites;
