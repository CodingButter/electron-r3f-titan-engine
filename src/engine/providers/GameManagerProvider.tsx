import { useState, createContext } from "react"
import SceneType from "@titan-types/Scene"
import type ProjectType from "@titan-types/Project"

export type GameManager = {
  updateProject: (project: ProjectType) => Promise<boolean>
  createProject: (projectName: string) => Promise<boolean>
  updateScene: (project: ProjectType, scene: SceneType) => Promise<boolean>
  createScene: (project: ProjectType, sceneName: string) => Promise<boolean>
  projects: ProjectType[]
  currentProject: ProjectType | null
  scenes: SceneType[]
  currentScene: SceneType | null
}

export const GameManagerContext = createContext<GameManager>({
  updateProject: () => Promise.resolve(false),
  createProject: () => Promise.resolve(false),
  updateScene: () => Promise.resolve(false),
  createScene: () => Promise.resolve(false),
  projects: [],
  currentProject: null,
  scenes: [],
  currentScene: null,
})

const GameManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [projects, setProjects] = useState<ProjectType[]>([])
  const [currentProject, setCurrentProject] = useState<ProjectType | null>(null)
  const [scenes, setScenes] = useState<SceneType[]>([])
  const [currentScene, setCurrentScene] = useState<SceneType | null>(null)

  const createProject = async (projectName: string): Promise<boolean> => {
    const projectId = crypto.randomUUID()
    if (fileAPI.exists(projectId)) return false
    fileAPI.createFolder(projectId)
    fileAPI.createFolder(`${projectId}/assets`)
    fileAPI.createFolder(`${projectId}/assets/images`)
    fileAPI.createFolder(`${projectId}/assets/sounds`)
    fileAPI.createFolder(`${projectId}/assets/fonts`)
    fileAPI.createFolder(`${projectId}/assets/scripts`)
    fileAPI.createFolder(`${projectId}/assets/scenes`)
    fileAPI.createFolder(`${projectId}/assets/animations`)
    fileAPI.createFolder(`${projectId}/assets/tilemaps`)
    const project = { name: projectName, id: projectId }
    setCurrentProject(project)
    setProjects((prevProjects) => [...prevProjects, project])
    createScene(project, "Scene 1")
    return updateProject(project)
  }

  const createScene = async (project: ProjectType, sceneName: string): Promise<boolean> => {
    if (!project) return false
    const sceneId = crypto.randomUUID()
    const scene: SceneType = { name: sceneName, id: sceneId, projectId: project.id }
    fileAPI.createFolder(`${project.id}/assets/scenes/${sceneId}`)
    if (!(await updateScene(project, scene))) return false
    setCurrentScene(() => scene)
    setScenes((prevScenes) => [...prevScenes, scene])
    return true
  }

  const updateProject = async (project: ProjectType): Promise<boolean> => {
    const { id } = project
    if (!(await fileAPI.saveFile(id, "project.json", JSON.stringify(project, null, 4))))
      return false
    return true
  }

  const updateScene = async (project: ProjectType, scene: SceneType): Promise<boolean> => {
    const { id } = scene
    if (!project || !scene) return false
    if (
      !(await fileAPI.saveFile(
        `${project.id}/assets/scenes/${id}`,
        `scene.json`,
        JSON.stringify(scene, null, 4)
      ))
    )
      return false
    setScenes((prevScenes: SceneType[]) => [...prevScenes, scene])
    return true
  }

  return (
    <GameManagerContext.Provider
      value={{
        createProject,
        createScene,
        updateProject,
        updateScene,
        projects,
        currentProject,
        scenes,
        currentScene,
      }}>
      {children}
    </GameManagerContext.Provider>
  )
}

export default GameManagerProvider
