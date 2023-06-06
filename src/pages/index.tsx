import { FC } from "react";

import Layout from "../components/Layout";
import { Card } from "../components/Card";

const Homepage: FC = () => {
  return (
    <Layout>
      <div className="bg-slate-100 w-full h-auto py-4">
        <div className="flex items-center mx-auto justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
