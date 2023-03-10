import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAccount, useProvider, useSigner, useContract } from "wagmi";
import { ARTIST_CONTRACT_ADDRESS, ARTIST_ABI } from "../../constants/index";
import ArtistCard from "./ArtistCard";
import FetchingArtistModal from "../Modals/FetchingArtistModal";

function ArtistsAndCreators() {
  const provider = useProvider();
  const signer = useSigner();
  const { isConnected } = useAccount();
  // Set up a contract instance
  const ArtistContract = useContract({
    addressOrName: ARTIST_CONTRACT_ADDRESS,
    contractInterface: ARTIST_ABI,
    signerOrProvider: signer.data || provider,
  });

  const [artists, setArtists] = useState([]);
  const [fetchingArtists, setFetchingArtists] = useState(false);

  useEffect(() => {
    const OnPageLoad = async () => {
      if (isConnected) {
        setFetchingArtists(true);
        const allArtists = await ArtistContract.getAllArtists();
        setArtists(allArtists);
        setFetchingArtists(false);
      } else {
        toast.error("Please connect your wallet");
      }
    };
    OnPageLoad();
    return () => {
      setArtists([]);
      setFetchingArtists(false);
    };
  }, [isConnected, ArtistContract]);

  if (!isConnected)
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-ld text-base md:text-3xl">
            Please connect your wallet to continue
          </h1>
        </div>
      </>
    );
  else
    return (
      <>
        {fetchingArtists ? <FetchingArtistModal /> : null}
        <div className="p-8 trans min-h-screen">
          <h1 className="text-indigo-700 dark:text-[#ffffff] text-center font-semibold mt-8 text-2xl sm:text-3xl md:text-4xl trans">
            Meet Our Artists and Creators
          </h1>
          <ul className="grid grid-cols-1 gap-y-4 gap-x-4 lg:gap-x-6 md:grid-cols-2 lg:grid-cols-3 w-[90%] sm:w-[55%] md:w-[80%] mx-auto mt-8 max-w-6xl pb-8">
            {artists.length > 0 &&
              artists?.map((artist, index) => {
                return (
                  <li key={index} className="rounded-xl relative text-ld">
                    <ArtistCard artist={artist} />
                  </li>
                );
              })}
            {artists.length === 0 && (
              <p className="text-slate-400 dark:text-slate-100 font-semibold col-span-2 lg:col-span-3">
                No artists have joined.
              </p>
            )}
          </ul>
        </div>
      </>
    );
}

export default ArtistsAndCreators;
