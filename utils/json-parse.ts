export function jsonParse<T extends unknown>(data: unknown): T {
  return JSON.parse(data as string)
}
