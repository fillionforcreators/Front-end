export const filecoin = {
  id: 3141,
  name: "FIL Hyperspace",
  network: "filecoin",
  iconUrl: "https://filfox.info/favicon.ico",
  iconBackground: "#333",
  nativeCurrency: {
    decimals: 18,
    name: "tFIL",
    symbol: "tFIL",
  },
  rpcUrls: {
    default: {
      http: ["https://api.hyperspace.node.glif.io/rpc/v0"],
    },
  },
  blockExplorers: {
    default: { name: "Filfox", url: "https://hyperspace.filfox.info/en" },
  },
  testnet: true,
};
