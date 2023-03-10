// eslint-disable-next-line
import { useState, useEffect } from "react";
import { MdVerified } from "react-icons/md";
import { BiGlobe, BiGift } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { useProvider, useAccount, useSigner, useContract } from "wagmi";
import { FACTORY_ADDRESS, FACTORY_ABI } from "../../constants/index";
import CollectionCard from "../Collection/CollectionCard";



function ArtistPage() {
  const { state } = useLocation();
  const { isConnected } = useAccount();
  const { artistAddress, name, imageUrl, bio } = state.object;
  const [artistContracts, setArtistContracts] = useState([]);
  //Factory Instance
  const provider = useProvider();
  const signer = useSigner();
  // Set up a contract instance
  const FactoryContract = useContract({
    addressOrName: FACTORY_ADDRESS,
    contractInterface: FACTORY_ABI,
    signerOrProvider: signer.data || provider,
  });
  useEffect(() => {
    const allContracts = async () => {
      try{
      if (isConnected) {
        const works = await FactoryContract.AllArtistContracts(artistAddress);
        setArtistContracts(works);
      }
      } catch (err) {
        console.log(err);
        setArtistContracts([]);
      }
    };
    allContracts();
  }, [isConnected, FactoryContract, artistAddress]);

  return (
    <>
    <div className="min-h-screen w-full flex flex-col text-ld font-pop">
      <div className="relative w-[200px] h-[200px] mx-auto mt-12 bg-transparent rounded-full overflow-hidden">
        <img
          src={`https://ipfs.io/ipfs/${imageUrl}`}
          alt=""
          className="w-full h-full object-center object-cover absolute"
        />
      </div>
      <div className="flex flex-col gap-2 mt-4 items-center justify-center max-w-5xl mx-auto px-4">
        <div className="flex gap-2 items-center justify-center">
          <p className="text-center text-xl md:text-2xl dark:text-[#ffffff] font-medium">
            {name}
          </p>
          <MdVerified className="w-6 h-6 text-blue-600 " />
        </div>
        <p className="text-center text-sm md:text-base dark:text-[#ffffff]">
          {bio}
        </p>
        <div className="flex gap-4 items-center justify-center pt-2">
          <BiGlobe className="w-6 h-6 text-slate-600 dark:text-white cursor-pointer" />
          <BsTwitter className="w-6 h-6 text-blue-600 cursor-pointer" />
        </div>
        <div className="flex gap-2 items-center justify-center text-indigo-600 dark:text-indigo-500 cursor-pointer pt-2">
          <BiGift className="w-6 h-6" />
          <p>Send artist a tip</p>
        </div>
      </div>

      {/* Collection Cards if any */}
      {artistContracts.length > 0 && (
        <>
          <div className="my-32 w-full">
            <ul className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {artistContracts.map((contract, index) => (
                <li key={index}>
                  <CollectionCard contract={contract} />
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {/* If no collections */}
      {artistContracts.length === 0 && (
        <>
          <div className="w-full max-w-5xl mx-auto flex items-center justify-center mt-8">
            <h1 className="text-xl text-ld">No collections yet</h1>
          </div>
        </>
      )}
      </div>
    </>
  );
}

export default ArtistPage;
