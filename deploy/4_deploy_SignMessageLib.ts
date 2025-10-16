import { ethers } from "hardhat";
import { sendTx } from "./tee/signer";

export async function deploySignMessageLib(deployerAddress: string): Promise<string> {
    const SignMessageLibFactory = await ethers.getContractFactory("SignMessageLib");

    const deployTxData = await SignMessageLibFactory.getDeployTransaction();
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
    console.log("SignMessageLib deployed to:", createAddress);

    return createAddress;
};