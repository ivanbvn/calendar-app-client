export const events = [
    {
        id: '1',
        start: new Date('2022-10-21 13:00:00'),
        end: new Date('2022-10-21 15:00:00'),
        title: 'Cumpleaños del Jefe',
        notes: 'Hay que comprar la torta',
    },
    {
        id: '2',
        start: new Date('2022-10-25 13:00:00'),
        end: new Date('2022-10-25 15:00:00'),
        title: 'Cumpleaños de José',
        notes: 'Hay que comprar el regalo',
    },
]
export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}
export const calendarWithEventsState = {
    isLoadingEvents: true,
    events: [...events],
    activeEvent: null
}
export const calendarWithActiveEventState = {
    isLoadingEvents: true,
    events: [...events],
    activeEvent: { ...events[0] }
}