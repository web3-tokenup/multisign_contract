import crypto from 'crypto'

/**
 * AES-CBC 加密
 * @param plaintext 明文字符串
 * @param key 密钥（16/24/32字节，分别对应 AES-128/192/256）
 * @returns base64 编码的密文
 */
export function encodeCBC(plaintext: string, key: string): string {
  // 生成 16 字节的随机 IV
  const iv = Buffer.from('project_c_iv_key')
  plaintext = plaintext + '_c_signboard'
  // 创建 Cipher
  const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(key, 'utf8'), iv)
  let encrypted = cipher.update(plaintext, 'utf8', 'base64')
  encrypted += cipher.final('base64')
  // 返回 iv + 密文，iv 需要和密文一起传递
  return encrypted
}
