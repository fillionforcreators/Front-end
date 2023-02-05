/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import CollectionItemModal from "../Modals/CollectionItemModal";
import { useProvider, useSigner, useContract } from "wagmi";
import { FACTORY_ADDRESS, FACTORY_ABI } from "../../constants/index";
import { pushImgToStorage, putJSONandGetHash } from "../../utils/storage";
import LoadingModal from "../Modals/LoadingModal";
import toast from "react-hot-toast";

const CreateACollection = () => {
  const provider = useProvider();
  const signer = useSigner();
  // Set up a contract instance
  const FactoryContract = useContract({
    addressOrName: FACTORY_ADDRESS,
    contractInterface: FACTORY_ABI,
    signerOrProvider: signer.data || provider,
  });

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [collectionInfo, setCollectionInfo] = useState({
    name: "",
    link: "",
    description: "",
    imgHash: "",
  });
  const { name, link, description } = collectionInfo;

  // Array to store the hashes and quantities
  // eslint-disable-next-line
  const [items, setItems] = useState([]);
  // eslint-disable-next-line
  const [quantity, setQuantity] = useState([]);

  //array to display added items to ui
  const [itemsObject, setItemsObject] = useState([]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleCollectionInfoChange = (e) => {
    setCollectionInfo((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const createCollection = async () => {
    try {
      setLoading(true);
      console.log("uploading image");
      //hashing image
      const imgHash = await pushImgToStorage(image);

      // Upload and hashing collection details to web3.storage
      setCollectionInfo((prev) => ({ ...prev, imgHash: imgHash }));

      //uploading collection
      const collectionHash = await putJSONandGetHash(collectionInfo);
      console.log("Collection hash: ", collectionHash);

      // upload artist to Fillion
      const txResponse = await FactoryContract.deployERC1155(
        collectionHash,
        items,
        quantity
      );
      await txResponse.wait();

      setCollectionInfo({name: "",link: "", description: "", imgHash: ""});
      setItems([]);
      setQuantity([]);
      setLoading(false);
      toast.success("Collection Successfully created");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      {loading && <LoadingModal />}
      {showForm && (
        <CollectionItemModal
          setShowForm={setShowForm}
          setItems={setItems}
          setQuantity={setQuantity}
          setItemsObject={setItemsObject}
        />
      )}
      <div className="text-ld min-h-screen w-full p-4 md:py-20 max-w-7xl mx-auto">
        <h1 className="text-3xl lg:text-5xl tracking-tighter pb-4 text-indigo-700 dark:text-indigo-500 text-center">
          Create a collection
        </h1>

        <div className="mx-auto">
          {/* COLLECTION PREVIEW IMAGE */}
          <div className="py-2 w-full md:w-1/2 md:mx-auto">
            <p className="py-2 md:py-4 text-[12px]">
              <Required />
              Required fields
            </p>
            <p className="text-bold py-1">
              <Required />
              Choose a Collection Preview Image
            </p>
            <p className="text-xs">File types supported: JPG, PNG, GIF, SVG</p>
            <div className="max-w-[200px] overflow-hidden">
              <label
                htmlFor="collection_image"
                className="w-fit cursor-pointer"
              >
                <div className="my-4 w-[200px] h-[200px] border border-dashed border-gray-500 flex items-center justify-center">
                  {!image && (
                    <span className="text-xl text-ld md:text-3xl">+</span>
                  )}
                  {image && (
                    <img
                      src={imageUrl}
                      className="w-full h-full inset-0 z-10 object-center object-cover"
                      alt=""
                    />
                  )}
                </div>
              </label>
              <input
                type="file"
                id="collection_image"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Wrapper */}
          <div className="space-y-4 w-full md:w-1/2 md:mx-auto">
            {/* Collection Name */}
            <div className="">
              <label htmlFor="">
                <Required />
                Collection Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full form-input mt-2"
                value={name}
                onChange={handleCollectionInfoChange}
              />
            </div>
            {/* External Link */}
            <div className="">
              <label htmlFor="">External link</label>
              <p className="text-xs">
                Fillion will include a link to this URL on this item's detail
                page, so that users can click to learn more about it. You are
                welcome to link to your own webpage with more details.
              </p>
              <input
                type="text"
                id="link"
                className="w-full form-input mt-2"
                value={link}
                onChange={handleCollectionInfoChange}
              />
            </div>
            {/* Description */}
            <div className="">
              <label htmlFor="">
                <Required />
                Description
              </label>
              <textarea
                name=""
                id="description"
                cols="30"
                rows="10"
                className="w-full form-input mt-2"
                placeholder="Tell us about this collection"
                value={description}
                onChange={handleCollectionInfoChange}
              ></textarea>
            </div>
          </div>
          {/* Show Form Button */}
          <div className="mt-8 lg:mt-16">
            <h1 className="text-3xl lg:text-4xl tracking-tighter pb-4 text-indigo-700 dark:text-indigo-500 text-center mb-6">
              Add Items to the collection
            </h1>
            <div className="flex items-center justify-center mx-auto">
              <button
                onClick={() => setShowForm(true)}
                className="bttn-4 bttn-primary"
              >
                Add an Item
              </button>
            </div>
          </div>
        </div>

        {/* Table of Collection Items */}

        {itemsObject.length > 0 ? ( // If there are items in the array of itemsObject
          <div class="overflow-x-auto relative shadow-md sm:rounded-lg my-8">
            <div className="text-left w-full text-3xl text-semibold text-indigo-700 dark:text-indigo-500 my-4">
              COLLECTION ITEMS
            </div>
            <table class="w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="py-3 px-6">
                    #
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Cover Image
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Name
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Description
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Quantity
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {itemsObject.map((item, index) => (
                  <tr
                    class="bg-white border-b  dark:bg-gray-900 dark:border-gray-700"
                    key={index}
                  >
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className=" w-14 square aspect-square rounded-full border-[3px] border-indigo-600 overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt="Preview"
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </td>
                    <td class="py-4 px-6">{item.itemName}</td>
                    <td class="py-4 px-6">{item.description}</td>
                    <td class="py-4 px-6">{item.qty}</td>
                    <td class="py-4 px-6">{item.price} FIL</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {items.length > 0 ? (
          <div className="flex items-center justify-center mx-auto">
            <button className="bttn-4 bttn-primary" onClick={createCollection}>
              Create Collection
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CreateACollection;

const Required = () => {
  return (
    <span className="font-bold text-indigo-700 dark:text-indigo-500">*</span>
  );
};
