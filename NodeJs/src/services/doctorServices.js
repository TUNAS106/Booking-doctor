import db from "../models/index.js";
import _ from "lodash";

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
                ],
                raw: true,
                nest: true,
            });
            resolve({ errCode: 0, data: users });
        } catch (e) {
            reject(e);
        }
    });
};

let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: { exclude: ["password", "image"] }
            });
            resolve({ errCode: 0, data: doctors });
        } catch (e) {
            reject(e);
        }
    });
};

let saveDetailInforDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                });
            }

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
        } catch (e) {
            reject(e);
        }
    });
};

let getDetailDoctorById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                });
            }

            let doctor = await db.User.findOne({
                where: { id: id, roleId: 'R2' },
                attributes: { exclude: ["password"] },
                include: [
                    {
                        model: db.Markdown,
                        as: "markdownData",
                        attributes: ["description", "contentHTML", "contentMarkdown"]
                    },
                    { model: db.Allcode, as: "positionData", attributes: ["valueEn", "valueVi"] },
                ],
                raw: false,
                nest: true,
            });

            if (doctor && doctor.image) {
                doctor.image = Buffer.from(doctor.image, 'base64').toString('binary');
            }

            resolve({
                errCode: doctor ? 0 : 2,
                data: doctor || {},
                errMessage: doctor ? "OK" : "Doctor not found"
            });

        } catch (e) {
            reject(e);
        }
    });
};

let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.doctorId || !data.formattedDate) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                });
            }
            console.log('data', data);
            let schedule = data.arrSchedule.map(item => ({
                ...item,
                date: new Date(item.date).setHours(0, 0, 0, 0),
                maxNumber: +process.env.MAX_NUMBER_SCHEDULE,
            }));

            let existing = await db.Schedule.findAll({
                where: { doctorId: data.doctorId, date: new Date(data.formattedDate) },
                attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                raw: true,
            });

            existing = existing.map(item => ({
                ...item,
                date: new Date(item.date).setHours(0, 0, 0, 0),
            }));

            let toCreate = _.differenceWith(schedule, existing, (a, b) =>
                a.timeType === b.timeType &&
                new Date(a.date).setHours(0, 0, 0, 0) === new Date(b.date).setHours(0, 0, 0, 0)
            );
            console.log('existing2', existing);
            console.log('schedule', schedule);
            console.log('toCreate', toCreate);

            if (toCreate && toCreate.length > 0) {
                await db.Schedule.bulkCreate(toCreate);
            }

            resolve({ errCode: 0, errMessage: "OK" });

        } catch (e) {
            reject(e);
        }
    });
};

export default {
    getTopDoctorHome,
    getAllDoctors,
    saveDetailInforDoctor,
    getDetailDoctorById,
    bulkCreateSchedule,
};
