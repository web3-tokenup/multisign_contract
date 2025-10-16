import { ethers } from "hardhat";
import { sendTx } from "./tee/signer";

export async function deploySimulateTxAccessor(deployerAddress: string): Promise<string> {
    const SimulateTxAccessor = await ethers.getContractFactory("SimulateTxAccessor");

    const deployTxData = await SimulateTxAccessor.getDeployTransaction();
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
    console.log("SimulateTxAccessor deployed to:", createAddress);

    return createAddress;
};