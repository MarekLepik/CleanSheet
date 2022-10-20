import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { collectNFT, bidNFT, claimAuc } from "../actions";
import Token from "../sections/Token_card";
import config from "../config";
import Link from "next/link";
import User from "../components/User";

const HomePage = ({ Tezos }) => {
  console.log(Tezos);
  const selector = useSelector((state) => state.tokenData);
  const dispatch = useDispatch();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    s: "",
  });

  //this useEffect updates everytime selector value changes.
  useEffect(() => {
    (async () => {
      const filteredSelector = selector.filter(
        (o, i) => o !== null && o.homepage !== undefined
      );
      setAllProducts(filteredSelector);
      setFilteredProducts(filteredSelector);
    })();
  }, [selector]);

  //this useEffect filters shown artworks. It is called when filters value changes.
  useEffect(() => {
    let nfts = allProducts.filter((p) => {
      if (filters.s === "collectable") {
        if (p.collectable) {
          return p;
        }
      } else {
        return p;
      }
    });
    setFilteredProducts(nfts);
  }, [filters]);

  //this handler changes filters value on triggering.
  const handleFilter = (s) => {
    setFilters({
      s,
    });
  };
  const listings = () => {
    const all = 0;
    const active = 0;
    allProducts.map((nft) => {
      if (nft.collectable) {
        active += 1;
      }
      all += 1;
    });
    return { all, active };
  };
  const tokens = filteredProducts.map((obj, idx) => (
    <a href={`/assets/${obj.token_id}`}>
      <Token
        key={idx}
        item={obj}
        onCollect={() =>
          dispatch(collectNFT({ Tezos, amount: obj.amount, id: obj.token_id }))
        }
        onBid={() => console.log()}
        tzktUrl={config.tokenAddress}
        timeLeft={Math.abs(new Date(obj.deadline) - new Date())}
        onClaim={() => dispatch(claimAuc({ Tezos, id: obj.token_id }))}
      />
    </a>
  ));

  return (
    <div>
      <User collected={listings().all} />
      <div className="w-4/5 mx-auto">
        <div className="space-x-12 text-2xl text-kanvas-darker-grey">
          <button onClick={() => handleFilter("all")}>
            Collection {listings().all}
          </button>
          <button onClick={() => handleFilter("collectable")}>
            Active listings {listings().active}
          </button>
        </div>
        <hr className="bg-kanvas-darker-grey" />
      </div>
      <div className="py-10 w-4/5 mx-auto">
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:gap-10 gap-6">
          {tokens}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
