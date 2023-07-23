import * as postServices from '../services/post.service'

export const getPosts = async (req, res) => {
    try {
        const response = await postServices.getPostsService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Fail at post controller! ' + error.message
        })
    }
}
export const getPostsLimit = async (req, res) => {
    const { page } = req.query
    try {
        const response = await postServices.getPostsLimitService(page)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Fail at post controller! ' + error.message
        })
    }
}