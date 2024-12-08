import * as crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const secretKey = process.env.NORMAL_SECRET || '';
const iv = crypto.randomBytes(16);

export const encryptData = (data: string): string => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encryptedData = cipher.update(data, 'utf8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
};

export const decryptData = (encryptedData: string): string => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
};

export const generateRandomString = (length: number): string => {
  const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
  return randomBytes.toString('hex').slice(0, length);
};
