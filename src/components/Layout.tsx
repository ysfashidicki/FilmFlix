import { FC, ReactNode } from "react";
import { Navbar } from "./Navbar";
import Footer from "./footer";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props) => {
  const { children } = props;
  return (
    <>
      <div className="z-50">
        <Navbar />
      </div>
      <div className="w-full mt-[15%] sm:mt-[11.5%] md:mt-[9%] lg:mt-[7%] xl:mt-[4%]">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
