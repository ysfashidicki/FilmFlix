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
      <Navbar />
      <div className="w-full h-screen">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
