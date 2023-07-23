import db from "../models";

export const getAllCatgory = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findAll({
        raw: true,
        attributes: ["code", "value"],
      }); // lấy ra object thuần
      resolve({
        err: response ? 0 : 1,
        message: response ? "OK" : "Fail to get All",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
