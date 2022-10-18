import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { collectNFT, bidNFT, claimAuc } from "../actions";
import Token from "../sections/Token_card";
import config from "../config";
import Link from "next/link";

const HomePage = ({ Tezos }) => {
  console.log(Tezos);
  const selector = useSelector((state) => state.tokenData);
  const dispatch = useDispatch();

  const selector2 = selector.filter(
    (o, i) => o !== null && o.homepage !== undefined
  );
  const handleClick = (e, path) => {};
  const tokens = selector2.map((obj, idx) => (
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
    <div className="py-10 w-4/5 mx-auto">
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:gap-10 gap-6">
        {tokens}
      </div>
    </div>
  );
};

export default HomePage;
