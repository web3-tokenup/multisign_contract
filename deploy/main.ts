import { getDeployerAddress } from "./tee/signer";
import fs from "fs";
import path from "path";
import { ethers } from "hardhat";


async function isContractDeployed(address: string): Promise<boolean> {
    try {
        const code = await ethers.provider.getCode(address);
        return code !== "0x";
    } catch (error) {
        return false;
    }
}

async function main() {
    const deployerAddress = await getDeployerAddress();
    console.log('Deployer address:', deployerAddress);

    const deploymentsPath = path.join(__dirname, "deployments.json");
    let deployments: { [key: string]: string } = {};
    if (fs.existsSync(deploymentsPath)) {
        deployments = JSON.parse(fs.readFileSync(deploymentsPath, "utf8"));
    }

    if (deployments.CreateCall && await isContractDeployed(deployments.CreateCall)) {
        console.log('CreateCall already deployed at:', deployments.CreateCall);
    } else {
        console.log('Deploying CreateCall...');
        const { deployCreateCall } = await import("./1_deploy_CreateCall");
        const createCallAddress = await deployCreateCall(
            deployerAddress,
        );
        deployments.CreateCall = createCallAddress;
        fs.writeFileSync(deploymentsPath, JSON.stringify(deployments, null, 2));
    }

    if (deployments.MultiSend && await isContractDeployed(deployments.MultiSend)) {
        console.log('MultiSend already deployed at:', deployments.MultiSend);
    } else {
        console.log('Deploying MultiSend...');
        const { deployMultiSend } = await import("./2_deploy_MultiSend");
        const multiSendAddress = await deployMultiSend(
            deployerAddress,
        );
        deployments.MultiSend = multiSendAddress;
        fs.writeFileSync(deploymentsPath, JSON.stringify(deployments, null, 2));
    }

    if (deployments.MultiSendCallOnly && await isContractDeployed(deployments.MultiSendCallOnly)) {
        console.log('MultiSendCallOnly already deployed at:', deployments.MultiSendCallOnly);
    } else {
        console.log('Deploying MultiSendCallOnly...');
        const { deployMultiSendCallOnly } = await import("./3_deploy_MultuSendCallOnly");
        const multiSendCallOnlyAddress = await deployMultiSendCallOnly(
            deployerAddress,
        );
        deployments.MultiSendCallOnly = multiSendCallOnlyAddress;
        fs.writeFileSync(deploymentsPath, JSON.stringify(deployments, null, 2));
    }

    if (deployments.SignMessageLib && await isContractDeployed(deployments.SignMessageLib)) {
        console.log('SignMessageLib already deployed at:', deployments.SignMessageLib);
    } else {
        console.log('Deploying SignMessageLib...');
        const { deploySignMessageLib } = await import("./4_deploy_SignMessageLib");
        const signMessageLibAddress = await deploySignMessageLib(
            deployerAddress,
        );
        deployments.SignMessageLib = signMessageLibAddress;
        fs.writeFileSync(deploymentsPath, JSON.stringify(deployments, null, 2));
    }

    if (deployments.Safe && await isContractDeployed(deployments.Safe)) {
        console.log('Safe already deployed at:', deployments.Safe);
    } else {
        console.log('Deploying Safe...');
        const { deploySafe } = await import("./5_deploy_Safe");
        const safeAddress = await deploySafe(
            deployerAddress,
        );
        deployments.Safe = safeAddress;
        fs.writeFileSync(deploymentsPath, JSON.stringify(deployments, null, 2));
    }


    if (deployments.SafeL2 && await isContractDeployed(deployments.SafeL2)) {
        console.log('SafeL2 already deployed at:', deployments.SafeL2);
    } else {
        console.log('Deploying SafeL2...');
        const { deploySafeL2 } = await import("./12_deploy_SafeL2");
        const safeL2Address = await deploySafeL2(
            deployerAddress,
        );
        deployments.SafeL2 = safeL2Address;
        fs.writeFileSync(deploymentsPath, JSON.stringify(deployments, null, 2));
    }


    if (deployments.SafeProxyFactory && await isContractDeployed(deployments.SafeProxyFactory)) {
        console.log('SafeProxyFactory already deployed at:', deployments.SafeProxyFactory);
    } else {
        console.log('Deploying SafeProxyFactory...');
        const { deploySafeProxyFactory } = await import("./6_SafeProxyFactory");
        const safeProxyFactoryAddress = await deploySafeProxyFactory(
            deployerAddress,
        );
        deployments.SafeProxyFactory = safeProxyFactoryAddress;
        fs.writeFileSync(deploymentsPath, JSON.stringify(deployments, null, 2));
    }

    if (deployments.TokenCallbackHandler && await isContractDeployed(deployments.TokenCallbackHandler)) {
        console.log('TokenCallbackHandler already deployed at:', deployments.TokenCallbackHandler);
    } else {
        console.log('Deploying TokenCallbackHandler...');
        const { deployTokenCallbackHandler } = await import("./7_deploy_TokenCallbackHandler");
        const tokenCallbackHandlerAddress = await deployTokenCallbackHandler(
            deployerAddress,
        );
        deployments.TokenCallbackHandler = tokenCallbackHandlerAddress;
        fs.writeFileSync(deploymentsPath, JSON.stringify(deployments, null, 2));
    }

    if (deployments.CompatibilityFallbackHandler && await isContractDeployed(deployments.CompatibilityFallbackHandler)) {
        console.log('CompatibilityFallbackHandler already deployed at:', deployments.CompatibilityFallbackHandler);
    } else {
        console.log('Deploying CompatibilityFallbackHandler...');
        const { deployCompatibilityFallbackHandler } = await import("./8_deploy_CompatibilityFallbackHandler");
        const compatibilityFallbackHandlerAddress = await deployCompatibilityFallbackHandler(
            deployerAddress,
        );
        deployments.CompatibilityFallbackHandler = compatibilityFallbackHandlerAddress;
        fs.writeFileSync(deploymentsPath, JSON.stringify(deployments, null, 2));
    }

    if (deployments.ExtensibleFallbackHandler && await isContractDeployed(deployments.ExtensibleFallbackHandler)) {
        console.log('ExtensibleFallbackHandler already deployed at:', deployments.ExtensibleFallbackHandler);
    } else {
        console.log('Deploying ExtensibleFallbackHandler...');
        const { deployExtensibleFallbackHandler } = await import("./9_deploy_ExtensibleFallbackHandler");
        const extensibleFallbackHandlerAddress = await deployExtensibleFallbackHandler(
            deployerAddress,
        );
        deployments.ExtensibleFallbackHandler = extensibleFallbackHandlerAddress;
        fs.writeFileSync(deploymentsPath, JSON.stringify(deployments, null, 2));
    }

    if (deployments.SimulateTxAccessor && await isContractDeployed(deployments.SimulateTxAccessor)) {
        console.log('SimulateTxAccessor already deployed at:', deployments.SimulateTxAccessor);
    } else {
        console.log('Deploying SimulateTxAccessor...');
        const { deploySimulateTxAccessor } = await import("./10_deploy_SimulateTxAccessor");
        const simulateTxAccessorAddress = await deploySimulateTxAccessor(
            deployerAddress,
        );
        deployments.SimulateTxAccessor = simulateTxAccessorAddress;
        fs.writeFileSync(deploymentsPath, JSON.stringify(deployments, null, 2));
    }

    if (deployments.SafeToL2Setup && await isContractDeployed(deployments.SafeToL2Setup)) {
        console.log('SafeToL2Setup already deployed at:', deployments.SafeToL2Setup);
    } else {
        console.log('Deploying SafeToL2Setup...');
        const { deploySafeToL2Setup } = await import("./11_deploy_SafeToL2Setup");
        const safeToL2SetupAddress = await deploySafeToL2Setup(
            deployerAddress,
        );
        deployments.SafeToL2Setup = safeToL2SetupAddress;
        fs.writeFileSync(deploymentsPath, JSON.stringify(deployments, null, 2));
    }

    console.log('Deployments saved to:', deploymentsPath);
}

main()
    .then(() => {
        process.exit(0);
    })
    .catch((ex) => {
        console.error(ex);
        process.exit(1);
    });
