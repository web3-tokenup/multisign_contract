import { ethers } from "hardhat";
import { sendTx } from "./tee/signer";

export async function deployMultiSend(deployerAddress: string): Promise<string> {
    const MultiSendFactory = await ethers.getContractFactory("MultiSend");

    const deployTxData = await MultiSendFactory.getDeployTransaction();
    let nonce = await ethers.provider.getTransactionCount(deployerAddress, "latest");

    const receipt = await sendTx(deployerAddress, {
        data: deployTxData.data,
        nonce: nonce,
    });
    nonce++;

    const createAddress = receipt.contractAddress;
    if (!createAddress) {
        throw new Error(`Contract not deployed. Receipt: ${JSON.stringify(receipt)}`);
    }
    console.log("MultiSend deployed to:", createAddress);

    return createAddress;
};