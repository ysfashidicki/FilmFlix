import { FC } from "react";

import { TbMovie } from "react-icons/tb";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";

export const Navbar: FC = () => {
  return (
    <div className="shadow-md w-full top-0 left-0 bg-transparent">
      <div className="flex items-center justify-between py-4 md:px-10 px-7">
        <Link
          to={"/"}
          className="font-bold text-2xl cursor-pointer flex items-center"
        >
          <span className="text-3xl mr-1 pt-2">
            <TbMovie></TbMovie>
          </span>
          FilmFlix
        </Link>
        <ul>
          <li className="md:ml-8 text-xl duration-500 cursor-pointer hover:scale-125 transition-all ease-in-out">
            <Link to={"/favorites"}>
              <MdFavorite size={45} />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
