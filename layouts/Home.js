import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { collectNFT, bidNFT, claimAuc } from "../actions";
import Token from "../sections/Token_card";
import config from "../config";

const Home = ({ Tezos }) => {
  const selector = useSelector((state) => state.tokenData);
  const dispatch = useDispatch();
  const history = useHistory();

  const selector2 = selector.filter(
    (o, i) => o !== null && o.homepage !== undefined
  );

  const tokens = selector2.map((obj, idx) => (
    <Token
      key={idx}
      item={obj}
      onCollect={() =>
        dispatch(collectNFT({ Tezos, amount: obj.amount, id: obj.token_id }))
      }
      onClick={() => history.push(`/show/${obj.token_id}`)}
      onBid={() => history.push(`/make-bid/${obj.token_id}`)}
      tzktUrl={config.tokenAddress}
      timeLeft={Math.abs(new Date(obj.deadline) - new Date())}
      onClaim={() => dispatch(claimAuc({ Tezos, id: obj.token_id }))}
    />
  ));

  return <div className="ui link three column grid cards">{tokens}</div>;
};

export default Home;
