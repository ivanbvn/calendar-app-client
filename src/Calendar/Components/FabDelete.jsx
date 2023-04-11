import { useCalendarStore, useUiStore } from "../../Hooks"

export const FabDelete = () => {

  const { hasEventSelected, startDeletingEvent } = useCalendarStore()
  // const { isDateModalOpen } = useUiStore()

  // const buttonDisplayStyle =
  //   (hasEventSelected)
  //     ? (isDateModalOpen)
  //       ? 'none'
  //       : ''
  //     : 'none'

  const handleDelete = () => {
    startDeletingEvent()
  }

  return (
    <button
      aria-label="btn-delete"
      onClick={handleDelete}
      className="btn btn-danger fab-danger"
      style={{
        display: hasEventSelected ? '' : 'none'
      }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  )
}
