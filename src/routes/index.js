import authRouter from "./auth.route"

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRouter)
    return app.use('/', (req, res) => {
        res.send('server on...')
    })
}
export default initRoutes