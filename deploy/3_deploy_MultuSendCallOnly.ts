import { ethers } from "hardhat";
import { sendTx } from "./tee/signer";

export async function deployMultiSendCallOnly(deployerAddress: string): Promise<string> {
    const MultiSendCallOnlyFactory = await ethers.getContractFactory("MultiSendCallOnly");

    const deployTxData = await MultiSendCallOnlyFactory.getDeployTransaction();
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
    console.log("MultiSendCallOnly deployed to:", createAddress);

    return createAddress;
};