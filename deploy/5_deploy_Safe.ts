import { ethers } from "hardhat";
import { sendTx } from "./tee/signer";

export async function deploySafe(deployerAddress: string): Promise<string> {
    const SafeFactory = await ethers.getContractFactory("Safe");

    const deployTxData = await SafeFactory.getDeployTransaction();
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
    console.log("SafeFactory deployed to:", createAddress);

    return createAddress;
};