import hre from "hardhat";

const SafeAddr = "0xA983b137e18542Eb98da7bD4a093B90299DC9753";  // singleton address
const SafeToL2SetupAddr = "0xF9f59a689F854d024383f8482968EA892a23282D";
const CompatibilityFallbackHandlerAddr = "0xb9Accc7B4DFf6CF2e7724B61B4A0aa37a40579F3"
const PaymentReceiverAddr = "0x5afe7A11E7000000000000000000000000000000"; // Replace with actual payment receiver address
const SafeL2Addr = "0x4Fcfc3E3e4b5faE3c991BB185b3Dd5c3B0b12bC5"; // l2singleton address
const SafeProxyFactoryAddr = "0xc1e90Fe1092c7AA4b78Aca219685259Dd2D3985D";

const owners = [
    "0xa1a9D322E7Beb2d4dB93B1713b9aE8F71d1A1CcE",
    "0xF9F99d973393eC1f1a5d8A24aF8FA0605276406a",
    "0x7d77E20f76B65581f2783BF5084595F78f759133"
]; // Replace with actual owner addresses
const threshold = 2;
const nonce = 3; // Replace with actual nonce

async function main() {
    const SafeToL2SetupFactory = await hre.ethers.getContractFactory("SafeToL2Setup");
    const setupToL2Data = SafeToL2SetupFactory.interface.encodeFunctionData("setupToL2", [
        SafeL2Addr // safeL2 address
    ]);

    const SafeFactory = await hre.ethers.getContractFactory("Safe");
    const setupData = SafeFactory.interface.encodeFunctionData("setup", [
        owners, // owners
        BigInt(threshold), // threshold
        SafeToL2SetupAddr, // safeToL2Setup address
        setupToL2Data, // data
        CompatibilityFallbackHandlerAddr, // CompatibilityFallbackHandler
        hre.ethers.ZeroAddress, // paymentToken
        BigInt(0), // payment
        PaymentReceiverAddr // paymentReceiver
    ]);

    console.log("Creating new Safe wallet via SafeProxyFactory...");

    const factory = await hre.ethers.getContractAt("SafeProxyFactory", SafeProxyFactoryAddr);
    const createProxyTx = await factory.createProxyWithNonce(
        SafeAddr,   // singleton address
        setupData, // initializer
        BigInt(nonce), // nonce
    )
    console.log("Transaction sent. tx hash:", createProxyTx.hash);

    const receipt = await createProxyTx.wait();
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
