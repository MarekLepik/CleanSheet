import Image from "next/image";
import { Link } from "react-router-dom";

const Token = ({
  item,
  onClick,
  onCollect,
  onBid,
  tzktUrl,
  timeLeft,
  onClaim,
}) => {
  return item.collectable ? (
    item.is_auction ? (
      //Item on auction and you can bid on it
      <div className="bg-white pt-12 pb-8 pl-4 pr-4 shadow-md rounded-xl">
        <div className="mx-auto space-y-4" key={item.id}>
          <h2 className="bg-kanvas-blue rounded-2xl text-center text-white w-1/2 mx-auto -mt-14 mb-9">
            {`${Math.floor(timeLeft / 86400000)} days, ${
              Math.floor(Math.abs(timeLeft) / 1000 / 60 / 60) % 24
            } hours, ${
              Math.floor(Math.abs(timeLeft) / 1000 / 60) % 60
            } minutes`}
          </h2>
          <div className="relative w-full h-72 mx-auto">
            <Image
              src={`https://ipfs.io/ipfs/${item.image.split("ipfs://")[1]}`}
              alt={item.description}
              objectFit="cover"
              layout="fill"
            />
          </div>
          <h2>{item.creator}</h2>
          <h2>{item.name}</h2>
          <p className="text-gray-300">
            {item.is_auction ? "Current bid" : "Buy now"}
          </p>
          <h1 className="text-kanvas-blue text-xl font-bold">
            {`${item.amount / 1000000.0}` + `TEZ`}
          </h1>
        </div>
      </div>
    ) : (
      //You can buy this item and its not on auction
      <div className="bg-white pt-12 pb-8 pl-4 pr-4 shadow-md rounded-xl">
        <div className="mx-auto space-y-4" key={item.id}>
          <div className="relative w-full h-72 mx-auto">
            <Image
              src={`https://ipfs.io/ipfs/${item.image.split("ipfs://")[1]}`}
              alt={item.description}
              objectFit="cover"
              layout="fill"
            />
          </div>
          <h2>{item.creator}</h2>
          <h2>{item.name}</h2>
          <p className="text-gray-300">
            {item.is_auction ? "Current bid" : "Buy now"}
          </p>
          <h1 className="text-kanvas-blue text-xl font-bold">
            {`${item.amount / 1000000.0}` + `TEZ`}
          </h1>
        </div>
      </div>
    )
  ) : (
    //Item is not collectible - you cant buy nor bid on this
    <div className="bg-white pt-12 pb-8 pl-4 pr-4 shadow-md rounded-xl">
      <div className="mx-auto space-y-4" key={item.id}>
        <div className="relative w-52 h-72 mx-auto">
          <Image
            src={`https://ipfs.io/ipfs/${item.image.split("ipfs://")[1]}`}
            alt={item.description}
            objectFit="cover"
            layout="fill"
          />
        </div>
        <h2>{item.creator}</h2>
        <h2>{item.name}</h2>
        <p className="text-gray-300">last sold</p>
        <h1 className="text-kanvas-blue text-xl font-bold">
          {`${item.amount / 1000000.0}` + `TEZ`}
        </h1>
      </div>
    </div>
  );
};

export default Token;
