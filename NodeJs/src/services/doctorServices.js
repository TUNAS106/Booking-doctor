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
let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: { exclude: ["password", "image"] }
            });
            resolve({
                errCode: 0,
                data: doctors
            });
        } catch (e) {
            reject(e);
        }
    });
}

let saveDetailInforDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameterrrrrr"
                });
            } else {
                await db.Markdown.create({
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    description: inputData.description,
                    doctorId: inputData.doctorId,
                });
                resolve({
                    errCode: 0,
                    errMessage: 'Save doctor information successfully',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}

let getDetailDoctorById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                });
            } else {
                let doctor = await db.User.findOne({
                    where: { id: id, roleId: 'R2' },
                    attributes: { exclude: ["password"] },
                    include: [
                        {
                            model: db.Markdown, as: "markdownData", attributes: ["description", "contentHTML", "contentMarkdown"]
                        },
                        { model: db.Allcode, as: "positionData", attributes: ["valueEn", "valueVi"] },
                    ],
                    raw: false,
                    nest: true,
                });
                if (doctor) {
                    if (doctor.image) {
                        doctor.image = new Buffer(doctor.image, 'base64').toString('binary');
                    }
                    resolve({
                        errCode: 0,
                        data: doctor
                    });
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: "Doctor not found"
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
}
export default {
    getTopDoctorHome, getAllDoctors, saveDetailInforDoctor, getDetailDoctorById
}