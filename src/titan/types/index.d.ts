export type Layer = "World" | "UI"

export type Component = {
    id: string
    name: string
    className: string
    update: (delta: number) => void
    render: () => void
}

export type vec3 = {
    x: number
    y: number
    z: number
}

export type Transform = {
    position: vec3,
    rotation: vec3,
    scale: vec3,
}

export type Entity = {
    id: string
    name: string
    layer: Layer
    components: Component[]
    transform: Transform
    update: (delta: number) => void
    render: () => void
}

export type Scene = {
    id: string
    name: string
    entities: Entity[]
    update: (delta: number) => void
    render: () => void
}