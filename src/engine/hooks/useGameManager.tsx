import { useContext } from 'react'
import { GameManagerContext } from '../providers/GameManagerProvider'
const useGameManager = () => useContext(GameManagerContext)
export default useGameManager