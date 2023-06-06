import { FC, useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { TbMovie } from "react-icons/tb";
import { GrClose } from "react-icons/gr";

export const Navbar: FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center">
          <span className="text-3xl mr-1 pt-2">
            <TbMovie></TbMovie>
          </span>
          Idlix
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {open ? <GrClose /> : <GiHamburgerMenu />}
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          <li className="md:ml-8 text-xl md:my-0 my-7 duration-500 cursor-pointer hover:scale-125 transition-all ease-in-out">
            Home
          </li>
          <li className="md:ml-8 text-xl md:my-0 my-7 duration-500 cursor-pointer hover:scale-125 transition-all ease-in-out">
            Service
          </li>
          <li className="md:ml-8 text-xl md:my-0 my-7 duration-500 cursor-pointer hover:scale-125 transition-all ease-in-out">
            About Us
          </li>
          <li className="md:ml-8 text-xl md:my-0 my-7 duration-500 cursor-pointer hover:scale-125 transition-all ease-in-out">
            Blog
          </li>
          <li className="md:ml-8 text-xl md:my-0 my-7 duration-500 cursor-pointer hover:scale-125 transition-all ease-in-out">
            Contact
          </li>
        </ul>
      </div>
    </div>
  );
};
