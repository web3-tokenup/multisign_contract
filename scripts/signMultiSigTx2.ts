import hre from "hardhat";

async function main() {
    const chainId = 33772211; // chainId 告诉你你在哪个链上，它确保在 Rinkeby 上签名的签名在另一条链上无效，例如以太坊主网。
    const walletAddress = "0xF5FE2cCECdfCFbCCf6f052e7d68106c86b357Caa";

    const messageReq = {
        to: "0xacfb32d81e920c4af1499be54e731dc2873c6af2", // to 代表交易的接收方地址
        value: "1",//hre.ethers.parseEther("0.01").toString(), // value 代表发送的以太币数量
        data: "0x",                                              // 非合约调用交易
        operation: 0,
        safeTxGas: 0,
        baseGas: 0,
        gasPrice: 0,
        gasToken: "0x0000000000000000000000000000000000000000",
        refundReceiver: "0x0000000000000000000000000000000000000000",
        nonce: 0
    }

    const typedData = createTypedData(chainId, walletAddress, messageReq);
    const signature = await typedDataSignV4(typedData, walletAddress);

    console.log("signature:", signature);
}

function createTypedData(chainId: number, contractAddr: string, messageReq: any) {
    let domain = {
        chainId: chainId,
        verifyingContract: contractAddr,
    };

    let primaryType = "SafeTx";

    let types = {
        EIP712Domain: [
            { type: "uint256", name: "chainId" },
            { type: "address", name: "verifyingContract" }
        ],
        SafeTx: [
            { type: "address", name: "to" },
            { type: "uint256", name: "value" },
            { type: "bytes", name: "data" },
            { type: "uint8", name: "operation" },
            { type: "uint256", name: "safeTxGas" },
            { type: "uint256", name: "baseGas" },
            { type: "uint256", name: "gasPrice" },
            { type: "address", name: "gasToken" },
            { type: "address", name: "refundReceiver" },
            { type: "uint256", name: "nonce" }
        ],
    }

    let message = messageReq;
    return JSON.stringify({ types, primaryType, domain, message });
}

async function typedDataSignV4(typedData: string, _signerAddress: string) {
    // Get the signer from hardhat
    const [signer] = await hre.ethers.getSigners();

    // Parse the typed data
    const parsedTypedData = JSON.parse(typedData);

    // Sign using ethers.js signTypedData method
    const signature = await signer.signTypedData(
        parsedTypedData.domain,
        { SafeTx: parsedTypedData.types.SafeTx },
        parsedTypedData.message
    );

    return signature;
}

main()
    .then(() => {
        process.exit(0);
    })
    .catch((ex) => {
        console.error(ex);
        process.exit(1);
    });
