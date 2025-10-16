import hre from "hardhat";

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

async function main() {
    const safe = await hre.ethers.getContractAt("Safe", walletAddress);

    const signatures = "0xfbb4db428e81f32f4747274a2539a1661ec1f084723a61927c738b3fcdb7eef868f7a3e0bac79be6c7cecb1620bb6c5dce5dbc2fe7ba2f22ed268a6d1ed81dc71bd4688e56c0c4b74e85ffa8c86266a40c52823c797c00322c52c81a88b12552d845e709652a7710ad7900935e0d279c56139836f6160c118721d126c5f21767201c"

    const tx = await safe.execTransaction(
        messageReq.to,
        messageReq.value,
        messageReq.data,
        messageReq.operation,
        messageReq.safeTxGas,
        messageReq.baseGas,
        messageReq.gasPrice,
        messageReq.gasToken,
        messageReq.refundReceiver,
        signatures
    );

    console.log("execTransaction tx:", tx);
}



main()
    .then(() => {
        process.exit(0);
    })
    .catch((ex) => {
        console.error(ex);
        process.exit(1);
    });
