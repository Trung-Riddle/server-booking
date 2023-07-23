import authRouter from "./auth.route"
import insertRouter from "./insert"
import categoryRouter from "./category.route"
import postRouter from "./post.route"

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/insert', insertRouter)
    app.use('/api/v1/category', categoryRouter)
    app.use('/api/v1/post', postRouter)
    return app.use('/', (req, res) => {
        res.send('server on...')
    })
}
export default initRoutes