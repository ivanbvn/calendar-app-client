import { authSlice, clearErrorMessage, onChecking, onLogin, onLogout } from "../../../src/Store/Auth/authSlice"
import { authenticatedState, initialState } from "../../Fixtures/authStates"
import { testUserCredentials } from "../../Fixtures/testUser"

describe('Pruebas en authSlice', () => {
  test('debe devolver el initialState', () => {
    expect(authSlice.getInitialState()).toEqual(initialState)
  })
  test('debe de realizar el checking', () => {
    const state = authSlice.reducer(authenticatedState, onChecking())
    expect(state).toEqual(initialState)
  })
  test('debe de realizar un login', () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials))
    // expect(state.status).toBe('Authenticated')
    // expect(state.user).toEqual(testUserCredentials)
    expect(state).toEqual({
      status: 'Authenticated',
      user: testUserCredentials,
      errorMessage: undefined
    })
  })
  test('debe de realizar un logout', () => {
    const state = authSlice.reducer(authenticatedState, onLogout())
    expect(state).toEqual({
      status: 'Not-authenticated',
      user: {},
      errorMessage: undefined
    })
  })
  test('debe de realizar un logout con mensaje de error', () => {
    const autenticationErrorMessage = 'Error de autenticación'
    const state = authSlice.reducer(authenticatedState, onLogout(autenticationErrorMessage))
    expect(state).toEqual({
      status: 'Not-authenticated',
      user: {},
      errorMessage: autenticationErrorMessage
    })
  })
  test('debe limpiar el mensaje de error', () => {
    const autenticationErrorMessage = 'Error de autenticación'
    let state = authSlice.reducer(authenticatedState, onLogout(autenticationErrorMessage))
    expect(state.errorMessage).toBe(autenticationErrorMessage)
    state = authSlice.reducer(state, clearErrorMessage())
    expect(state.errorMessage).toBe(undefined)
  })
})