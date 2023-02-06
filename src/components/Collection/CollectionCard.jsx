import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProvider, useSigner, useContract } from "wagmi";
import { COLLECTION_ABI } from "../../constants/index";
import { getJSONFromFileinCID } from "../../utils/storage";

const CollectionCard = ({ contract }) => {
  // eslint-disable-next-line
  const [details, setDetails] = useState({});

  const provider = useProvider();
  const signer = useSigner();
  // Set up a contract instance
  const ERC1155Contract = useContract({
    addressOrName: contract,
    contractInterface: COLLECTION_ABI,
    signerOrProvider: signer.data || provider,
  });

  useEffect(() => {
    const fetchDetails = async () => {
      const _details = await ERC1155Contract.contractHash();
      const data = await getJSONFromFileinCID(_details);
      setDetails(data);
    };
    fetchDetails();
  }, [ERC1155Contract]);

  const object = {
    contractAddress: contract,
    name: details.name,
    imageUrl: details.imgHash
      ? details.imgHash.length > 0
        ? `https://ipfs.io/ipfs/${details.imgHash}`
        : "https://ipfs.io/ipfs/bafkreihfweuclvhaozl7q6zsjjyrkh262vlbzqyd5m3lijrnjefh6pxy3i"
      : "https://ipfs.io/ipfs/bafkreihfweuclvhaozl7q6zsjjyrkh262vlbzqyd5m3lijrnjefh6pxy3i",
    description: details.description,
    link: details.link ?? "www.google.com",
  };

  return (
    <figure className="relative bg-gray-300 dark:bg-gray-600 w-full h-[450px] flex flex-col items-center flex-wrap overflow-hidden rounded-md">
      <div className="h-[60%] w-full">
        <img
          src="https://ipfs.io/ipfs/bafkreihfweuclvhaozl7q6zsjjyrkh262vlbzqyd5m3lijrnjefh6pxy3i"
          alt="collection"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className=" w-full p-4">
        <p className="text-xl my-6">{details.name}</p>
        {/* <p>{details.description}</p> */}
        <Link
          to={{
            pathname: `/artist/collection/${contract}`,
          }}
          state={{ object }}
          className="bttn bttn-primary text-indigo-500 hover:text-[#ffffff] trans "
        >
          View Collection
        </Link>
      </div>
    </figure>
  );
};

export default CollectionCard;
