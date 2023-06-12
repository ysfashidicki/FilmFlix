export interface MovieType {
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  release_date: string;
  production_countries: {
    iso_3166_1: string;
  }[];
  genres: {
    name: string;
  }[];
  runtime: number;
  overview: string;
  production_companies: {
    name: string;
  }[];
  status: string;
  spoken_languages: {
    english_name: string;
  }[];
  tagline: string;
  popularity: number;
  budget: number;
}

export interface MovieTypeCard {
  title: string;
  poster_path: string;
}
