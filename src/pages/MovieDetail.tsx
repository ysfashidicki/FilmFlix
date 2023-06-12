import { FC, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Hero } from "../components/Hero";
import { Card } from "../components/Card";
import Layout from "../components/Layout";
import { MovieType } from "../utils/types/movie";
import { fetchMovieDetail, fetchSimilarMovies } from "../utils/api";

interface SimilarMovieType {
  id: number;
  title: string;
  poster_path: string;
}

const MovieDetail: FC = () => {
  const [movieData, setMovieData] = useState<MovieType | null>(null);
  const [similarmoviesData, setSimilarMoviesData] = useState<
    SimilarMovieType[]
  >([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetchMovieDetail(id).then((data) => {
        setMovieData(data);
      });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchSimilarMovies(id).then((results) => {
        console.log(similarmoviesData);
        setSimilarMoviesData(results);
      });
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

  return (
    <Layout>
      <div className="h-auto">
        <Hero {...movieData} />
        <div className="w-full h-auto py-4">
          <p className="text-6xl font-semibold text-center my-5">
            Similar Movies
          </p>
          <div className="flex items-center mx-auto justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {similarmoviesData.map((similarMovieData) => {
                return (
                  <Link
                    to={`/detail/${similarMovieData.id.toString()}`}
                    key={similarMovieData.id}
                  >
                    <Card
                      title={similarMovieData.title}
                      poster_path={similarMovieData.poster_path}
                    />
                  </Link>
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
