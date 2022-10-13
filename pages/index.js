import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import {
  NetworkType,
  BeaconEvent,
  defaultEventCallbacks,
  ColorMode,
} from "@airgap/beacon-sdk";
import {
  fetchData,
  getRate,
  _walletConfig,
  connectWallet,
  disconnectWallet,
} from "../actions";
import Link from "next/link";
import Header from "../components/Header";

export default function Home() {
  const dispatch = useDispatch();
  const [Tezos, setTezos] = useState(
    new TezosToolkit("https://kathmandunet.smartpy.io/")
  );
  const [wallet, setWallet] = useState(null);
  let userAddress = undefined;

  useEffect(() => {
    (async () => {
      const wallet_instance = new BeaconWallet({
        name: "Kanvas NFT marketplace",
        preferredNetwork: NetworkType.KATHMANDUNET,
        colorMode: ColorMode.LIGHT,
        disableDefaultEvents: false, // Disable all events / UI. This also disables the pairing alert.
        eventHandlers: {
          // To keep the pairing alert, we have to add the following default event handlers back
          [BeaconEvent.PAIR_INIT]: {
            handler: defaultEventCallbacks.PAIR_INIT,
          },
          [BeaconEvent.PAIR_SUCCESS]: {
            handler: (data) => {
              return data.publicKey;
            },
          },
        },
      });
      Tezos.setWalletProvider(wallet_instance);
      const activeAccount = await wallet_instance.client.getActiveAccount();
      if (activeAccount) {
        userAddress = await wallet_instance.getPKH();
        const balance = await Tezos.tz.getBalance(userAddress);
        dispatch(
          _walletConfig({
            userAddress: userAddress,
            balance: balance.toNumber(),
          })
        );
      }
      setWallet(wallet_instance);
    })();
  }, [Tezos, dispatch]);

  useEffect(() => {
    dispatch(fetchData());
  }, [Tezos, dispatch]);

  return (
    <div>
      <div>
        <div>
          <Header Tezos={Tezos} setTezos={setTezos} wallet={wallet} />
        </div>
        <div></div>
      </div>
    </div>
  );
}
