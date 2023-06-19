import { useContext } from 'react'
import { ModalContext } from '@titan-ui/providers/ModalProvider'

const useModal = () => useContext(ModalContext)
export default useModal

