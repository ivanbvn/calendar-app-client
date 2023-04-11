
export const initialState = {
    status: 'Checking', // "Authenticated", "Not-authenticated"
    user: {},
    errorMessage: undefined
}
export const authenticatedState = {
    status: 'Authenticated', // "Authenticated", "Not-authenticated"
    user: {
        uid: '123',
        name: 'Ivan'
    },
    errorMessage: undefined
}
export const notAuthenticatedState = {
    status: 'Not-authenticated', // "Authenticated", "Not-authenticated"
    user: {},
    errorMessage: undefined
}
