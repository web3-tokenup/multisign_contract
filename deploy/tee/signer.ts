import { RemoteSigner } from "./remote_signer";
import { ethers } from "hardhat";
import { TransactionRequest } from "ethers";

var deployerAddress: string | null = null;
export async function getDeployerAddress() {
    if (process.env.SIGNER_ADDRESS) {
        deployerAddress = process.env.SIGNER_ADDRESS;
    } else {
        deployerAddress = await signer.getAddress();
        console.log("Deployer address obtained from signer:", deployerAddress);
        throw new Error("Please set SIGNER_ADDRESS in .env file");
    }

    if (!deployerAddress) {
        throw new Error("Deployer address not found");
    }

    return deployerAddress;
}

const signer = new RemoteSigner(process.env.SIGNER_AES_KEY!);

async function signTransaction(tx: string) {
    return signer.signTransaction(tx, deployerAddress!);
}

export async function sendTx(deployerAddress: string, tx: TransactionRequest) {
    const feeData = await ethers.provider.getFeeData();
    const network = await ethers.provider.getNetwork();

    tx.chainId = network.chainId;

    const txForEstimate = { ...tx, from: deployerAddress };
    if (!tx.gasLimit) {
        tx.gasLimit = await ethers.provider.estimateGas(txForEstimate);
    }

    if (tx.to && typeof tx.to !== 'string') {
        tx.to = await tx.to;
    }

    if (feeData.maxFeePerGas && feeData.maxPriorityFeePerGas) {
        tx.maxFeePerGas = feeData.maxFeePerGas;
        tx.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
    } else if (feeData.gasPrice) {
        tx.gasPrice = feeData.gasPrice;
    } else {
        throw new Error("No gas price information found from feeData");
    }

    const transaction = ethers.Transaction.from(tx as any);
    const signedTx = await signTransaction(transaction.unsignedSerialized);

    console.log(`Broadcasting transaction...`);
    const broadcastResponse = await ethers.provider.broadcastTransaction(signedTx);
    const receipt = await broadcastResponse.wait();

    if (!receipt || receipt.status === 0) {
        throw new Error(`Transaction failed: status 0. Receipt: ${JSON.stringify(receipt)}`);
    }
    console.log('Transaction successful with hash:', receipt.hash);
    return receipt;
}

if (require.main === module) {
    getDeployerAddress().then(address => {
        console.log("Deployer Address:", address);
    }).catch(error => {
        console.error("Error getting deployer address:", error);
        process.exit(1);
    });
}
