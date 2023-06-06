import React from "react";

export const Card = () => {
  return (
    <div className="card w-[450px] sm:w-[34rem] md:w-[26rem] lg:w-[20rem] xl:w-[19rem] bg-base-100 shadow-xl hover:scale-110 duration-300">
      <figure>
        <img src="/eduhub-login.jpg" alt="Shoes" />
      </figure>
      <div className="card-body">
        <p className="text-4xl md:text-3xl lg:text-2xl font-bold text-center">
          Shoes!
        </p>
        <div className="card-actions justify-center my-3">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};
