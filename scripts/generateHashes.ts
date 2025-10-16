import hre from "hardhat";

async function main() {
    const chainId = 33772211;
    const walletAddress = "0x65a0325638B82ec050BBE8D98a6c0A8fDcb8bdF1"; // 多签钱包地址
    let domain = {
        chainId: chainId,
        verifyingContract: walletAddress,
    };

    const domain_hash = hre.ethers.TypedDataEncoder.hashDomain(domain);
    console.log("domain_hash:", domain_hash);

    const messageReq = {
        to: "0x41616A456f1C5E3Ad8e5b7375fB2a8eD28D3A8eE", // to 代表交易的接收方地址
        value: hre.ethers.parseEther("0.01").toString(), // value 代表发送的以太币数量
        data: "0x",                                              // 非合约调用交易
        operation: 0,
        safeTxGas: 0,
        baseGas: 0,
        gasPrice: 0,
        gasToken: "0x0000000000000000000000000000000000000000",
        refundReceiver: "0x0000000000000000000000000000000000000000",
        nonce: 0
    }

    const types = {
        SafeTx: [
            { name: "to", type: "address" },
            { name: "value", type: "uint256" },
            { name: "data", type: "bytes" },
            { name: "operation", type: "uint8" },
            { name: "safeTxGas", type: "uint256" },
            { name: "baseGas", type: "uint256" },
            { name: "gasPrice", type: "uint256" },
            { name: "gasToken", type: "address" },
            { name: "refundReceiver", type: "address" },
            { name: "nonce", type: "uint256" },
        ]
    };

    const message_hash = hre.ethers.TypedDataEncoder.hashStruct("SafeTx", types, messageReq)
    console.log("message_hash:", message_hash);

    // safeTxHash = keccak256("\x19\x01", domainSeparator, messageHash)
    const safeTxHash = hre.ethers.keccak256(
        hre.ethers.concat([
            "0x1901",
            hre.ethers.getBytes(domain_hash),
            hre.ethers.getBytes(message_hash)
        ])
    );
    console.log("safeTxHash:", safeTxHash);
}

main()
    .then(() => {
        process.exit(0);
    })
    .catch((ex) => {
        console.error(ex);
        process.exit(1);
    });
