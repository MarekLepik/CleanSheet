import React, { useState } from "react";
import { useFilePicker } from "use-file-picker";
import { NFTStorage, File } from "nft.storage";

import { startAuction } from "../actions";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

const apiKey = process.env.REACT_APP_STORAGE_KEY;
const client = new NFTStorage({ token: apiKey });

const StartAuction = ({ Tezos }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [openFileSelector, { filesContent }] = useFilePicker({
    accept: [".png", ".jpg", ".jpeg", ".gif", ".mp4"],
    multiple: false,
    readAs: "ArrayBuffer",
  });
  const [amount, setAmount] = useState("0");
  const [auctionDays, setAuctionDays] = useState(7);
  const [error, setError] = useState("");
  const [loadingSubmit, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      auctionDays === "" ||
      amount === "" ||
      !/^[0-9\d,]*\.?[0-9\d,]*$/.test(amount)
    ) {
      setError("Some Error Occurred. Please check entered details.");
      return;
    }
    setLoading(true);
    setError("");

    (async () => {
      const author = await Tezos.wallet.pkh();

      dispatch(
        startAuction({
          Tezos,
          token_id: id,
          days: parseInt(auctionDays),
          amount: parseInt(parseFloat(amount) * 1000000),
        })
      );

      setLoading(false);
      setAmount("0");
      setAuctionDays(7);
    })();
  };

  return (
    <div>
      <form className="ui form error">
        <div className={`field required ${loadingSubmit ? "disabled" : ""}`}>
          <label>Minimum selling price in TEZ</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
        </div>
        {!/^[0-9\d,]*\.?[0-9\d,]*$/.test(amount) && amount !== "" ? (
          <div className="ui error message">
            <div className="header">Only number allowed</div>
            <p>The amount must be a valid TEZ value.</p>
          </div>
        ) : null}

        <div className={`field required ${loadingSubmit ? "disabled" : ""}`}>
          <label>Auction days, possible values are 1, 7 and 30</label>
          <select
            value={auctionDays}
            onChange={(e) => setAuctionDays(e.target.value)}
            placeholder="7"
          >
            <option value="1">1</option>
            <option value="7">7</option>
            <option value="30">30</option>
          </select>
        </div>

        {error ? (
          <div className="ui error message">
            <div className="header">Error</div>
            <p>{error}</p>
          </div>
        ) : null}

        <button
          className={`ui button ${loadingSubmit ? "loading" : ""}`}
          onClick={(e) => onSubmit(e)}
          type="submit"
        >
          Start auction
        </button>
      </form>
    </div>
  );
};

export default StartAuction;
