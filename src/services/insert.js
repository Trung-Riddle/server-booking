import db from "../models";
import bcrypt from "bcryptjs";
require("dotenv").config();
import chothuecanho from "../../data/chothuecanho.json";
import nhachothue from "../../data/nhachothue.json";
import timnguoioghep from "../../data/timnguoioghep.json";
import chothuephongtro from "../../data/chothuephongtro.json";
import generateCode from "../utils/generateCode";
import { v4 } from "uuid";
const dataBody = chothuephongtro.body;

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const insertService = () =>
  new Promise((resolve, reject) => {
    try {
      dataBody.forEach(async (data) => {
        let postId = v4();
        let labelCode = generateCode(data?.header?.class?.classType);
        let attributesId = v4();
        let userId = v4();
        let imagesId = v4();
        let overviewId = v4();
        // post
        await db.Post.create({
          id: postId,
          title: data?.header?.title,
          labelCode,
          address: data?.header?.address,
          attributesId,
          categoryCode: "CTPT",
          description: JSON.stringify(data?.mainContent?.content),
          userId,
          overviewId,
          imagesId,
        });
        // Attributes
        await db.Attribute.create({
          id: attributesId,
          price: data?.header?.attributes?.price,
          acreage: data?.header?.attributes?.acreage,
          published: data?.header?.attributes?.published,
          hashtag: data?.header?.attributes?.hashtag,
        });
        // images
        await db.Image.create({
          id: imagesId,
          image: JSON.stringify(data?.images),
        });
        // label
        await db.Label.findOrCreate({
          where: {code: labelCode},
          defaults: {
            code: labelCode,
            value: data?.header?.class?.classType,
          },
        });
        // overview
        await db.Overview.create({
          id: overviewId,
          code: data?.overview?.content.find((i) => i.name === "Mã tin:")
            ?.content,
          area: data?.overview?.content.find((i) => i.name === "Khu vực")
            ?.content,
          type: data?.overview?.content.find((i) => i.name === "Loại tin rao:")
            ?.content,
          target: data?.overview?.content.find(
            (i) => i.name === "Đối tượng thuê:"
          )?.content,
          bonus: data?.overview?.content.find((i) => i.name === "Gói tin:")
            ?.content,
          created: data?.overview?.content.find((i) => i.name === "Ngày đăng:")
            ?.content,
          expired: data?.overview?.content.find(
            (i) => i.name === "Ngày hết hạn:"
          )?.content,
        });

        await db.User.create({
          id: userId,
          name: data?.contact?.content?.find((i) => i.name === "Liên hệ:")
            ?.content,
          password: hashPassword("123456"),
          phone: data?.contact?.content?.find((i) => i.name === "Điện thoại:")
            ?.content,
          zalo: data?.contact?.content?.find((i) => i.name === "Zalo")?.content,
        });
      });
      resolve("done !");
    } catch (error) {
      reject(error);
    }
  });
