import { configureStore } from "@reduxjs/toolkit"
import { act, renderHook, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import calendarApi from "../../src/Api/calendarApi"
import { useAuthStore } from "../../src/Hooks/useAuthStore"
import { authSlice } from "../../src/Store"
import { authenticatedState, initialState, notAuthenticatedState } from "../Fixtures/authStates"
import { testUserCredentials } from "../Fixtures/testUser"

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
}

describe('Pruebas en useAuthStore', () => {
    beforeEach(() => localStorage.clear())
    beforeEach(() => jest.clearAllMocks())
    test('debe de regresar los valores por defecto', () => {
        const mockStore = getMockStore({
            status: 'Checking',
            user: {},
            errorMessage: undefined
        })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        })
        expect(result.current).toEqual({
            status: 'Checking',
            user: {},
            errorMessage: undefined,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            handleLogout: expect.any(Function),
        })
    })
    test('startLogin debe realizar el login correctamente', async () => {
        const mockStore = getMockStore({ ...notAuthenticatedState })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        })
        const { startLogin } = result.current
        await act(async () => {
            await startLogin(testUserCredentials)
        })
        const { status, user, errorMessage } = result.current
        expect({ status, user, errorMessage }).toEqual({
            status: 'Authenticated',
            user: {
                name: testUserCredentials.name,
                uid: testUserCredentials.uid
            },
            errorMessage: undefined
        })
        expect(localStorage.getItem('token')).toEqual(expect.any(String))
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String))
    })
    test('startLogin debe arrojar un error cuando falla', async () => {
        const mockStore = getMockStore({ ...notAuthenticatedState })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        })
        const { startLogin } = result.current
        await act(async () => {
            await startLogin({ email: 'asdasd@sadasd.com', password: '123456' })
        })
        const { status, user, errorMessage } = result.current
        expect({ status, user, errorMessage }).toEqual({
            status: 'Not-authenticated',
            user: {},
            errorMessage: expect.any(String)
        })
        // expect(errorMessage).toEqual(expect.any(String))
        expect(localStorage.getItem('token')).toBe(null)
        expect(localStorage.getItem('token-init-date')).toBe(null)
        waitFor(
            () => { expect(result.current.errorMessage).toBe(undefined) }
        )
    })
    test('startRegister debe realizar el registro correctamente', async () => {
        const newUser = {
            email: 'algo@google.com',
            password: '123456',
            name: 'Test user'
        }
        const mockStore = getMockStore({ ...notAuthenticatedState })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        })
        const { startRegister } = result.current
        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
            data: {
                ok: true,
                uid: '515686123',
                name: 'Test user',
                token: 'dasd6541d8651asd18s'
            }
        })
        await act(async () => {
            await startRegister(newUser)
        })
        const { status, user, errorMessage } = result.current
        expect({ status, user, errorMessage }).toEqual({
            status: 'Authenticated',
            user: { name: 'Test user', uid: '515686123' },
            errorMessage: undefined
        })
        spy.mockRestore()
    })
    test('startRegister debe fallar la creación', async () => {
        const mockStore = getMockStore({ ...notAuthenticatedState })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        })
        const { startRegister } = result.current
        await act(async () => {
            await startRegister(testUserCredentials)
        })
        const { status, user, errorMessage } = result.current
        console.log({ status, user, errorMessage })
        expect({ status, user, errorMessage }).toEqual({
            status: 'Not-authenticated',
            user: {},
            errorMessage: expect.any(String)
        })
    })
    test('checkAuthToken debe fallar si no hay token', async () => {
        const mockStore = getMockStore({ ...initialState })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        })
        const { checkAuthToken } = result.current
        await act(async () => {
            await checkAuthToken()
        })
        const { status, user, errorMessage } = result.current
        expect({ status, user, errorMessage }).toEqual({
            status: 'Not-authenticated',
            user: {},
            errorMessage: undefined
        })
    })
    test('checkAuthToken debe de autenticar el usuario si hay un token', async () => {
        const { data } = await calendarApi.post('/auth', testUserCredentials)
        localStorage.setItem('token', data.token)
        const mockStore = getMockStore({ ...initialState })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        })
        const { checkAuthToken } = result.current
        await act(async () => {
            await checkAuthToken()
        })
        const { status, user, errorMessage } = result.current
        expect({ status, user, errorMessage }).toEqual({
            status: 'Authenticated',
            user: {
                name: testUserCredentials.name,
                uid: testUserCredentials.uid
            },
            errorMessage: undefined
        })
    })
    test('handleLogout debe deslogear al usuario y eliminar el token', async() => {
        const { data } = await calendarApi.post('/auth', testUserCredentials)
        localStorage.setItem('token', data.token)
        const mockStore = getMockStore({ ...authenticatedState })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        })
        const { handleLogout } = result.current
        await act(async () => {
            await handleLogout()
        })
        const {status, user, errorMessage} = result.current
        expect({status, user, errorMessage}).toEqual({
            errorMessage: undefined,
            user: {},
            status: 'Not-authenticated'
        })
        expect(localStorage.getItem('token')).toBe(null)
    })
})