import { ethers } from "hardhat";
import { sendTx } from "./tee/signer";

export async function deployTokenCallbackHandler(deployerAddress: string): Promise<string> {
    const TokenCallbackHandler = await ethers.getContractFactory("TokenCallbackHandler");

    const deployTxData = await TokenCallbackHandler.getDeployTransaction();
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
    console.log("TokenCallbackHandler deployed to:", createAddress);

    return createAddress;
};