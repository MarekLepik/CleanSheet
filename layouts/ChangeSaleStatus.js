import React, { useState } from "react";
import { useFilePicker } from "use-file-picker";
import { NFTStorage, File } from "nft.storage";

import { changeSaleStatus } from "../actions";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

const apiKey = process.env.REACT_APP_STORAGE_KEY;
const client = new NFTStorage({ token: apiKey });

const ChangeSaleStatus = ({ Tezos }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [collectable, setCollectable] = useState(false);
  const [error, setError] = useState("");
  const [loadingSubmit, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    (async () => {
      dispatch(changeSaleStatus({ Tezos, collectable, token_id: id }));

      setLoading(false);
      setCollectable(collectable);
    })();
  };

  return (
    <div>
      <form className="ui form error">
        <div className={`field required ${loadingSubmit ? "disabled" : ""}`}>
          <label>Is on sale?</label>
          <input
            type="checkbox"
            defaultChecked={collectable}
            onChange={(e) => setCollectable(!collectable)}
            placeholder="Is auction"
          />
        </div>

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

export default ChangeSaleStatus;
