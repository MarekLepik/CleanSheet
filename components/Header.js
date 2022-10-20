import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { connectWallet, disconnectWallet } from "../actions";
import Image from "next/image";
import { useState } from "react";

function Header({ Tezos, wallet, setTezos }) {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const burger = hamburgerOpen ? "absolute z-10" : "hidden";
  const selector = useSelector((state) => {
    console.log(state.walletConfig.user);
    return state.walletConfig.user;
  });

  const dispatch = useDispatch();

  const onClick = (event) => {
    event.preventDefault();
    if (selector.userAddress === "") {
      dispatch(connectWallet({ Tezos, wallet }));
    } else {
      dispatch(disconnectWallet({ wallet, setTezos }));
    }
  };
  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };
  return (
    <section className="flex justify-around mx-auto pt-8 pb-20 bg-white">
      <div className="">
        <Link href="/">
          <img
            className="sm:max-w-sm cursor-pointer"
            src="/assets/kanvasailogo.png"
          />
        </Link>
      </div>
      <div className="flex xl:space-x-10 md:space-x-8 sm:space-x-4 font-bold uppercase mt-2">
        <Link href="/">
          <h1 className="cursor-pointer">NFT MARKET</h1>
        </Link>
        <Link href="/">
          <h1 className="cursor-pointer">CREATORS</h1>
        </Link>
        <Link href="/">
          <h1 className="cursor-pointer">COLLECTORS</h1>
        </Link>
        <Link href="/">
          <h1 className="cursor-pointer">INFO</h1>
        </Link>
        <div>
          {selector.userAddress !== "" ? (
            <Link href="/create">Create NFT</Link>
          ) : null}

          {selector.userAddress !== "" ? (
            <Link className="" href="/mynft">
              My NFT
            </Link>
          ) : null}
        </div>
      </div>

      <div className="flex space-x-4">
        <div>
          {selector.userAddress === "" ? (
            <button
              onClick={onClick}
              className="bg-kanvas-pink rounded-2xl text-white pt-2 pb-2 pl-6 pr-6"
              type="button"
            >
              Connect Wallet
            </button>
          ) : (
            <div>
              <div className="flex gap-5 items-center">
                <div>
                  <Link href="/create">
                    <button
                      className="bg-kanvas-pink rounded-2xl text-white pt-2 pb-2 pl-6 pr-6"
                      type="button"
                    >
                      Create
                    </button>
                  </Link>
                </div>
                <div>
                  <Image
                    onClick={toggleHamburger}
                    className="cursor-pointer"
                    src="/assets/Account.svg"
                    height={30}
                    width={30}
                  />
                </div>
              </div>
              <div className={burger}>
                <div className="bg-white rounded-md p-5 shadow-lg mt-5">
                  <p className="text-center">Account</p>
                  <ul className="mt-3 space-y-3 text-left">
                    <li className="">
                      <button className="bg-kanvas-grey pt-2 pb-2 pr-12 pl-12 text-left">
                        View profile
                      </button>
                    </li>
                    <li className="bg-kanvas-grey">
                      <button>Account setting</button>
                    </li>
                    <li className="bg-kanvas-grey">
                      <button>Invite creators</button>
                    </li>
                    <li className="bg-kanvas-grey">
                      <button onClick={onClick}>Sign out</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Header;
