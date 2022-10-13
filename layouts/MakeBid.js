import React, { useState } from "react";
import { useFilePicker } from "use-file-picker";
import { NFTStorage, File } from "nft.storage";

import { bidNFT } from "../actions";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

const apiKey = process.env.REACT_APP_STORAGE_KEY;
const client = new NFTStorage({ token: apiKey });

const MakeBid = ({ Tezos }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");
  const [loadingSubmit, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (amount === "" || !/^-?\d+$/.test(amount)) {
      setError("Some Error Occurred. Please check entered details.");
      return;
    }
    setLoading(true);
    setError("");

    (async () => {
      dispatch(bidNFT({ Tezos, amount: parseInt(amount) * 1000000, id }));

      setLoading(false);
      setAmount(amount);
    })();
  };

  return (
    <div>
      <form className="ui form error">
        <div className={`field required ${loadingSubmit ? "disabled" : ""}`}>
          <label>Your bid in TEZ</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
        </div>
        {!/^-?\d+$/.test(amount) && amount !== "" ? (
          <div className="ui error message">
            <div className="header">Only number allowed</div>
            <p>The amount must be a valid TEZ value.</p>
          </div>
        ) : null}

        <button
          className={`ui button ${loadingSubmit ? "loading" : ""}`}
          onClick={(e) => onSubmit(e)}
          type="submit"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default MakeBid;
