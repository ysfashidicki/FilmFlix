import { FC } from "react";

import { MovieTypeCard } from "../utils/types/movie";
import { Link } from "react-router-dom";

interface CardProps extends MovieTypeCard {
  buttonText: string;
  onButtonClick: () => void;
  id: number;
}

export const Card: FC<CardProps> = (props) => {
  const { title, poster_path, buttonText, onButtonClick, id } = props;

  return (
    <div className="card card-movie w-[180px] sm:w-[15rem] md:w-[14rem] lg:w-[15rem] xl:w-[15rem] bg-base-100 shadow-xl hover:scale-110 duration-300">
      <figure>
        <Link to={`/detail/${id}`} key={id}>
          <img
            src={
              poster_path
                ? `${import.meta.env.VITE_BASE_POSTER_URL}/${poster_path}`
                : "/No-Image-Placeholder.png"
            }
            alt={title}
          />
        </Link>
      </figure>
      <div className="card-body">
        <p className="text-2xl md:text-xl lg:text-lg font-bold text-center my-[-8px]">
          {title}
        </p>
        <div className="card-actions justify-center my-3">
          <button className="btn" onClick={onButtonClick}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
