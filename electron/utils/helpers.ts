import fs from 'fs';
export const createPathIfNotExist = (paths: string) => {
    try {
        let pathArray = paths.split('\\');
        if (pathArray[0] === paths) pathArray = paths.split("/");
        const path = pathArray.slice(0, pathArray.length - 1).join('\\');
        if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true })
        const name = pathArray[pathArray.length - 1];
        return { path, name };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(error);
    }
}