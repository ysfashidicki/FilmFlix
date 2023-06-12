import { FC, useEffect, useState } from "react";
import { MovieType } from "../utils/types/movie";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Hero } from "../components/Hero";
import Layout from "../components/Layout";

const MovieDetail: FC = () => {
  const [movieData, setMovieData] = useState<MovieType | null>(null);
  const param = useParams();
  const { id } = param;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      })
      .then((res) => {
        const { data } = res;
        setMovieData(data);
      })
      .catch((err) => {
        alert(err.toString());
      });
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
