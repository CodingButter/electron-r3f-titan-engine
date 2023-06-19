export type PerpectiveCamera = {
    id: string;
    name: string;
    sceneId: string;
    fov: number;
    aspect: number;
    near: number;
    far: number;
}

export type OrthographicCamera = {
    id: string;
    name: string;
    sceneId: string;
    left: number;
    right: number;
    top: number;
    bottom: number;
    near: number;
    far: number;
}