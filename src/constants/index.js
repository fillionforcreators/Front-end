export const ARTIST_CONTRACT_ADDRESS = "0x419b995edc4809fa6Ca60a08a7C2659Ac7009A2d";

export const ARTIST_ABI = [
  {
    inputs: [],
    name: "Fillion__AlreadyAnArtist",
    type: "error",
  },
  {
    inputs: [],
    name: "Fillion__OnlyArtists",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "dateJoined",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "artistAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "artistDetails",
        type: "string",
      },
    ],
    name: "newArtistJoined",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "addressById",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "artistByAddress",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "dateJoined",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "artistAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "artistDetails",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "artistCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "artists",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "dateJoined",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "artistAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "artistDetails",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllArtists",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "dateJoined",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "artistAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "artistDetails",
            type: "string",
          },
        ],
        internalType: "struct FillionArtist.Artist[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isArtist",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_artistDetails",
        type: "string",
      },
    ],
    name: "newArtistSignup",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_artistDetails",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_artistid",
        type: "uint256",
      },
    ],
    name: "updateArtistDetails",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];