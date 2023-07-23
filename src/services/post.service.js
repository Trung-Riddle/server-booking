import db from '../models'

export const getPostsService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw: true,
            nest: true, //trả về object image nếu k có thì sẽ là images.id, images.images
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
            ],
            attributes: ['id', 'star', 'title', 'address', 'description']
        })
        resolve({
            err: response ? 0 : 1,
            message: response ? 'Lấy data thành công' : 'Lấy data thất bại',
            response
        })
    } catch (error) {
        reject(error)
    }
})
export const getPostsLimitService = (offset) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAndCountAll({
            offset: offset * (+process.env.LIMIT) || 0,
            limit: +process.env.LIMIT,
            raw: true,
            nest: true,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
            ],
            attributes: ['id', 'star', 'title', 'address', 'description']
        })
        resolve({
            err: response ? 0 : 1,
            message: response ? 'Lấy data thành công' : 'Lấy data thất bại',
            response
        })
    } catch (error) {
        reject(error)
    }
})