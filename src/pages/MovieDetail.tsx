import { FC, useEffect, useState } from "react";
import { MovieType } from "../utils/types/movie";
import { fetchMovieDetail } from "../utils/api";
import { useParams } from "react-router-dom";

import { Hero } from "../components/Hero";
import Layout from "../components/Layout";

const MovieDetail: FC = () => {
  const [movieData, setMovieData] = useState<MovieType | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetchMovieDetail(id).then((data) => {
        setMovieData(data);
      });
    }
  }, []);

  if (!movieData) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  return (
    <Layout>
      <div className="h-screen">
        <Hero {...movieData} />
      </div>
    </Layout>
  );
};

export default MovieDetail;
