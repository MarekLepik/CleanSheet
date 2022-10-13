import { TezosToolkit } from "@taquito/taquito";

import config from "../config";
import axios from "axios";

export const connectWallet = ({ wallet, Tezos }) => {
  return async (dispatch) => {
    try {
      var payload = {};

      Tezos.setWalletProvider(wallet);

      const activeAccount = await wallet.client.getActiveAccount();
      if (!activeAccount) {
        await wallet.requestPermissions({
          network: {
            type: "custom",
            rpcUrl: "https://kathmandunet.tezos.marigold.dev/",
          },
        });
      }
      const userAddress = await wallet.getPKH();
      const balance = await Tezos.tz.getBalance(userAddress);

      payload.user = {
        userAddress: userAddress,
        balance: balance.toNumber(),
      };
      dispatch(_walletConfig(payload.user));
    } catch (error) {
      console.log(error);
      dispatch({
        type: "CONNECT_WALLET_ERROR",
      });
    }
  };
};

export const _walletConfig = (user) => {
  return {
    type: "CONNECT_WALLET",
    user,
  };
};

export const disconnectWallet = ({ wallet, setTezos }) => {
  return async (dispatch) => {
    setTezos(new TezosToolkit("https://kathmandunet.tezos.marigold.dev/"));

    dispatch({
      type: "DISCONNECT_WALLET",
    });

    if (wallet) {
      await wallet.client.removeAllAccounts();
      await wallet.client.removeAllPeers();
      await wallet.client.destroy();
    }
  };
};

export const hex2buf = (hex) => {
  return new Uint8Array(hex.match(/[\da-f]{2}/gi).map((h) => parseInt(h, 16)));
};

export function bytes2Char(hex) {
  return Buffer.from(hex2buf(hex)).toString("utf8");
}

export const fetchData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://api.kathmandunet.tzkt.io/v1/contracts/${config.contractAddress}/bigmaps/data/keys`
      );
      const response1 = await axios.get(
        `https://api.kathmandunet.tzkt.io/v1/contracts/${config.tokenAddress}/bigmaps/token_metadata/keys`
      );
      const d1 = response.data;
      const d2 = response1.data;
      let tokenData = [];
      for (let i = 0; i < d1.length; i++) {
        const s = bytes2Char(d2[i].value.token_info[""]).split("//").at(-1);

        var res = "";
        try {
          res = await axios.get("https://ipfs.io/ipfs/" + s);
        } catch (e) {
          continue;
        }

        const l1 = d1[i].value;
        const l2 = res.data;
        tokenData[i] = {
          ...l1,
          ...l2,
          token_id: d2[i].value.token_id,
        };
      }
      console.log(tokenData);
      dispatch({ type: "SET_TOKEN_DATA", payload: tokenData });
    } catch (e) {
      console.log(e);
    }
  };
};

export const mintNFT = ({ Tezos, amount, auction, days, metadata }) => {
  return async (dispatch) => {
    try {
      const contract = await Tezos.wallet.at(config.contractAddress);
      console.log(metadata, amount);
      var bytes = "";
      for (var i = 0; i < metadata.length; i++) {
        bytes += metadata.charCodeAt(i).toString(16).slice(-4);
      }
      console.log(bytes);
      const op = await contract.methods
        .mint(amount, auction, days, bytes)
        .send({ mutez: true, amount: 1000000 });
      await op.confirmation();
      dispatch(fetchData());
    } catch (e) {
      console.log(e);
    }
  };
};

export const bidNFT = ({ Tezos, amount, id }) => {
  return async (dispatch) => {
    try {
      console.log(amount);
      const contract = await Tezos.wallet.at(config.contractAddress);
      console.log(contract.parameterSchema.ExtractSignatures());
      const op = await contract.methods
        .bid(id)
        .send({ mutez: true, amount: amount });
      await op.confirmation();
      dispatch(fetchData());
    } catch (e) {
      console.log(e);
    }
  };
};

export const collectNFT = ({ Tezos, amount, id }) => {
  return async (dispatch) => {
    try {
      const contract = await Tezos.wallet.at(config.contractAddress);

      const op = await contract.methods
        .collect(id)
        .send({ mutez: true, amount: amount });
      await op.confirmation();
      dispatch(fetchData());
    } catch (e) {
      console.log(e);
    }
  };
};

export const changeSaleStatus = ({ Tezos, collectable, token_id }) => {
  return async (dispatch) => {
    try {
      console.log("changeSaleStatus");
      const contract = await Tezos.wallet.at(config.contractAddress);
      console.log(Tezos);
      const op = await contract.methods
        .change_sale_status(collectable, token_id)
        .send();
      await op.confirmation();
      dispatch(fetchData());
    } catch (e) {
      console.log(e);
    }
  };
};

export const changeTokenPrice = ({ Tezos, token_id, amount }) => {
  return async (dispatch) => {
    try {
      console.log("changeTokenPrice");
      const contract = await Tezos.wallet.at(config.contractAddress);
      const op = await contract.methods
        .change_token_price(amount, token_id)
        .send();
      await op.confirmation();
      dispatch(fetchData());
    } catch (e) {
      console.log(e);
    }
  };
};

export const startAuction = ({ Tezos, token_id, days, amount }) => {
  return async (dispatch) => {
    try {
      const contract = await Tezos.wallet.at(config.contractAddress);
      const signatures = contract.parameterSchema.ExtractSignatures();
      console.log(contract.parameterSchema);
      const op = await contract.methods
        .start_auction(amount, days, token_id)
        .send({ mutez: true, amount: 1000000 });
      await op.confirmation();
      dispatch(fetchData());
    } catch (e) {
      console.log(e);
    }
  };
};

export const claimAuc = ({ Tezos, id }) => {
  return async (dispatch) => {
    try {
      const contract = await Tezos.wallet.at(config.contractAddress);
      const signatures = contract.parameterSchema.ExtractSignatures();
      console.log(signatures);
      const op = await contract.methods.claim_auction(parseInt(id)).send();
      await op.confirmation();
      dispatch(fetchData());
    } catch (e) {
      console.log(e);
    }
  };
};

export const getRate = ({ Tezos }) => {
  return async (dispatch) => {
    try {
      const contract = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=tezos"
      );
      console.log(contract);
      return contract.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const stopAuction = ({ Tezos, id }) => {
  return async (dispatch) => {
    try {
      const contract = await Tezos.wallet.at(config.contractAddress);
      const op = await contract.methods
        .stop_auction(parseInt(id))
        .send({ mutez: true, amount: 1000000 });
      await op.confirmation();
      dispatch(fetchData());
    } catch (e) {
      console.log(e);
    }
  };
};

export const makeFeatured = ({ Tezos, id, current_status }) => {
  return async (dispatch) => {
    try {
      const contract = await Tezos.wallet.at(config.contractAddress);
      const featured = current_status ? 0 : 1;
      const op = await contract.methods
        .change_featured_status(featured, parseInt(id))
        .send({ mutez: true, amount: 1000000 });
      await op.confirmation();
      dispatch(fetchData());
    } catch (e) {
      console.log(e);
    }
  };
};
