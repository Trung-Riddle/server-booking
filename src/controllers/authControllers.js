import * as authServices from "../services/auth.service"


export const register = async (req, res) => {
    const { name, phone, password } = req.body
    try {
        if (!name || !phone || !password) return res.status(400).json({
            err: 1,
            message: 'Missing input!'
        })
        const response = await authServices.registerService(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Fail at auth controllers ' + error.message
        })
    }
}
export const login = async (req, res) => {
    const { phone, password } = req.body
    try {
        if (!phone || !password) return res.status(400).json({
            err: 1,
            message: 'Missing input!'
        })
        const response = await authServices.loginService(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Fail at auth controllers ' + error.message
        })
    }
}