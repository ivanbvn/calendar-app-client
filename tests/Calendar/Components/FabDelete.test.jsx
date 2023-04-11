import { fireEvent, render, screen } from "@testing-library/react"
import { FabDelete } from "../../../src/Calendar/Components/FabDelete"
import { useCalendarStore } from "../../../src/Hooks"

jest.mock("../../../src/Hooks/useCalendarStore")

describe('Pruebas en <FabDelete/>', () => {
    const mockStartDeletingEvent = jest.fn()
    beforeEach(() => jest.clearAllMocks())
    beforeEach(() => jest.clearAllTimers())
    test('debe de mostrar el componente correctamente', () => {
        useCalendarStore.mockReturnValue({
            hasEventSelected: false
        })
        render(<FabDelete />)
        // screen.debug()
        const btn = screen.getByLabelText('btn-delete')
        expect(btn.classList).toContain('btn')
        expect(btn.classList).toContain('btn-danger')
        expect(btn.classList).toContain('fab-danger')
        expect(btn.style.display).toBe('none')
    })
    test('debe mostrarse cuando hacemos click en un evento', () => {
        useCalendarStore.mockReturnValue({
            hasEventSelected: true
        })
        render(<FabDelete />)
        // screen.debug()
        const btn = screen.getByLabelText('btn-delete')
        expect(btn.style.display).toBe('')
    })
    test('hadleDelete debe llamar a la function startDeletingEvent', () => {
        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            startDeletingEvent: mockStartDeletingEvent
        })
        render(<FabDelete />)
        const btn = screen.getByLabelText('btn-delete')
        fireEvent.click(btn)
        expect(mockStartDeletingEvent).toHaveBeenCalledTimes(1)
    })
})