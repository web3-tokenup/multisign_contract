import { ethers } from "hardhat";
import { sendTx } from "./tee/signer";

export async function deploySafeToL2Setup(deployerAddress: string): Promise<string> {
    const SafeToL2SetupFactory = await ethers.getContractFactory("SafeToL2Setup");

    const deployTxData = await SafeToL2SetupFactory.getDeployTransaction();
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
    console.log("SafeToL2Setup deployed to:", createAddress);

    return createAddress;
};