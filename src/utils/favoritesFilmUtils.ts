import Swal from "sweetalert2";

export const handleAddToFavorites = (
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
};
