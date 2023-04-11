import calendarApi from "../../src/Api/calendarApi"

describe('Pruebas en calendarApi', () => {
    test('debe de tener la configuracion por defecto', () => {
        // console.log(calendarApi)
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)
    })
    test('debe de tener el x-token en el header de todas las peticiones', async() => {
        const token = 'ABC123'
        localStorage.setItem('token', token)
        const {config} = await calendarApi.get('/auth')
        expect(config.headers['x-token']).toBe(token)
    })
})