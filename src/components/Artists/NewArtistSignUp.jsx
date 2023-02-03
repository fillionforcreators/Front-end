import { useState } from "react";
import { Link } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import toast from "react-hot-toast";
import LoadingModal from "../Modals/LoadingModal";
import { pushImgToStorage, putJSONandGetHash } from "../../utils/storage";
import { useProvider, useSigner, useContract } from "wagmi";
import { ARTIST_CONTRACT_ADDRESS, ARTIST_ABI } from "../../constants/index";

function NewArtist() {
   const provider = useProvider();
   const signer = useSigner();
   // Set up a contract instance
   const ArtistContract = useContract({
     addressOrName: ARTIST_CONTRACT_ADDRESS,
     contractInterface: ARTIST_ABI,
     signerOrProvider: signer.data || provider,
   });

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  //handle image upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //error handling
    if (!image) return toast.error("Please upload an image");
    if (!name) return toast.error("Please enter a name");
    if (!bio) return toast.error("Please enter a bio");
    if (bio.length > 100) return toast.error("Bio too long");
    if (name.length > 30) return toast.error("Name too long");

    if (image && name.length >= 1 && bio.length >= 5) {
      setLoading(true);
      console.log("uploading image");
      const imgHash = await pushImgToStorage(image);
      console.log("Image hash: ", imgHash);

      //create artist object
      const artist = {
        name,
        bio,
        imgHash,
      };
      const artistHash = await putJSONandGetHash(artist);
      console.log("Artist hash: ", artistHash);
      //push hash to contract
       const txResponse = await ArtistContract.newArtistSignup(artistHash);
       await txResponse.wait();

      setName("");
      setBio("");
      setImage(null);
      setImageUrl(null);
      setLoading(false);
      toast.success("Signup successful");
    } else {
      setLoading(false);
      toast.error("Please try again");
    }
  };

  return (
    <>
      {loading ? <LoadingModal /> : null}
      <div className=" min-h-screen pt-6 px-4 sm:px-6 lg:px-6">
        <div className="max-w-md w-full mx-auto space-y-4">
          {/* Title and Logo */}
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Logo"
            />
            <h2 className="mt-6 text-center text-xl sm:text-2xl md:text-3xl font-semibold text-ld">
              Sign up as an artist/creator
            </h2>
            <p className="text-center mt-2  text-sm text-ld">
              Already an artist?{" "}
              <Link to="/collection/create">
                <span className="text-indigo-500 cursor-pointer">
                  Create a collection
                </span>
              </Link>
            </p>
          </div>

          {/* Form */}
          <form className="form-css" onSubmit={handleSubmit}>
            {/* Image Input and Preview Wrapper*/}
            <div
              className={
                imageUrl
                  ? `w-[80%] flex items-center justify-between mx-auto`
                  : `flex`
              }
            >
              {/* Image Input */}
              <div className={imageUrl ? `pb-1` : `pb-1 mx-auto`}>
                {/* Upload Image Icon */}
                <div>
                  <label
                    htmlFor="profile-image"
                    className="flex flex-col items-center justify-center text-sm w-16 square aspect-square rounded-full bg-slate-200 dark:bg-slate-400 cursor-pointer"
                  >
                    <FiUpload className="text-ld text-[20px]" />
                    <span className="text-ld text-[10px] cursor-pointer">
                      Upload
                    </span>
                  </label>
                  <input
                    type="file"
                    id="profile-image"
                    className="text-ld hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                {/* Label for upload */}
                <div className="pt-2">
                  <label
                    htmlFor=""
                    className="text-ld text-sm -ml-8 font-medium"
                  >
                    Set a Profile photo
                  </label>
                </div>
              </div>
              {/* Preview */}
              {imageUrl && (
                <div className="flex flex-col gap-2">
                  <div className=" w-16 square aspect-square rounded-full border-[3px] border-indigo-600 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <p className="text-sm text-ld font-medium">Preview</p>
                </div>
              )}
            </div>
            {/* Name Input */}
            <div className="relative bg-inherit">
              <input
                type="text"
                id="name"
                required
                className="peer form-input mb-2"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="name" className="form-label trans">
                Enter your name
              </label>
            </div>

            {/* Bio Input */}
            <div className="relative bg-inherit">
              <textarea
                name="bio"
                id="bio"
                className="peer form-input"
                placeholder="Tell your fans about yourself"
                cols="30"
                rows="2"
                required
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
              <label htmlFor="bio" className="form-label trans">
                Tell your fans about yourself
              </label>
            </div>
            <p className="text-xs text-indigo-700 dark:text-indigo-400 -mt-4 font-medium">
              Max 100 words
            </p>
            {/* Signup button */}
            <button className="bttn bttn-primary" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewArtist;
