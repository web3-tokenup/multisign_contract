import { ethers } from "hardhat";
import { sendTx } from "./tee/signer";

export async function deployExtensibleFallbackHandler(deployerAddress: string): Promise<string> {
    const ExtensibleFallbackHandler = await ethers.getContractFactory("ExtensibleFallbackHandler");

    const deployTxData = await ExtensibleFallbackHandler.getDeployTransaction();
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
    console.log("ExtensibleFallbackHandler deployed to:", createAddress);

    return createAddress;
};