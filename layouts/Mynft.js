import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { makeFeatured, stopAuction } from "../actions";

import PersonalToken from "../sections/PersonalToken";

const Mynft = ({ Tezos }) => {
  const selector = useSelector((state) => state.tokenData);
  const dispatch = useDispatch();
  const history = useHistory();
  const currentAddress = useSelector(
    (state) => state.walletConfig.user.userAddress
  );

  const selector2 = selector.filter(
    (o, i) =>
      o !== null && o.homepage !== undefined && o.holder === currentAddress
  );

  const tokens = selector2.map((obj, idx) => (
    <PersonalToken
      key={idx}
      item={obj}
      onChangePrice={() => history.push(`/change-price/${obj.token_id}`)}
      onChangeSaleStatus={() =>
        history.push(`/change-sale-status/${obj.token_id}`)
      }
      onStartAuction={() => history.push(`/start-auction/${obj.token_id}`)}
      onStopAuction={() => dispatch(stopAuction({ Tezos, id: obj.token_id }))}
      onFeatured={() =>
        dispatch(
          makeFeatured({
            Tezos,
            id: obj.token_id,
            current_status: obj.is_featured,
          })
        )
      }
    />
  ));

  return <div className="ui link three column grid cards">{tokens}</div>;
};

export default Mynft;
