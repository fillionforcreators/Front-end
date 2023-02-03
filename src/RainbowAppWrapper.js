import React from "react";
import App from "./App";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  getDefaultWallets,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { filecoin } from "./constants/fil";

const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygonMumbai, filecoin],
  /**@notice This is Alchemy's default API key.
      You can get your own at https://dashboard.alchemyapi.io */
  [
    alchemyProvider({ apiKey: "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Fillion",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const RainbowAppWrapper = () => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={lightTheme({
          accentColor: "#4F46E5",
          accentColorForeground: "white",
          borderRadius: "medium",
          fontStack: "system",
        })}
      >
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default RainbowAppWrapper;
