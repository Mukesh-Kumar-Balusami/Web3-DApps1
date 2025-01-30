"use client"; // Ensure this is a client component


import { useState } from "react";
import { BrowserProvider } from "ethers";

export default function WalletConnect({ setAccount, setProvider }) {
    const [isConnected, setIsConnected] = useState(false);
    const [account, setLocalAccount] = useState(null); // Store connected account locally

    const connectWallet = async () => {
        if (typeof window !== "undefined" && window.ethereum) {
            try {
                // Initialize Ethers provider
                const provider = new BrowserProvider(window.ethereum);
                await window.ethereum.request({ method: "eth_requestAccounts" });

                // Get the connected signer (account)
                const signer = await provider.getSigner();
                const userAddress = await signer.getAddress();

                // Update state
                setAccount(userAddress);
                setProvider(provider);
                setLocalAccount(userAddress);
                setIsConnected(true);
            } catch (error) {
                console.error("Error connecting wallet:", error);
                alert("Failed to connect wallet.");
            }
        } else {
            alert("Please install MetaMask.");
        }
    };

    return (
        <div>
            {!isConnected ? (
                <button onClick={connectWallet}>Connect Wallet</button>
            ) : (
                <p>Connected: {account}</p> // Correctly displays connected account
            )}
        </div>
    );
}
