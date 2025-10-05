import { where } from "sequelize";
import db from "../models/index.js";
let getTopDoctorHome = async (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limit,
                where: { roleId: 'R2' },
                order: [["createdAt", "DESC"]],
                attributes: { exclude: ["password"] },
                include: [
                    { model: db.Allcode, as: "positionData", attributes: ["valueEn", "valueVi"] },
                    { model: db.Allcode, as: "genderData", attributes: ["valueEn", "valueVi"] },
                    // { model: db.Doctor_Infor, as: "doctorData", attributes: ["id", "specialtyId", "clinicId"] },
                ],
                raw: true,
                nest: true,
            });
            resolve({
                errCode: 0,
                data: users
            });
        } catch (e) {
            reject(e);
        }
    });
}

export default {
    getTopDoctorHome
}