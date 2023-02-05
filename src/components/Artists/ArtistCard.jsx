import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJSONFromCID } from '../../utils/storage'

function ArtistCard({ artist }) {
  const [name, setName] = useState("Loading...");
  const [bio, setBio] = useState("Loading...");
  const [imageUrl, setImageUrl] = useState(null);
  let { artistAddress, artistDetails, dateJoined, id } = artist;
  //convert id from hex to int
  let idHex = id.toHexString();
  let idInt = parseInt(idHex.substring(2), 16);
  //convert dateJoined from hex to int
  dateJoined = dateJoined.toHexString();
  dateJoined = parseInt(dateJoined.substring(2), 16);
  //convert dateJoined from epoch to date
  dateJoined = new Date(dateJoined * 1000);
  dateJoined = dateJoined.toLocaleDateString();

  const object = {
    artistAddress,
    dateJoined,
    idInt,
    name,
    imageUrl,
    bio,
  };

  useEffect(() => {
    const fetchData = async () => {
      //fetch artist's name, bio, and profile picture from IPFS using artistDetails as the hash
      let res = await getJSONFromCID(artistDetails);
      console.log(res);
      setName(res.name);
      setBio(res.bio);
      setImageUrl(res.imgHash);
    };

    fetchData(); 
  }, [artistDetails]);

  return (
    <div className=" dark:bg-inherit flex flex-col gap-2 relative w-full h-[300px] sm:h-[380px] rounded-lg overflow-hidden trans shadow-md cursor-pointer border-2 border-transparent dark:border-slate-700">
      <div className="w-full h-[55%] sm:h-[65%]">
        <img
          src={
            `https://ipfs.io/ipfs/${imageUrl}` ||
            "https://ipfs.io/ipfs/bafkreihfweuclvhaozl7q6zsjjyrkh262vlbzqyd5m3lijrnjefh6pxy3i"
          }
          alt=""
          className="w-full h-full object-center object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 w-full justify-center items-center">
        <p className="text-center text-base font-semibold text-indigo-700 dark:text-[#ffffff] flex items-center gap-2 pb-2">
          {name}
        </p>
        <Link
          to={{
            pathname: `/artist/${artistAddress}`,
          }}
          state={{ object }}
          className="bttn bttn-artist text-indigo-500 hover:text-[#ffffff] trans "
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}

export default ArtistCard;
