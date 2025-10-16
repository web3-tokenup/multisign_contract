# handshake-contracts

## 1. 拉去依赖
```shell
npm install
```

## 2. 编译合约
```shell
npx hardhat compile
```

## 3. 配置环境变量
```shell
cp .env.example .env
```
修改环境变量中的SIGNER_HOST，SIGNER_AES_KEY

## 4. 获取签名地址
```shell
npx hardhat run deploy/signer.ts 
```
example out:
```shell
Deployer Address: 0x51a826044fdd2b71dc5b731e82c7802954a112dd
```

## 5. 修改环境变量中配置签名地址
```shell
echo "SIGNER_ADDRESS=0x51a826044fdd2b71dc5b731e82c7802954a112dd" >> .env
```

## 6. 部署合约
```shell
npx hardhat run deploy/main.ts --network xonemain
```
example out:
```shell
Deployments saved to: /Users/lyon/Desktop/snqu/handshake/handshake-contracts/deploy/deployments.json
```