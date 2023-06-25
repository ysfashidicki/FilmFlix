import axios from "axios";

export async function fetchMovies(currentPage: number) {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/now_playing?language=en-US&page=${currentPage}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      }
    );
    const { results, total_pages } = res.data;
    return { results, total_pages };
  } catch (err: any) {
    alert(err.toString());
    return { results: [], total_pages: 0 };
  }
}

export async function fetchSearchMovies(query: string) {
  try {
    const encodedQuery = encodeURIComponent(query);
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${encodedQuery}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      }
    );

    const { results, total_pages } = res.data;
    return { results, total_pages };
  } catch (err: any) {
    alert(err.toString());
    return { results: [], total_pages: 0 };
  }
}

export async function fetchMovieDetail(id: string) {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
    });
    return res.data;
  } catch (err: any) {
    alert(err.toString());
    return null;
  }
}

export async function fetchSimilarMovies(id: string) {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/${id}/similar`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      }
    );
    return res.data.results;
  } catch (err: any) {
    alert(err.toString());
    return null;
  }
}
