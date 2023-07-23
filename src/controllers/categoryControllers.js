import * as services from "../services/category.service";

export const getAllCatgory = async (req, res) => {
    try {
        const response = await services.getAllCatgory()
        res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ err: -1, message: 'fail at category controller ' + error });
    }
}