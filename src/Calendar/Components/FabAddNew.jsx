import { addHours } from "date-fns"
import { useAuthStore, useCalendarStore, useUiStore } from "../../Hooks"

export const FabAddNew = () => {

    const { isDateModalOpen, openDateModal } = useUiStore()
    const { setActiveEvent } = useCalendarStore()
    const {user} = useAuthStore()

    const handleClickNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user
        })
        openDateModal()
    }

    return (
        <button
            disabled={isDateModalOpen}
            onClick={handleClickNew}
            className="btn btn-primary fab"
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
