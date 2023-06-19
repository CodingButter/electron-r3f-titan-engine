import { useState, createContext } from 'react'
import { createHash } from 'crypto'
import SceneType from '@titan-types/Scene'
import type ProjectType  from '@titan-types/Project'

export type GameManager =  {
    createProject: (projectName:string) => Promise<boolean>
    createScene: (sceneName:string) => Promise<boolean>
    projects: ProjectType[]
    currentProject: ProjectType | null
    scenes: SceneType[]
    currentScene: SceneType | null
}

export const GameManagerContext = createContext<GameManager|null>(null)

const GameManagerProvider = ({ children }: { children: React.ReactNode }) => {
    const [projects, setProjects] = useState<ProjectType[]>([])
    const [currentProject, setCurrentProject] = useState<ProjectType|null>(null)
    const [scenes, setScenes] = useState<SceneType[]>([])
    const [currentScene, setCurrentScene] = useState<SceneType|null>(null)
    
    const createProject = async (projectName: string):Promise<boolean> => {
        const projectId = createHash('sha256')
            .update(projectName)
            .digest('hex');
        if (filesAPI.exists(projectId)) return false

            filesAPI.createFolder(projectId)
            filesAPI.createFolder(`${projectId}/assets`)
            filesAPI.createFolder(`${projectId}/assets/images`)
            filesAPI.createFolder(`${projectId}/assets/sounds`)
            filesAPI.createFolder(`${projectId}/assets/fonts`)
            filesAPI.createFolder(`${projectId}/assets/scripts`)
            filesAPI.createFolder(`${projectId}/assets/scenes`)
            filesAPI.createFolder(`${projectId}/assets/animations`)
            filesAPI.createFolder(`${projectId}/assets/tilemaps`)
            if(!(await filesAPI.saveFile(
                projectId,
                'project.json',
                JSON.stringify({ name: projectName })
        ))) return false
        const project = { name: projectName, id: projectId }
            setCurrentProject(project)
            setProjects((prevProjects) => [...prevProjects, project])
            return true
    }

    const createScene = async (sceneName: string): Promise<boolean> => {
    const sceneId = createHash('sha256')
        .update(sceneName)
        .digest('hex')
    const sceneFile = `${sceneId}.json`
    if (!currentProject) {
        return false
    }
    if (!filesAPI.exists(`${currentProject.id}/assets/scenes`)) return false
    if (filesAPI.exists(`${currentProject.id}/assets/scenes/${sceneFile}`)) return false
        if (!(await filesAPI.saveFile(
            `${currentProject.id}/assets/scenes/`,
            sceneFile,
            JSON.stringify({ name: sceneName, id: sceneId })
        ))) return false;
        const scene:SceneType = { name: sceneName, id: sceneId, projectId: currentProject.id }
        setCurrentScene(() => scene)
        setScenes((prevScenes:SceneType[]) => [...prevScenes, scene])
        return true
    }

    return (
        <GameManagerContext.Provider value={{ createProject, createScene, projects,currentProject,scenes,currentScene }}>
            {children}
        </GameManagerContext.Provider>
    )
}

export default GameManagerProvider