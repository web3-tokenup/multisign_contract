import { ethers } from "hardhat";
import { sendTx } from "./tee/signer";

export async function deployCreateCall(deployerAddress: string): Promise<string> {
    const CreateCallFactory = await ethers.getContractFactory("CreateCall");

    const deployTxData = await CreateCallFactory.getDeployTransaction();
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
    console.log("CreateCallFactory deployed to:", createAddress);

    return createAddress;
};