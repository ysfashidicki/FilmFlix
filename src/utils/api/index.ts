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
    const { results } = res.data;
    return results;
  } catch (err: any) {
    alert(err.toString());
    return [];
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
