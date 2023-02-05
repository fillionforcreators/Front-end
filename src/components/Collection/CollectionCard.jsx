import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProvider, useSigner, useContract } from "wagmi";
import { ERC1155TOKEN_ABI } from "../../constants/index";
import { getJSONFromFileinCID } from "../../utils/storage";

const CollectionCard = ({ contract }) => {
  // eslint-disable-next-line
  const [details, setDetails] = useState({});

  const provider = useProvider();
  const signer = useSigner();
  // Set up a contract instance
  const ERC1155Contract = useContract({
    addressOrName: contract,
    contractInterface: ERC1155TOKEN_ABI,
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

  return (
    <figure className="bg-gray-300 w-full h-[450px] flex flex-wrap overflow-hidden rounded-md">
      <div className="h-[60%] w-full">
        <img
          src="https://ipfs.io/ipfs/bafkreihfweuclvhaozl7q6zsjjyrkh262vlbzqyd5m3lijrnjefh6pxy3i"
          alt="collection"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="w-full h-[50%] p-4 relative">
        <p>{details.name}</p>
        <p>{details.link}</p>
        {/* <p>{details.description}</p> */}
        <Link
          to={{
            pathname: `/artist/collection/${contract}`,
          }}
          // state={{ object }}
          className="bttn bttn-primary text-indigo-500 hover:text-[#ffffff] trans "
        >
          View Collection
        </Link>
      </div>
    </figure>
  );
};

export default CollectionCard;
