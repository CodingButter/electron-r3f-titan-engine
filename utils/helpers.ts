import fs from 'fs';
export const createPathIfNotExist = (path: string) => {
    try {
        let pathArray = path.split('\\');
        if (pathArray[0] === path) pathArray = path.split("/");
        if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true })
        return true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return false;
    }
}