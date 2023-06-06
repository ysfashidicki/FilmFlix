import { FC, useState, useEffect } from "react";
import axios from "axios";

import Layout from "../components/Layout";
import { Card } from "../components/Card";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface MovieType {
  id: number;
  title: string;
  poster_path: string;
}

const Homepage: FC<MovieType> = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 97;
  const maxVisiblePages = 5;

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  function fetchData() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${currentPage}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiY2IxY2RlYjUyYmVlMmY2ZWU2MjgxOWZkZDc0ZWQwOSIsInN1YiI6IjY0N2ViYmMxOTM4MjhlMDEzMzc5MjUzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gv7Rsy-EmtqWUs_TS1uL9hQ_-TwLz3nIwwH1Sze4jXM",
          },
        }
      )
      .then((res) => {
        const { results } = res.data;
        setMovies(results);
      })
      .catch((err) => {
        alert(err.toString());
      });
  }

  function goTopage(page: number) {
    setCurrentPage(page);
  }

  function renderPageButtons() {
    const pageButtons = [];
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxVisiblePages) {
      const halfVisiblePages = Math.floor(maxVisiblePages / 2);

      if (currentPage > halfVisiblePages) {
        startPage = currentPage - halfVisiblePages;
        endPage = currentPage + halfVisiblePages;
        if (endPage > totalPages) {
          endPage = totalPages;
          startPage = totalPages - maxVisiblePages + 1;
        }
      } else {
        endPage = maxVisiblePages;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`join-item btn ${i === currentPage ? "active" : ""}`}
          onClick={() => goTopage(i)}
        >
          {i}
        </button>
      );
    }

    return pageButtons;
  }

  function goToPrevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function goToNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  return (
    <Layout>
      <div className="w-full h-auto py-4">
        <div className="flex items-center mx-auto justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {movies.map((movie) => {
              return (
                <Card
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  poster_path={movie.poster_path}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="join flex justify-center py-4">
        <button
          className={`join-item btn ${currentPage === 1 ? "disabled" : ""}`}
          onClick={goToPrevPage}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
        {renderPageButtons()}
        <button
          className={`join-item btn ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </button>
      </div>
    </Layout>
  );
};

export default Homepage;
