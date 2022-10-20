import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

function User({ collected }) {
  return (
    <div className="relative mb-96">
      <div className="mx-auto w-full h-80 relative">
        {/* here goes background picture*/}
        <Image
          className="z-0"
          src="/assets/BACKGROUND-1.png"
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className="w-4/5 bg-white absolute top-32 -translate-x-1/2 left-1/2 rounded-2xl shadow-md">
        <div className="flex justify-evenly pl-12 2xl:pl-20 pt-24 pb-24 2xl:space-x-28 xl:space-x-8 space-x-4 max-w-screen-2xl mx-auto">
          <div className="rounded-full relative sm:w-28 sm:h-28 md:w-28 md:h-28 xl:w-56 xl:h-56 flex-initial">
            {/* here goes User picture*/}
            <Image src="/assets/Ellipse-1.png" layout="fill" />
          </div>
          <div className="flex-1 pl-12">
            <div className="flex justify-between space-x-10 2xl:space-x-20">
              <section>
                <h1 className="text-xl xl:text-2xl 2xl:text-3xl font-bold">
                  Collector name
                </h1>
                <h2 className="md:text-md xl:text-lg font-bold text-kanvas-blue pt-6">
                  {`${collected} NFTs collected`}
                </h2>
              </section>
              <section className="pr-10 md:pr-24 xl:pr-16 2xl:pr-48 space-x-8 flex">
                <div>
                  <button className="bg-kanvas-blue text-white pl-8 pr-8 pt-2 pb-2 rounded-full shadow-sm">
                    follow
                  </button>
                </div>
                <div>
                  <button className="bg-kanvas-blue text-white pl-8 pr-8 pt-2 pb-2 rounded-full shadow-sm">
                    share
                  </button>
                </div>
              </section>
            </div>
            <div className="pt-12">
              <section className="md:max-w-md xl:max-w-xl text-justify text-sm md:text-base xl:text-lg">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean tincidunt at lectus at commodo. Integer volutpat
                  placerat quam, a interdum diam malesuada vulputate. Nunc
                  scelerisque ultrices quam et posuere. Fusce suscipit rhoncus
                  magna id pretium. Donec hendrerit aliquam elit sit amet
                  vulputate. Fusce nec lectus eu purus rutrum suscipit. Mauris
                  ante metus, luctus eget enim eget, sagittis molestie nisi.
                  Praesent a blandit est. Sed finibus sollicitudin metus nec
                  consectetur.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
