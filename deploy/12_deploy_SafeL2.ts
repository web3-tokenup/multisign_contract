import { ethers } from "hardhat";
import { sendTx } from "./tee/signer";

export async function deploySafeL2(deployerAddress: string): Promise<string> {
    const SafeL2Factory = await ethers.getContractFactory("SafeL2");

    const deployTxData = await SafeL2Factory.getDeployTransaction();
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
    console.log("SafeL2 deployed to:", createAddress);

    return createAddress;
};