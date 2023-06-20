import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { Hero } from "../components/Hero";
import { Card } from "../components/Card";
import Layout from "../components/Layout";
import { MovieType, MovieTypeCard } from "../utils/types/movie";
import { fetchMovieDetail, fetchSimilarMovies } from "../utils/api";

interface SimilarMovieType extends MovieTypeCard {
  id: number;
}

const MovieDetail: FC = () => {
  const [movieData, setMovieData] = useState<MovieType | null>(null);
  const [similarmoviesData, setSimilarMoviesData] = useState<
    SimilarMovieType[]
  >([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      Promise.all([fetchMovieDetail(id), fetchSimilarMovies(id)]).then(
        ([data, results]) => {
          setMovieData(data);
          setSimilarMoviesData(results);
        }
      );
    }
  }, [id]);

  useEffect(() => {
    scrollToTop();
  }, [id]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  if (!movieData) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  const handleAddToFavorites = (
    id: number,
    title: string,
    poster_path: string
  ) => {
    const movieData = {
      id: id,
      title: title,
      poster_path: poster_path,
    };

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    const existingMovie = favorites.find((movie: any) => movie.title === title);

    if (existingMovie) {
      Swal.fire({
        title: "Warning",
        text: "The movie is already in your favorites!",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      favorites.push(movieData);

      localStorage.setItem("favorites", JSON.stringify(favorites));

      Swal.fire({
        title: "Success",
        text: "The movie has been added to your favorites!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    console.log(localStorage.getItem("favorites"));
  };

  return (
    <Layout>
      <div className="h-auto">
        <Hero {...movieData} />
        <div className="w-full h-auto py-4">
          <p className="text-6xl font-semibold text-center">Similar Movies</p>
          <div className="flex items-center mx-auto justify-center">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 sm:gap-4">
              {similarmoviesData.map((similarMovieData) => {
                return (
                  <Card
                    key={similarMovieData.id}
                    id={similarMovieData.id}
                    title={similarMovieData.title}
                    poster_path={similarMovieData.poster_path}
                    buttonText="Add to Favorites"
                    onButtonClick={() =>
                      handleAddToFavorites(
                        similarMovieData.id,
                        similarMovieData.title,
                        similarMovieData.poster_path
                      )
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MovieDetail;
