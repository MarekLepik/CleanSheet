import React, { useState } from "react";
import { useFilePicker } from "use-file-picker";
import { NFTStorage, File } from "nft.storage";

import { claimAuc, fetchData, getRate, mintNFT } from "../actions";
import { useDispatch, useSelector } from "react-redux";

const apiKey = process.env.REACT_APP_STORAGE_KEY;
const client = new NFTStorage({ token: apiKey });

const Create = ({ Tezos, rate }) => {
  const dispatch = useDispatch();
  const [openFileSelector, { filesContent }] = useFilePicker({
    accept: [".png", ".jpg", ".jpeg", ".gif", ".mp4"],
    multiple: false,
    readAs: "ArrayBuffer",
  });

  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [description, setDescription] = useState("");
  const [symbol, setSymbol] = useState("KVS");
  const [amount, setAmount] = useState("0");
  const [homepage, setHomepage] = useState("");
  const [isAuction, setAuction] = useState(false);
  const [auctionDays, setAuctionDays] = useState(7);
  const [error, setError] = useState("");
  const [loadingSubmit, setLoading] = useState(false);
  // const currencyRate = cur;
  // console.log(currencyRate);

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      title === "" ||
      description === "" ||
      symbol === "" ||
      amount === "" ||
      auctionDays === "" ||
      !/^[0-9\d,]*\.?[0-9\d,]*$/.test(amount) ||
      filesContent.length === 0 ||
      creator === ""
    ) {
      setError("Some Error Occurred. Please check entered details.");
      return;
    }
    setLoading(true);
    setError("");

    (async () => {
      const author = await Tezos.wallet.pkh();
      const metadata = await client.store({
        name: title,
        author: author,
        description: description,
        decimals: 0,
        symbol: symbol,
        homepage: homepage,
        creator: creator,
        image: new File([filesContent[0].content], filesContent[0].name, {
          type: "image/" + filesContent[0].name.split(".")[1],
        }),
      });
      console.log(isAuction);
      console.log(parseFloat(amount) * 1000000);
      dispatch(
        mintNFT({
          Tezos,
          amount: parseInt(parseFloat(amount) * 1000000),
          auction: +isAuction,
          days: isAuction ? parseInt(auctionDays) : 0,
          metadata: metadata.url,
        })
      );

      setLoading(false);
      setTitle("");
      setAmount("0");
      setDescription("");
      setSymbol("KVS");
      setHomepage("");
      setAuction(false);
      setCreator("");
      setAuctionDays(7);
    })();
  };

  return (
    <div>
      <form className="ui form error">
        <div className={`field required ${loadingSubmit ? "disabled" : ""}`}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="NFT title"
          />
        </div>
        {title.length > 30 ? (
          <div className="ui error message">
            <div className="header">Too long!</div>
            <p>The title must be less than 30 letters.</p>
          </div>
        ) : null}

        <div className={`field required ${loadingSubmit ? "disabled" : ""}`}>
          <label>Creator</label>
          <input
            type="text"
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
            placeholder="NFT creator"
          />
        </div>
        {creator.length > 50 ? (
          <div className="ui error message">
            <div className="header">Too long!</div>
            <p>The creator name must be less than 50 letters.</p>
          </div>
        ) : null}

        <div className={`field required ${loadingSubmit ? "disabled" : ""}`}>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A digital art piece!"
          />
        </div>
        {description.length > 300 ? (
          <div className="ui error message">
            <div className="header">Too long!</div>
            <p>The Description must be less than 300 letters.</p>
          </div>
        ) : null}
        <div
          className={`field required disabled
					`}
        >
          <label>Symbol</label>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="KVS"
          />
        </div>
        {Symbol.length > 10 ? (
          <div className="ui error message">
            <div className="header">Too long!</div>
            <p>The Symbol must be less than 10 letters.</p>
          </div>
        ) : null}
        <div className={`field required ${loadingSubmit ? "disabled" : ""}`}>
          <label>Selling Amount in TEZ</label>
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
          <label>Is Auction</label>
          <input
            type="checkbox"
            defaultChecked={isAuction}
            onChange={(e) => setAuction(!isAuction)}
            placeholder="Is auction"
          />
        </div>

        <div
          className={`field required ${
            loadingSubmit || !isAuction ? "disabled" : ""
          }`}
        >
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

        <div className={`field`}>
          <label>Link to homepage</label>
          <input
            type="text"
            value={homepage}
            onChange={(e) => setHomepage(e.target.value)}
            placeholder="Homepage url"
          />
        </div>

        <div className={`field required ${loadingSubmit ? "disabled" : ""}`}>
          <label>Image</label>
          <button
            type="button"
            className="ui basic button"
            onClick={(event) => {
              openFileSelector();
              event.preventDefault();
            }}
          >
            Select files{" "}
          </button>
          {filesContent.length > 0 ? filesContent[0].name : ""}
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
          Mint
        </button>
      </form>
    </div>
  );
};

export default Create;
