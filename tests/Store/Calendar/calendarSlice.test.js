import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onPullActiveEvent, onSetActiveEvent, onUpdateEvent } from "../../../src/Store/Calendar/calendarSlice"
import { initialState, events, calendarWithActiveEventState, calendarWithEventsState } from "../../Fixtures/calendarStates"

describe('Pruebas en calendarSlice', () => {
    test('debe devolver el initialState', () => {
        expect(calendarSlice.getInitialState()).toEqual(initialState)
    })
    test('onSetActiveEvent debe devolver un activeEvent', () => {
        const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]))
        expect(state.activeEvent).toEqual({
            id: '1',
            start: new Date('2022-10-21 13:00:00'),
            end: new Date('2022-10-21 15:00:00'),
            title: 'Cumpleaños del Jefe',
            notes: 'Hay que comprar la torta',
        })
    })
    test('onPullActiveEvent debe eliminar el activeEvent', () => {
        const state = calendarSlice.reducer(calendarWithActiveEventState, onPullActiveEvent())
        expect(state.activeEvent).toBe(null)
    })
    test('onAddNewEvent debe agregar un nuevo evento', () => {
        const newEvent = {
            id: '3',
            start: new Date('2022-10-10 13:00:00'),
            end: new Date('2022-10-10 15:00:00'),
            title: 'Exposicion de proyecto',
            notes: 'Llevar el pendrive',
        }
        const state = calendarSlice.reducer(calendarWithActiveEventState, onAddNewEvent(newEvent))
        expect(state.events.length).toBeGreaterThanOrEqual(2)
        expect(state.events).toEqual([...events, newEvent])
        expect(state.activeEvent).toBe(null)
    })
    test('onUpdateEvent debe actualizar un event', () => {
        const updateEvent = {
            id: '1',
            start: new Date('2022-10-26 13:00:00'),
            end: new Date('2022-10-26 15:00:00'),
            title: 'Parcial',
            notes: 'Hay que estudiar más',
        }
        const state = calendarSlice.reducer(calendarWithActiveEventState, onUpdateEvent(updateEvent))
        expect(state.events).toContain(updateEvent)
        expect(state.activeEvent).toBe(null)
    })
    test('onDeleteEvent debe eliminar el activeEvent del array events', () => {
        const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent())
        expect(state.events).not.toContain(events[0])
        expect(state.activeEvent).toBe(null)
    })
    test('onLoadEvents debe establecer los eventos', () => {
        const state = calendarSlice.reducer(initialState, onLoadEvents(events))
        expect(state.isLoadingEvents).toBeFalsy()
        expect(state.events).toEqual(events)
    })
    test('onLoadEvents no debe establecer los eventos repetidos', () => {
        let state = calendarSlice.reducer(initialState, onLoadEvents(events))
        state = calendarSlice.reducer(state, onLoadEvents(events))
        expect(state.isLoadingEvents).toBeFalsy()
        expect(state.events.length).toBe(events.length)
    })
    test('onLogoutCalendar debe devolver el estado', () => {
        const state = calendarSlice.reducer(calendarWithActiveEventState, onLogoutCalendar())
        expect(state).toEqual(initialState)
    })
})