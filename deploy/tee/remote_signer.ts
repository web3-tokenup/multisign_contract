import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { encodeCBC } from './crypto'

// Implement encodeCBC function directly
// const encodeCBC = (text: string, key: string): string => {
//   const iv = Buffer.alloc(16, 0);
//   const cipher = createCipheriv('aes-256-cbc', Buffer.from(key), iv);
//   let encrypted = cipher.update(text, 'utf8', 'base64');
//   encrypted += cipher.final('base64');
//   return encrypted;
// }

const SIGNER_HOST = process.env.SIGNER_HOST

// 示例：自定义 signer，调用你自己的签名机 API
export class RemoteSigner {
  chain: string = 'ETH'
  aesKey: string

  constructor(aesKey: string) {
    this.aesKey = aesKey
  }

  async generateNonce() {
    return uuidv4()
  }

  async getAddress(): Promise<string> {
    // 构造请求数据
    const reqData = {
      chain: this.chain,
      nonce: this.generateNonce(),
      timestamp: Date.now(),
      uid: '11111',
    }

    // 假设 encodeCBC 是你实现的加密函数
    const jsonString = JSON.stringify(reqData)
    const firstEncrypt = encodeCBC(jsonString, this.aesKey)
    const secondEncrypt = encodeCBC(firstEncrypt, this.aesKey)

    const postData = {
      data: secondEncrypt,
    }
    try {
      // 返回签名机控制的地址
      const serRes = await axios.post(SIGNER_HOST + '/generate', postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // 解析响应
      const data = serRes.data;
      const result = (typeof data === 'string' ? JSON.parse(data) : data) as {
        code: string;
        success: boolean;
        msg: string;
        data: string;
      };

      // 检查响应状态
      if (result.code !== '000000' || !result.success) {
        throw new Error(`fail: ${result.msg} ${result.code}`);
      }

      return result.data
    } catch (error) {
      console.error('getAddress error:', error)
      return ''
    }
  }

  async signTransaction(rawTx: string, sender: string): Promise<string> {
    // 生成新的 orderNo 和 nonce
    const nonce = uuidv4()
    const orderNo = nonce

    // 构造请求数据
    const reqData = {
      chain: this.chain,
      nonce: nonce,
      orderNo: orderNo,
      rawTransaction: rawTx,
      sender: sender,
      timestamp: Date.now(),
    }

    // 转换为 JSON 字符串
    const jsonString = JSON.stringify(reqData)

    // 两次加密
    const firstEncrypt = encodeCBC(jsonString, this.aesKey)
    const secondEncrypt = encodeCBC(firstEncrypt, this.aesKey)

    const postData = {
      data: secondEncrypt,
    }

    // 发送请求
    try {
      const serRes = await axios.post(SIGNER_HOST + '/encrypt', postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // 解析响应
      const data = serRes.data;
      const result = (typeof data === 'string' ? JSON.parse(data) : data) as {
        code: string;
        success: boolean;
        msg: string;
        data: string;
      };

      // 检查响应状态
      if (result.code !== '000000' || !result.success) {
        throw new Error(`fail: ${result.msg} ${result.code}`);
      }

      return result.data;
    } catch (error) {
      throw new Error(`signTransaction error: ${error}`)
    }
  }
}

// export const signer = new RemoteSigner(process.env.SIGNER_AES_KEY!);
