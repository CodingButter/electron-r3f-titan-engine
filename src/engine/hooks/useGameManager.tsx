import { createContext, useContext } from 'react'
export interface GameManager {
    getState: () => any
}

export const GameManagerContext = createContext<GameManager>(
    {
        getState: () => ({})
    })


export const useGameManager = () => useContext(GameManagerContext)