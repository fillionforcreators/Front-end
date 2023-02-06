import { useEffect, useState } from "react";
import { useProvider, useSigner, useContract } from "wagmi";
import { COLLECTION_ABI } from "../../constants/index";

const NFTCard = ({ uri, contractAddress }) => {
  const [itemsName, setItemsName] = useState(null);
  const [itemsDescription, setItemsDescription] = useState(null);
  const [itemsImage, setItemsImage] = useState(null);
  const [itemsPrice, setItemsPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  //Contract instance
  const provider = useProvider();
  const signer = useSigner();
  // Set up a contract instance
  const CollectionContract = useContract({
    addressOrName: contractAddress,
    contractInterface: COLLECTION_ABI,
    signerOrProvider: signer.data || provider,
  });

  const handleClick = () => {
    console.log("clicked");
  };

  useEffect(() => {
    const getDetails = async () => {
      console.log("starting");
      try {
        const data = await CollectionContract._tokenURIs(uri);
        console.log(data);
        let res = await fetch(`https://ipfs.io/ipfs/${data}/file.json`).then(
          (res) => res.json()
        );
        console.log(res);
        setItemsName(res.itemName);
        setItemsDescription(res.description);
        setItemsImage(res.imgHash);
        setItemsPrice(res.price);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getDetails();
  }, [CollectionContract, uri]);

  return (
    <figure className="relative bg-gray-200 dark:bg-gray-600 w-full min-h-[300px] flex flex-col items-center flex-wrap overflow-hidden rounded-md">
      <div className="h-[50%] w-full">
        <img
          src={
            itemsImage
              ? `https://ipfs.io/ipfs/${itemsImage}`
              : "https://ipfs.io/ipfs/bafkreihfweuclvhaozl7q6zsjjyrkh262vlbzqyd5m3lijrnjefh6pxy3i"
          }
          alt="collection"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className=" w-full p-4 h-[40%]">
        <p className="text-xl text-center my-2">
          {itemsName ? itemsName : "Loading..."}
        </p>
        <p className="text-sm text-center my-2">
          {itemsDescription ? itemsDescription : "Loading..."}
        </p>
        <p className="text-sm text-center my-2">
          PRICE: {itemsPrice ? itemsPrice : "Loading..."} FIL
        </p>

        <button
          className="bttn bttn-primary text-indigo-500 hover:text-[#ffffff] trans "
          onClick={handleClick}
        >
          Purchase
        </button>
      </div>
    </figure>
  );
};

export default NFTCard;
