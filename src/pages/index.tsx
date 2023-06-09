import { FC, useState, useEffect } from "react";
import Swal from "sweetalert2";

import { fetchMovies, fetchSearchMovies } from "../utils/api";
import { MovieTypeCard } from "../utils/types/movie";
import Layout from "../components/Layout";
import { Card } from "../components/Card";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GiMagnifyingGlass } from "react-icons/gi";
import { handleAddToFavorites } from "../utils/favoritesFilmUtils";

interface ListMoviesType extends MovieTypeCard {
  id: number;
}

const Homepage: FC = () => {
  const [movies, setMovies] = useState<ListMoviesType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const maxVisiblePages = 7;

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      Swal.fire({
        title: "Error",
        text: "Please enter a movie title",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    fetchSearchMovies(searchQuery)
      .then((res) => {
        setMovies(res.results);
        setTotalPages(res.total_pages);
      })
      .catch((err) => {
        alert(err.toString());
      });
  };

  useEffect(() => {
    fetchMovies(currentPage).then((data) => {
      setMovies(data.results);
      setTotalPages(data.total_pages);
    });
  }, [currentPage]);

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
        <div className="flex justify-center mx-auto my-6 space-x-5">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Type to search movie"
            className="input input-bordered input-accent input-lg w-full max-w-sm"
          />
          <button
            className="btn btn-square btn-outline btn-accent btn-lg"
            onClick={() => handleSearch()}
          >
            <GiMagnifyingGlass size={30} />
          </button>
        </div>
        <div className="flex items-center mx-auto justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 sm:gap-4">
            {movies.map((movie) => (
              <Card
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                buttonText="Add to Favorites"
                onButtonClick={() =>
                  handleAddToFavorites(movie.id, movie.title, movie.poster_path)
                }
              />
            ))}
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
