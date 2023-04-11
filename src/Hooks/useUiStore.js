import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../Store"

export const useUiStore = () => {

    const dispatch = useDispatch()
    const {isDateModalOpen} = useSelector(state => state.ui)
    const openDateModal = () => {
        dispatch(onOpenDateModal())
    }
    const closeDateModal = () => {
        dispatch(onCloseDateModal())
    }

    return {
        // Properties
        isDateModalOpen,
        // Metodos
        openDateModal,
        closeDateModal
    }
}