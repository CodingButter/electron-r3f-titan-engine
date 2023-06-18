import { useState } from 'react'
import { GameManagerContext } from '../hooks/useGameManager'

const GameManagerProvider = ({ children }) => {
    const [state, setState] = useState({})

    const getState = () => state
    

    return ()