import fs from 'fs'

export function encode(data: string) {
  return Buffer.from(data).toString('base64')
}

export function encodeFile(filePath: string) {
  const fileContent = fs.readFileSync(filePath, 'utf8')
  return encode(fileContent)
}

export function decode<T extends unknown>(base64Str: string): T {
  return JSON.parse(Buffer.from(base64Str, 'base64').toString('utf8'))
}
