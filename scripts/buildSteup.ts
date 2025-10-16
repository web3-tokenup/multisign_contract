import hre from "hardhat";

const SafeProxyFactoryAddr = "0xc1e90Fe1092c7AA4b78Aca219685259Dd2D3985D";

async function main() {
    const factory = await hre.ethers.getContractAt("SafeProxyFactory", SafeProxyFactoryAddr);

    const receipt = await hre.ethers.provider.getTransactionReceipt("0x95e5593f423a922dd811f9bb3190f218489d9e780be3e9b4ae70f15bc58676e3");
    if (!receipt) {
        throw new Error("Transaction failed to be mined");
    }
    const proxyCreationEvent = receipt.logs.find(
        (log) => factory.interface.parseLog(log as any)?.name === "ProxyCreation"
    );
    if (!proxyCreationEvent) {
        throw new Error("ProxyCreation event not found in transaction receipt");
    }
    const proxyAddress = factory.interface.parseLog(proxyCreationEvent as any)!.args.proxy;
    if (!proxyAddress) {
        throw new Error("Failed to get proxy address from transaction receipt");
    }
    console.log("New Safe wallet created at:", proxyAddress);
}



main()
    .then(() => {
        process.exit(0);
    })
    .catch((ex) => {
        console.error(ex);
        process.exit(1);
    });
