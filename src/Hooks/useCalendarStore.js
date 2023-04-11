import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import calendarApi from "../Api/calendarApi"
import { convertEventsToDateEvents } from "../Helpers/convertEventsToDateEvents"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onPullActiveEvent, onSetActiveEvent, onUpdateEvent } from "../Store"

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector(state => state.calendar)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }
  const pullActiveEvent = () => {
    dispatch(onPullActiveEvent())
  }
  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        // Actualizo el evento
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
        dispatch(onUpdateEvent({ ...calendarEvent, user }))
        return;
      }
      const { data } = await calendarApi.post('/events', calendarEvent)
      dispatch(onAddNewEvent({
        ...calendarEvent,
        id: data.event.id,
        user
      }))
    } catch (error) {
      console.log(error)
      Swal.fire('Error al guardar', error.response.data.msg, 'error')
    }
  }
  const startDeletingEvent = async() => {
    // TODO: Llegar al backend
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`)
      dispatch(onDeleteEvent())
    } catch (error) {
      Swal.fire('Error al eliminar', error.response.data.msg, 'error')
    }
  }
  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events')
      const events = convertEventsToDateEvents(data.events)
      dispatch(onLoadEvents(events))
    } catch (error) {
      console.log('Error cargando eventos')
      console.log(error)
    }
  }

  return {
    // Properties.
    events,
    activeEvent,
    isMyEvent: (user.uid === activeEvent?.user.uid) || (user.uid === activeEvent?.user._id),
    hasEventSelected: !!activeEvent,
    // Methods.
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    pullActiveEvent,
    startLoadingEvents
  }
}