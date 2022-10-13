import React from "react";
import { getRate } from "../actions";
import Header from "../components/Header";
import Create from "../layouts/Create";

export default function create(Tezos, dispatch) {
  return (
    <div>
      <Create Tezos={Tezos} rate={() => dispatch(getRate({ Tezos }))} />
    </div>
  );
}
