import fs from "fs"
export const createPathIfNotExist = (path: string) => {
  try {
    if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true })
    return true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return false
  }
}
