import hre from "hardhat";

const walletAddress = "0x22c95e09e9265b55437873bb285d73ab612c0f98";

const messageReq = {
    "to": "0xa1a9D322E7Beb2d4dB93B1713b9aE8F71d1A1CcE",
    "value": "100000000000000000",
    "data": "0x",
    "operation": 0,
    "safeTxGas": 0,
    "baseGas": 0,
    "gasPrice": 0,
    "gasToken": "0x0000000000000000000000000000000000000000",
    "refundReceiver": "0x0000000000000000000000000000000000000000",
    "nonce": 2
}
const signatures = "0x24197be5e3eeeb888b6a74270716e72981ee5e46503a1e435edee9179be3ce2d5c65a973e7cd4563f86d208a26353b5b0278aca6384a046e66dd64d02b2515ef1b196898097e45b56d4b782c3f052ed0dddb1704921baba6c63db22f9b5837f9be5aaf7d6c31014347507e51d226951b1ad89af720e05571003cfb129e00e627de1b"

async function main() {
    // const SafeFactory = await hre.ethers.getContractFactory("Safe");
    // const inputData = SafeFactory.interface.encodeFunctionData(
    //     "execTransaction",
    //     [
    //         messageReq.to,
    //         messageReq.value,
    //         messageReq.data,
    //         messageReq.operation,
    //         messageReq.safeTxGas,
    //         messageReq.baseGas,
    //         messageReq.gasPrice,
    //         messageReq.gasToken,
    //         messageReq.refundReceiver,
    //         signatures,
    //     ]
    // )

    // console.log("inputData:", inputData);
    const safe = await hre.ethers.getContractAt("Safe", walletAddress);

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
