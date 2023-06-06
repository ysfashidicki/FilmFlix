import { FC } from "react";
import Button from "./Button";

interface MovieCardType {
  id: number;
  title: string;
  poster_path: string;
}

export const Card: FC<MovieCardType> = (props) => {
  const { title, poster_path } = props;
  return (
    <div className="card w-[450px] sm:w-[34rem] md:w-[26rem] lg:w-[20rem] xl:w-[19rem] bg-base-100 shadow-xl hover:scale-110 duration-300">
      <figure>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : `/No-Image-Placeholder.png`
          }
          alt={title}
        />
      </figure>
      <div className="card-body">
        <p className="text-4xl md:text-3xl lg:text-2xl font-bold text-center">
          {title}
        </p>
        <div className="card-actions justify-center my-3">
          <Button label="ADD TO FAVORITE" />
        </div>
      </div>
    </div>
  );
};
