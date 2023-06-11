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
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiY2IxY2RlYjUyYmVlMmY2ZWU2MjgxOWZkZDc0ZWQwOSIsInN1YiI6IjY0N2ViYmMxOTM4MjhlMDEzMzc5MjUzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gv7Rsy-EmtqWUs_TS1uL9hQ_-TwLz3nIwwH1Sze4jXM",
        },
      })
      .then((res) => {
        const { data } = res;
        setMovieData(data);
      })
      .catch((err) => {
        alert(err.toString());
      });
  }

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
