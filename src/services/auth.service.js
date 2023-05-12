import db from '../models'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { v4 } from "uuid"
require('dotenv').config()

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

export const registerService = ({ phone, password, name }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOrCreate({
            where: { phone },
            defaults: {
                id: v4(),
                phone, name,
                password: hashPassword(password)
            }
        })
        // defaults sẽ được tạo nếu phone chưa có
        const token = response[1] && jwt.sign({
            id: response[0].id,
            phone: response[0].phone
        }, process.env.SECRET_KEY, {
            expiresIn: '2d'
        })
        resolve({
            err: token ? 0: 2,
            message: token ? 'Register is successfully' : 'Phone number is already registered',
            token: token || null
        })
    } catch (error) {
        reject(error)
    }
})
export const loginService = ({ phone, password }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { phone },
            raw: true // data user tìm được
        })
        const isCorrectPassword = response && bcrypt.compareSync(password, response.password)
        const token = isCorrectPassword && jwt.sign({
            id: response.id,
            phone: response.phone
        }, process.env.SECRET_KEY, {
            expiresIn: '2d'
        })
        resolve({
            err: token ? 0: 2,
            message: token ? 'Login  is successfully' : response ? 'Password is wrong!' : 'Phone number not found',
            token: token || null
        })
    } catch (error) {
        reject(error)
    }
})