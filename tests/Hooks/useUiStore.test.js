import { configureStore } from "@reduxjs/toolkit"
import { act, render, renderHook } from "@testing-library/react"
import { Provider } from "react-redux"
import { useUiStore } from "../../src/Hooks/useUiStore"
import { uiSlice } from "../../src/Store"

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    })
}

describe('Pruebas en useUiStore', () => {
    test('debe de regresar los valores por defecto', () => {
        const mockStore = getMockStore({
            isDateModalOpen: false
        })
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        })
        expect(result.current).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function)
        })
    })
    test('openDateModal debe colocar true en isDateModalOpen', () => {
        const mockStore = getMockStore({isDateModalOpen: false})
        const {result} = renderHook(() => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider> 
        })
        const {openDateModal} = result.current
        act(() => {
            openDateModal()
        })
        expect(result.current.isDateModalOpen).toBeTruthy()
    })
    test('closeDateModal debe colocar true en isDateModalOpen', () => {
        const mockStore = getMockStore({isDateModalOpen: true})
        const {result} = renderHook(() => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        })
        const {closeDateModal} = result.current
        act(() => {
            closeDateModal()
        })
        expect(result.current.isDateModalOpen).toBeFalsy()
    })
})