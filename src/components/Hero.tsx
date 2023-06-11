import { FC } from "react";
import { MovieType } from "../utils/types/movie";

import {
  BsFilm,
  BsFillMegaphoneFill,
  BsGraphUp,
  BsCurrencyDollar,
} from "react-icons/bs";
import { LuLanguages } from "react-icons/lu";
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";

export const Hero: FC<MovieType> = (props) => {
  const {
    backdrop_path,
    poster_path,
    original_title,
    release_date,
    production_countries,
    genres,
    runtime,
    overview,
    production_companies,
    status,
    spoken_languages,
    tagline,
    popularity,
    budget,
  } = props;
  const releaseYear = props.release_date.split("-")[0];
  const hours = Math.floor(props.runtime / 60);
  const minutes = props.runtime % 60;

  return (
    <section
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
        backgroundSize: "1900px",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex h-full w-full flex-wrap items-center justify-center bg-gradient-to-t from-white pt-10 pb-28 dark:from-black">
        <div className="grid grid-cols-4 gap-10 backdrop-blur-xl">
          <div className="w-[300px] max-h-[450px]">
            <figure>
              <img
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt={original_title}
              />
            </figure>
          </div>
          <div className="col-span-3 my-8">
            <h2 className="text-4xl font-bold">
              {" "}
              {original_title}{" "}
              <span className="font-medium">({releaseYear})</span>{" "}
            </h2>
            <p className="text-gray-700 text-xl">
              {release_date} (
              {production_countries
                .map((country) => country.iso_3166_1)
                .join(", ")}
              ) <span className="font-bold">|</span>{" "}
              {genres.map((genre) => genre.name).join(", ")}{" "}
              <span className="font-bold">|</span> {hours > 0 && `${hours}h`}{" "}
              {minutes > 0 && `${minutes}m`}
            </p>
            <div className="flex flex-col my-6">
              <p className="text-2xl font-bold">Overview</p>
              <p className="italic text-lg max-w-2xl">{overview}</p>
            </div>
            <div className="flex space-x-28 font-medium text-lg">
              <div className="grid grid-rows-3 gap-8">
                <div className="flex items-center justify-center space-x-2">
                  <BsFilm size={30} />
                  <p className="max-w-xs truncate">
                    {production_companies
                      .map((company) => company.name)
                      .join(", ")}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <BsFillMegaphoneFill size={30} />
                  <p>{status}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <LuLanguages size={30} />
                  <p className="truncate max-w-xs">
                    {spoken_languages
                      .map((language) => language.english_name)
                      .join(", ")}
                  </p>
                </div>
              </div>
              <div className="grid grid-rows-3 gap-8">
                <div className="flex items-center space-x-2">
                  <HiOutlineChatBubbleLeftEllipsis size={30} />
                  <p className="truncate max-w-xs">{tagline}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <BsGraphUp size={30} />
                  <p>{popularity}</p>
                </div>
                <div className="flex items-center">
                  <BsCurrencyDollar size={30} />
                  <p>{budget}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
