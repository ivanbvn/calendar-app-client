import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { CalendarPage } from "../../src/Calendar"
import { useAuthStore } from "../../src/Hooks/useAuthStore"
import { AppRouter } from "../../src/Router/AppRouter"

jest.mock("../../src/Hooks/useAuthStore")
jest.mock("../../src/Calendar", () => ({
    CalendarPage: () => <h1>CalendarPage</h1>
}))

describe('Pruebas en <AppRouter/>', () => {
    const mockCheckAuthToken = jest.fn()
    beforeEach(() => jest.clearAllMocks())
    test('debe de mostrar la pantalla de carga y llamar checkAuthToken', () => {
        useAuthStore.mockReturnValue({
            status: 'Checking',
            checkAuthToken: mockCheckAuthToken
        })
        render(<AppRouter />)
        // screen.debug()
        expect(screen.getByText('Cargando...')).toBeTruthy()
        expect(mockCheckAuthToken).toHaveBeenCalled()
    })
    test('debe de mostrar el login en caso de no estar autenticado', () => {
        useAuthStore.mockReturnValue({
            status: 'Not-authenticated',
            checkAuthToken: mockCheckAuthToken
        })
        const {container} = render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        )
        // screen.debug()
        expect(screen.getByText('Ingreso')).toBeTruthy()
        expect(screen.getByText('Registro')).toBeTruthy()
        expect(container).toMatchSnapshot()
    })
    test('debe de mostrar el calendario si estamos autenticados', () => {
        useAuthStore.mockReturnValue({
            status: 'Authenticated',
            checkAuthToken: mockCheckAuthToken
        })
        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        )
        expect(screen.getByText('CalendarPage')).toBeTruthy()
    })
})