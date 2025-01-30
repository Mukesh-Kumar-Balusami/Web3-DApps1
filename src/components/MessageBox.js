"use client"; // Ensure this is a client component

import { useState } from "react";
import { Contract, isAddress } from "ethers";

export default function MessageBox({ provider, contractAddress }) {
    const [receiver, setReceiver] = useState('');
    const [messageContent, setMessageContent] = useState('');

    const sendMessage = async () => {
        if (!provider) {
            alert("Wallet not connected!");
            return;
        }

        if (!receiver || !messageContent) {
            alert("Please fill out both fields.");
            return;
        }

        // ✅ Validate contract address
        if (!contractAddress || !isAddress(contractAddress)) {
            alert("Invalid contract address.");
            return;
        }
        
        try {
            const signer = await provider.getSigner(); // ✅ Get signer correctly in v6

            const contract = new Contract(
                contractAddress,
                [
                    "function sendMessage(address _receiver, string memory _content) public"
                ],
                signer // ✅ Use signer instead of provider
            );

            const tx = await contract.sendMessage(receiver, messageContent);
            await tx.wait(); // ✅ Wait for transaction confirmation

            alert("Message sent successfully!");
            setReceiver("");
            setMessageContent("");
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message.");
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Receiver Address"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
            />
            <textarea
                placeholder="Message"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
            />
            <button onClick={sendMessage}>Send Message</button>
        </div>
    );
}
