import { Token } from "nft.storage";
import { config } from "../../config";
import { useDispatch, useSelector } from "react-redux";

import { collectNFT, bidNFT, claimAuc } from "../../actions";
import Image from "next/image";

const NFTAsset = (props) => {
  const selector = useSelector((state) => state.tokenData);
  const dispatch = useDispatch();

  const selector2 = selector.filter(
    (o, i) => o !== null && o.homepage !== undefined && o.token_id == props.slug
  );
  const asset = selector2[0];
  return (
    <div className="ml-12 section flex w-3/5 bg-white shadow-md justify-between gap-2">
      <div className="ml-12">
        <h1 className="text-xl font-semibold">{asset.name}</h1>
        <p className="text-lg text-kanvas-text-grey">{asset.description}</p>
      </div>
      <div className="relative max-w-md w-full h-52 mx-auto">
        <Image
          src={`https://ipfs.io/ipfs/${asset.image.split("ipfs://")[1]}`}
          alt={asset.description}
          objectFit="cover"
          layout="fill"
        />
      </div>
    </div>
  );
};
export async function getServerSideProps(context) {
  console.log(context.query.slug);
  return { props: { slug: context.query.slug } };
}

export default NFTAsset;
