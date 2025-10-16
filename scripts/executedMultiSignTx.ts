import hre from "hardhat";

const walletAddress = "0x65a0325638B82ec050BBE8D98a6c0A8fDcb8bdF1";

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

async function main() {
    const safe = await hre.ethers.getContractAt("Safe", walletAddress);

    const signatures = "0x769136f9d501129caa6e3e585b91d73ca72ea10dc1594e7a1175a79b3965f8f23b03f3376bb89a3d26556680c77fcb52a12f3c8e6cf110b5bae1dc7f94d337e61b3c4481e91efc561e03dc13c81179c5d5c56285daa68553e9a8d3c914a9150aad210a7f73defa22d9a5c96e964301e432aa1fd5b8eb9effea751d0892c7efd5491b"

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
