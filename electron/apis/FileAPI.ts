import { ipcRenderer } from 'electron'
import { FETCH_DIRECTORY, FETCH_DATA_FROM_STORAGE } from '../../utils/constants.json'
export const readDir = (path: string) => {
    return ipcRenderer.sendSync(FETCH_DIRECTORY, path)
}

export const readFile = (path: string) => {
    path = `${path}.json`
    const response = ipcRenderer.sendSync(FETCH_DATA_FROM_STORAGE, path)
    if (response.error) {
        throw response
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveFile = (path: string, fileName: string, data: any) => {
    return ipcRenderer.invoke(FETCH_DATA_FROM_STORAGE, `${path}/${fileName}`, data)
}

