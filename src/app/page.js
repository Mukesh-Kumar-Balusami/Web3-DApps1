"use client";
import { useState } from 'react';
import WalletConnect from '../components/WalletConnect';
import MessageBox from '../components/MessageBox';

export default function Home() {
    const [account, setAccount] = useState('');
    const [provider, setProvider] = useState(null);
    const contractAddress = "0x0a1607Ca2B48Bb81Bf24E7772715a9c3E686B8e8";  // Add the deployed contract address here

    return (
        <div>
            <h1>Web3 Messaging dApp</h1>
            <WalletConnect setAccount={setAccount} setProvider={setProvider} />
            {account && provider && <MessageBox provider={provider} contractAddress={contractAddress} />}
        </div>
    );
}
